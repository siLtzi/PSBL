import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

type ContactPayload = {
  name: string;
  email: string;
  company?: string;
  phone: string;
  siteLocation: string;
  message: string;
  coords?: {
    lat: number;
    lng: number;
  } | null;
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as ContactPayload;

    const { name, email, company, phone, siteLocation, message, coords } = body;

    // Basic validation
    if (!name || !email || !phone || !siteLocation || !message) {
      return NextResponse.json(
        { error: "Pakolliset kentät puuttuvat." },
        { status: 400 }
      );
    }

    const toEmail = process.env.CONTACT_RECIPIENT || "toimisto@psbl.fi";

    const subject = `Uusi yhteydenotto PSBL.fi-sivustolta – ${name}`;

    const coordsText = coords
      ? `${coords.lat.toFixed(6)}, ${coords.lng.toFixed(6)}`
      : "Ei valittuja koordinaatteja";

    const html = `
      <h2>Uusi yhteydenotto PSBL.fi-sivustolta</h2>
      <p><strong>Nimi:</strong> ${name}</p>
      <p><strong>Sähköposti:</strong> ${email}</p>
      <p><strong>Puhelin:</strong> ${phone}</p>
      <p><strong>Yritys:</strong> ${company || "-"} </p>
      <p><strong>Työmaan sijainti (teksti):</strong><br/>${siteLocation}</p>
      <p><strong>Työmaan koordinaatit:</strong> ${coordsText}</p>
      <p><strong>Viestin sisältö:</strong></p>
      <pre style="white-space:pre-wrap;font-family:system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;">${message}</pre>
    `;

    // If no API key in dev, just log and fake success
    if (!process.env.RESEND_API_KEY) {
      console.log("Received contact form (no RESEND_API_KEY set):", body);
      return NextResponse.json({ ok: true, simulated: true });
    }
    await resend.emails.send({
      from: "PSBL Yhteydenotto <no-reply@psbl.fi>",
      to: toEmail,
      replyTo: email,
      subject,
      html,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json(
      { error: "Viestin lähetys epäonnistui." },
      { status: 500 }
    );
  }
}
