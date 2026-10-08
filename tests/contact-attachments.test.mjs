import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { test } from "node:test";
import vm from "node:vm";
import ts from "typescript";
import {
  MAX_ATTACHMENT_BYTES,
  MAX_CONTACT_REQUEST_BYTES,
  validateAttachments,
  matchesAttachmentSignature,
} from "../lib/contact-attachments.ts";
import * as attachmentHelpers from "../lib/contact-attachments.ts";

const require = createRequire(import.meta.url);
const routeSource = readFileSync(new URL("../app/api/contact/route.ts", import.meta.url), "utf8");
const compiled = ts.transpileModule(routeSource, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText;

function loadRoute({ providerError = null } = {}) {
  const emails = [];
  const routeModule = { exports: {} };
  const context = {
    module: routeModule,
    exports: routeModule.exports,
    Request,
    Buffer,
    SyntaxError,
    TypeError,
    JSON,
    console: { error() {}, warn() {} },
    process: { env: { RESEND_API_KEY: "test-key", CONTACT_RECIPIENT: "recipient@example.test" } },
    require(name) {
      if (name === "@/lib/contact-attachments") return attachmentHelpers;
      if (name === "next/server") return {
        NextResponse: { json: (body, options) => Response.json(body, options) },
      };
      if (name === "resend") return {
        Resend: class {
          emails = {
            send: async (payload) => {
              emails.push(payload);
              return { data: providerError ? null : { id: "test-id" }, error: providerError };
            },
          };
        },
      };
      return require(name);
    },
  };
  vm.runInNewContext(compiled, context);
  return { POST: routeModule.exports.POST, emails };
}

const pdf = Buffer.from("%PDF-1.7\nfictional test document");
const png = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0]);
const jpg = Buffer.from([0xff, 0xd8, 0xff, 0xe0, 0]);
const fieldValues = {
  name: "Testiasiakas <test>",
  email: "customer@example.test",
  phone: "0401234567",
  siteLocationText: "Testityömaa",
  message: "Kuvitteellinen tarjouspyyntö.",
  coords: JSON.stringify({ lat: 66.5, lng: 25.7 }),
};

function multipart(files = [], fields = fieldValues) {
  const form = new FormData();
  for (const [name, value] of Object.entries(fields)) form.set(name, value);
  for (const [name, bytes, type] of files) {
    form.append("attachments", new File([bytes], name, { type }));
  }
  return new Request("https://example.test/api/contact", { method: "POST", body: form });
}

test("metadata limits accept exact thresholds and reject excess", () => {
  const file = { name: "plan.pdf", size: MAX_ATTACHMENT_BYTES, type: "application/pdf" };
  assert.equal(validateAttachments([file]), null);
  assert.match(validateAttachments([{ ...file, size: file.size + 1 }]), /4 Mt/);
  assert.equal(validateAttachments(Array.from({ length: 5 }, () => ({ ...file, size: 1 }))), null);
  assert.match(validateAttachments(Array.from({ length: 6 }, () => ({ ...file, size: 1 }))), /5 liitettä/);
  assert.match(validateAttachments([{ ...file, size: 0 }]), /Tyhjää/);
  assert.match(validateAttachments([{ ...file, name: "../plan.pdf" }]), /Sallitut/);
  assert.match(validateAttachments([{ ...file, name: "plan.exe" }]), /Sallitut/);
  assert.match(validateAttachments([{ ...file, name: "constructor", type: "" }]), /Sallitut/);
  assert.match(validateAttachments([{ ...file, type: "text/html" }]), /Sallitut/);
  assert.equal(validateAttachments([{ ...file, name: "PLAN.PDF", type: "" }]), null);
});

test("all allowed signatures are checked, including truncated data", () => {
  assert.equal(matchesAttachmentSignature(pdf, "application/pdf"), true);
  assert.equal(matchesAttachmentSignature(png, "image/png"), true);
  assert.equal(matchesAttachmentSignature(jpg, "image/jpeg"), true);
  assert.equal(matchesAttachmentSignature(Buffer.from("<script>"), "application/pdf"), false);
  assert.equal(matchesAttachmentSignature(pdf.subarray(0, 4), "application/pdf"), false);
  assert.equal(matchesAttachmentSignature(pdf, "application/octet-stream"), false);
});

