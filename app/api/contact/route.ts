import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

type ContactPayload = {
  name?: string | null;
  email?: string | null;
  phone?: string | null;
  company?: string | null;
  siteLocationText?: string | null;
  message?: string | null;
  coords?: { lat: number; lng: number } | null;
  // 🔹 NEW: neliöt / m² from the form
  squareMeters?: string | null;
};

export async function POST(req: Request) {
  try {
    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY is missing");
      return NextResponse.json(
        { ok: false, error: "Missing RESEND_API_KEY env var" },
        { status: 500 }
      );
    }

    const body = (await req.json()) as ContactPayload;

    const {
      name,
      email,
      phone,
      company,
      siteLocationText,
      message,
      coords,
      squareMeters, // 🔹 grab from body
    } = body;

    const toEmail =
      process.env.CONTACT_RECIPIENT ??
      process.env.CONTACT_TO_EMAIL ??
      "toimisto@psbl.fi";

    const toEmails = toEmail.split(",").map((e) => e.trim()).filter(Boolean);

    const subject = `Uusi yhteydenotto PSBL-sivustolta${
      name ? ` – ${name}` : ""
    }`;

    const coordsText = coords
      ? `${coords.lat.toFixed(6)}, ${coords.lng.toFixed(6)}`
      : null;

    const googleMapsUrl = coords
      ? `https://www.google.com/maps?q=${coords.lat},${coords.lng}`
      : null;

    const html = `
      <div style="
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        max-width: 540px;
        color: #111827;
        font-size: 14px;
        line-height: 1.6;
      ">
        <p style="margin: 0 0 16px; font-size: 15px; font-weight: 600;">
          Yhteydenotto – ${name || "Nimetön"}
        </p>

        <table style="border-collapse: collapse; font-size: 14px;">
          <tr><td style="padding: 2px 12px 2px 0; color: #6b7280;">Nimi</td><td>${name || "-"}</td></tr>
          <tr><td style="padding: 2px 12px 2px 0; color: #6b7280;">Sähköposti</td><td>${email || "-"}</td></tr>
          <tr><td style="padding: 2px 12px 2px 0; color: #6b7280;">Puhelin</td><td>${phone || "-"}</td></tr>
          <tr><td style="padding: 2px 12px 2px 0; color: #6b7280;">Yritys</td><td>${company || "-"}</td></tr>
          <tr><td style="padding: 2px 12px 2px 0; color: #6b7280;">Sijainti</td><td>${siteLocationText || "-"}${coordsText && googleMapsUrl ? ` (<a href="${googleMapsUrl}" style="color: #2563eb;">kartta</a>)` : ""}</td></tr>
          <tr><td style="padding: 2px 12px 2px 0; color: #6b7280;">Neliöt</td><td>${squareMeters ? `${squareMeters} m²` : "-"}</td></tr>
        </table>

        <p style="margin: 16px 0 6px; font-weight: 600;">Viesti</p>
        <div style="white-space: pre-wrap;">${message ? escapeHtml(message) : "-"}</div>
      </div>
    `;

    const result = await resend.emails.send({
      from: "PSBL Yhteydenotto <noreply@psbl.fi>",
      to: toEmails,
      replyTo: email || undefined,
      subject,
      html,
    });

    if (result.error) {
      console.error("Resend error:", result.error);
      return NextResponse.json(
        { ok: false, error: result.error },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error("Contact API error", err);
    return NextResponse.json(
      { ok: false, error: err?.message ?? String(err) },
      { status: 500 }
    );
  }
}

// tiny helper to avoid breaking HTML if someone writes < or & in message
function escapeHtml(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
