"use client";

import { useState, FormEvent } from "react";
import { barlowCondensed, barlow } from "@/app/fonts";
import { Star, CheckCircle2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function PalautePage() {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value.trim(),
      location: (form.elements.namedItem("location") as HTMLInputElement).value.trim() || null,
      company: (form.elements.namedItem("company") as HTMLInputElement).value.trim() || null,
      projectType: (form.elements.namedItem("projectType") as HTMLInputElement).value.trim() || null,
      quote: (form.elements.namedItem("quote") as HTMLTextAreaElement).value.trim(),
      rating: rating || null,
    };

    if (!data.name || !data.quote) {
      setSubmitError("Täytä vähintään nimi ja arvostelu.");
      setIsSubmitting(false);
      return;
    }

    try {
      const res = await fetch("/api/palaute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error || "Jokin meni vikaan.");
      }

      setSubmitSuccess(true);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Jokin meni vikaan.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <Header />
      <main className="relative flex-1 bg-[var(--dark)] text-[var(--off-white)] overflow-x-hidden w-full">
        <section className="py-20 px-6 md:px-12 max-w-2xl mx-auto min-h-[80vh]">
          <div className="mb-12">
            <div
              className={`${barlow.className} text-[0.65rem] font-semibold tracking-[3px] uppercase text-[var(--yellow)] mb-4 flex items-center gap-3`}
            >
              <span className="text-[var(--concrete-gray)]">{"//"}</span>
              Palaute
            </div>
            <h1
              className={`${barlowCondensed.className} font-black text-[clamp(2rem,5vw,3.5rem)] uppercase tracking-[2px] leading-[0.95] text-[var(--off-white)]`}
            >
              Kerro kokemuksesi.
            </h1>
            <p
              className={`${barlow.className} mt-4 text-sm text-[var(--mid)] max-w-lg leading-relaxed`}
            >
              Kiitos kun valitsit PSBL:n. Arvostelusi auttaa meitä kehittymään
              ja tulevia asiakkaitamme löytämään oikean urakoitsijan.
            </p>
          </div>

          {submitSuccess ? (
            <div className="flex flex-col items-center justify-center py-16 gap-4 text-center">
              <CheckCircle2 className="w-16 h-16 text-[var(--yellow)]" />
              <h2
                className={`${barlowCondensed.className} font-black text-2xl uppercase tracking-[2px] text-[var(--off-white)]`}
              >
                Kiitos palautteestasi!
              </h2>
              <p className="text-sm text-[var(--mid)]">
                Arvostelusi on vastaanotettu ja se julkaistaan tarkistuksen
                jälkeen.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className={`${barlow.className} block text-xs font-semibold tracking-[2px] uppercase text-[var(--mid)] mb-2`}
                >
                  Nimi *
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="w-full bg-[var(--panel)] border border-[var(--steel)] text-[var(--off-white)] px-4 py-3 text-sm focus:outline-none focus:border-[var(--yellow)] transition-colors"
                  placeholder="Matti Meikäläinen"
                />
              </div>

              {/* Location */}
              <div>
                <label
                  htmlFor="location"
                  className={`${barlow.className} block text-xs font-semibold tracking-[2px] uppercase text-[var(--mid)] mb-2`}
                >
                  Paikkakunta
                </label>
                <input
                  id="location"
                  name="location"
                  type="text"
                  className="w-full bg-[var(--panel)] border border-[var(--steel)] text-[var(--off-white)] px-4 py-3 text-sm focus:outline-none focus:border-[var(--yellow)] transition-colors"
                  placeholder="Rovaniemi"
                />
              </div>

              {/* Company */}
              <div>
                <label
                  htmlFor="company"
                  className={`${barlow.className} block text-xs font-semibold tracking-[2px] uppercase text-[var(--mid)] mb-2`}
                >
                  Yritys
                </label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  className="w-full bg-[var(--panel)] border border-[var(--steel)] text-[var(--off-white)] px-4 py-3 text-sm focus:outline-none focus:border-[var(--yellow)] transition-colors"
                  placeholder="Yrityksen nimi (valinnainen)"
                />
              </div>

              {/* Project type */}
              <div>
                <label
                  htmlFor="projectType"
                  className={`${barlow.className} block text-xs font-semibold tracking-[2px] uppercase text-[var(--mid)] mb-2`}
                >
                  Työn tyyppi
                </label>
                <input
                  id="projectType"
                  name="projectType"
                  type="text"
                  className="w-full bg-[var(--panel)] border border-[var(--steel)] text-[var(--off-white)] px-4 py-3 text-sm focus:outline-none focus:border-[var(--yellow)] transition-colors"
                  placeholder="Esim. Omakotitalon lattiavalu"
                />
              </div>

              {/* Rating */}
              <div>
                <label
                  className={`${barlow.className} block text-xs font-semibold tracking-[2px] uppercase text-[var(--mid)] mb-2`}
                >
                  Arvosana
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="p-1 transition-transform hover:scale-110"
                      aria-label={`${star} tähteä`}
                    >
                      <Star
                        className={`w-7 h-7 transition-colors ${
                          star <= (hoverRating || rating)
                            ? "fill-[var(--yellow)] text-[var(--yellow)]"
                            : "text-[var(--concrete-gray)]"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Review text */}
              <div>
                <label
                  htmlFor="quote"
                  className={`${barlow.className} block text-xs font-semibold tracking-[2px] uppercase text-[var(--mid)] mb-2`}
                >
                  Arvostelu *
                </label>
                <textarea
                  id="quote"
                  name="quote"
                  required
                  rows={5}
                  className="w-full bg-[var(--panel)] border border-[var(--steel)] text-[var(--off-white)] px-4 py-3 text-sm focus:outline-none focus:border-[var(--yellow)] transition-colors resize-y"
                  placeholder="Kerro vapaasti kokemuksestasi..."
                />
              </div>

              {/* Error */}
              {submitError && (
                <p className="text-red-400 text-sm">{submitError}</p>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`${barlowCondensed.className} cursor-pointer inline-flex items-center justify-center uppercase font-extrabold text-lg tracking-[2px] bg-[var(--yellow)] text-[var(--black)] px-10 py-4 hover:bg-[var(--yellow-hot)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {isSubmitting ? "Lähetetään..." : "Lähetä arvostelu"}
              </button>
            </form>
          )}
        </section>
        <Footer />
      </main>
    </>
  );
}
