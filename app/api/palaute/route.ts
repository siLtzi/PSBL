import { NextResponse } from "next/server";
import { createClient } from "@sanity/client";

const writeClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2025-01-01",
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
});

type FeedbackPayload = {
  name?: string | null;
  location?: string | null;
  company?: string | null;
  projectType?: string | null;
  quote?: string | null;
  rating?: number | null;
};

export async function POST(req: Request) {
  try {
    if (!process.env.SANITY_API_WRITE_TOKEN) {
      console.error("SANITY_API_WRITE_TOKEN is missing");
      return NextResponse.json(
        { ok: false, error: "Server configuration error" },
        { status: 500 }
      );
    }

    const body = (await req.json()) as FeedbackPayload;
    const { name, location, company, projectType, quote, rating } = body;

    if (!name?.trim() || !quote?.trim()) {
      return NextResponse.json(
        { ok: false, error: "Nimi ja arvostelu ovat pakollisia." },
        { status: 400 }
      );
    }

    if (rating != null && (rating < 1 || rating > 5 || !Number.isInteger(rating))) {
      return NextResponse.json(
        { ok: false, error: "Arvosanan tulee olla 1–5." },
        { status: 400 }
      );
    }

    const doc = {
      _type: "testimonial" as const,
      name: name.trim(),
      location: location?.trim() || undefined,
      company: company?.trim() || undefined,
      projectType: projectType?.trim() || undefined,
      quote: quote.trim(),
      rating: rating || undefined,
      approved: false,
      date: new Date().toISOString().split("T")[0],
    };

    await writeClient.create(doc);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Feedback submission error:", err);
    return NextResponse.json(
      { ok: false, error: "Palautteen tallennus epäonnistui." },
      { status: 500 }
    );
  }
}