test("multipart delivers exact attachment bytes and contact fields to Resend", async () => {
  const { POST, emails } = loadRoute();
  const response = await POST(multipart([
    ["plan.pdf", pdf, "application/pdf"],
    ["photo.png", png, "image/png"],
    ["photo.jpg", jpg, "image/jpeg"],
  ]));
  assert.equal(response.status, 200);
  assert.equal(emails.length, 1);
  const email = emails[0];
  assert.equal(email.replyTo, fieldValues.email);
  assert.equal(email.attachments.length, 3);
  assert.equal(email.attachments[0].filename, "plan.pdf");
  assert.deepEqual(email.attachments[0].content, pdf);
  assert.deepEqual(email.attachments[1].content, png);
  assert.deepEqual(email.attachments[2].content, jpg);
  assert.equal(email.attachments[0].contentType, "application/pdf");
  assert.match(email.html, /Testiasiakas &lt;test&gt;/);
  assert.match(email.text, /66\.5,25\.7/);
});

test("multipart and legacy JSON work without attachments", async () => {
  const { POST, emails } = loadRoute();
  assert.equal((await POST(multipart())).status, 200);
  assert.equal((await POST(new Request("https://example.test/api/contact", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ ...fieldValues, coords: null }),
  }))).status, 200);
  assert.equal(emails.length, 2);
  assert.equal(emails[0].attachments, undefined);
  assert.equal(emails[1].attachments, undefined);
});

test("server accepts the exact 4 MB limit", async () => {
  const { POST, emails } = loadRoute();
  const bytes = Buffer.alloc(MAX_ATTACHMENT_BYTES);
  pdf.copy(bytes);
  assert.equal((await POST(multipart([["limit.pdf", bytes, "application/pdf"]]))).status, 200);
  assert.equal(emails[0].attachments[0].content.length, MAX_ATTACHMENT_BYTES);
});

test("server accepts exactly five attachments", async () => {
  const { POST, emails } = loadRoute();
  const files = Array.from({ length: 5 }, (_, i) => [`${i}.pdf`, pdf, "application/pdf"]);
  assert.equal((await POST(multipart(files))).status, 200);
  assert.equal(emails[0].attachments.length, 5);
});

test("invalid files and counts never send an email", async () => {
  const cases = [
    [["bad.pdf", Buffer.from("not a pdf"), "application/pdf"]],
    [["empty.pdf", Buffer.alloc(0), "application/pdf"]],
    [["bad.exe", pdf, "application/pdf"]],
    [["bad.pdf", pdf, "text/html"]],
    [["large.pdf", Buffer.alloc(MAX_ATTACHMENT_BYTES + 1), "application/pdf"]],
    Array.from({ length: 6 }, (_, i) => [`${i}.pdf`, pdf, "application/pdf"]),
  ];
  for (const files of cases) {
    const { POST, emails } = loadRoute();
    const response = await POST(multipart(files));
    assert.equal(response.status, 400);
    assert.equal((await response.json()).ok, false);
    assert.equal(emails.length, 0);
  }
});

test("oversized request is rejected at the request limit", async () => {
  const { POST, emails } = loadRoute();
  const response = await POST(new Request("https://example.test/api/contact", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: Buffer.alloc(MAX_CONTACT_REQUEST_BYTES + 1),
  }));
  assert.equal(response.status, 413);
  assert.equal(emails.length, 0);
});

test("malformed fields, coordinates, JSON and multipart receive explicit errors", async () => {
  const requests = [
    multipart([], { ...fieldValues, coords: '{"lat":200,"lng":25}' }),
    multipart([], { ...fieldValues, coords: "broken" }),
    new Request("https://example.test/api/contact", { method: "POST", headers: { "content-type": "application/json" }, body: '{"name":42}' }),
    new Request("https://example.test/api/contact", { method: "POST", headers: { "content-type": "application/json" }, body: "broken" }),
    new Request("https://example.test/api/contact", { method: "POST", headers: { "content-type": "multipart/form-data" }, body: "broken" }),
  ];
  const { POST, emails } = loadRoute();
  for (const [index, request] of requests.entries()) {
    assert.equal((await POST(request)).status, 400, `Malformed request ${index}`);
  }
  assert.equal(emails.length, 0);
});

test("provider failures remain failures, not successful submissions", async () => {
  const { POST } = loadRoute({ providerError: { message: "Simulated delivery failure" } });
  const response = await POST(multipart([["plan.pdf", pdf, "application/pdf"]]));
  assert.equal(response.status, 500);
  assert.equal((await response.json()).ok, false);
});
