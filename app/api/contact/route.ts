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
        background: #f4f4f5;
        padding: 24px;
      ">
        <div style="
          max-width: 640px;
          margin: 0 auto;
          background: #ffffff;
          padding: 24px 28px;
          border-radius: 14px;
          border: 1px solid #e5e7eb;
        ">
          <h2 style="margin: 0 0 8px; font-size: 22px; color: #111827;">
            Uusi yhteydenotto PSBL-sivustolta
          </h2>
          <p style="margin: 0 0 18px; font-size: 13px; color: #6b7280;">
            Tämä viesti on lähetetty PSBL.fi yhteydenottolomakkeelta.
          </p>

          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 16px 0 20px;" />

          <h3 style="margin: 0 0 8px; font-size: 16px; color: #111827;">Asiakkaan tiedot</h3>
          <p style="margin: 4px 0; font-size: 14px;"><strong>Nimi:</strong> ${name || "-"}</p>
          <p style="margin: 4px 0; font-size: 14px;"><strong>Sähköposti:</strong> ${email || "-"}</p>
          <p style="margin: 4px 0; font-size: 14px;"><strong>Puhelin:</strong> ${phone || "-"}</p>
          <p style="margin: 4px 0 12px; font-size: 14px;"><strong>Yritys:</strong> ${company || "-"}</p>

          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 16px 0 20px;" />

          <h3 style="margin: 0 0 8px; font-size: 16px; color: #111827;">Työmaan sijainti</h3>
          <p style="margin: 4px 0; font-size: 14px;">
            <strong>Osoite / kuvaus:</strong> ${siteLocationText || "-"}
          </p>
          ${coordsText && googleMapsUrl ? `
          <p style="margin: 8px 0 12px; font-size: 13px;">
            <a href="${googleMapsUrl}" style="color: #2563eb; text-decoration: none;">
              Avaa sijainti Google Mapsissa →
            </a>
          </p>
          ` : ""}
          <p style="margin: 4px 0 12px; font-size: 14px;">
            <strong>Neliömäärä (m²):</strong> ${squareMeters || "-"}
          </p>

          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 16px 0 20px;" />

          <h3 style="margin: 0 0 8px; font-size: 16px; color: #111827;">Viesti</h3>
          <div style="
            font-size: 14px;
            line-height: 1.6;
            white-space: pre-wrap;
            margin: 4px 0 0;
            color: #111827;
          ">
            ${message ? escapeHtml(message) : "-"}
          </div>
        </div>
      </div>
    `;

    // Clean plain-text version — used by email clients when quoting in replies
    const text = [
      `Yhteydenotto – ${name || "Nimetön"}`,
      ``,
      `Nimi: ${name || "-"}`,
      `Sähköposti: ${email || "-"}`,
      `Puhelin: ${phone || "-"}`,
      `Yritys: ${company || "-"}`,
      `Sijainti: ${siteLocationText || "-"}${googleMapsUrl ? ` (${googleMapsUrl})` : ""}`,
      `Neliöt: ${squareMeters ? `${squareMeters} m²` : "-"}`,
      ``,
      `Viesti:`,
      message || "-",
    ].join("\n");

    const result = await resend.emails.send({
      from: "PSBL Yhteydenotto <noreply@psbl.fi>",
      to: toEmails,
      replyTo: email || undefined,
      subject,
      html,
      text,
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
