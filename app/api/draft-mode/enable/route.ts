import { defineEnableDraftMode } from "next-sanity/draft-mode";
import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "@/sanity/env";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const token = process.env.SANITY_API_READ_TOKEN;
    if (!token) {
      throw new Error("Missing SANITY_API_READ_TOKEN in environment variables");
    }

    const client = createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: false,
      token,
    });

    const { GET: handler } = defineEnableDraftMode({ client });
    const response = await handler(request);

    // Add CORS headers to allow Sanity Studio to connect
    response.headers.set("Access-Control-Allow-Origin", "*");
    response.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");

    return response;
  } catch (error: any) {
    // If it's a Next.js redirect, re-throw it so Next.js can handle it
    if (error.message === "NEXT_REDIRECT" || (error.digest && error.digest.startsWith("NEXT_REDIRECT"))) {
      throw error;
    }
    console.error("Draft Mode Error:", error);
    return new Response(`Error enabling draft mode: ${error.message}`, { status: 500 });
  }
}
