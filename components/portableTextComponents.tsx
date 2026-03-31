import Image from "next/image";
import type { PortableTextComponents } from "next-sanity";
import { urlFor } from "@/sanity/lib/image";

export const portableTextComponents: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null;
      const imageUrl = urlFor(value).width(1400).quality(85).auto("format").url();
      const alt = value.alt || "";
      const caption = value.caption || "";

      return (
        <figure className="my-8 sm:my-10">
          <div className="relative overflow-hidden rounded-2xl shadow-lg">
            <Image
              src={imageUrl}
              alt={alt}
              width={1400}
              height={800}
              sizes="(min-width: 1024px) 60vw, 90vw"
              className="w-full h-auto object-cover"
            />
          </div>
          {caption && (
            <figcaption className="mt-3 text-center text-sm text-zinc-500 italic">
              {caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },
  block: {
    h1: ({ children }) => (
      <h1 className="text-3xl sm:text-4xl font-black tracking-tight mt-8 mb-4">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mt-6 mb-3">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl sm:text-2xl font-bold mt-5 mb-2">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-lg sm:text-xl font-semibold mt-4 mb-2">
        {children}
      </h4>
    ),
    h5: ({ children }) => (
      <h5 className="text-base sm:text-lg font-semibold mt-3 mb-1">
        {children}
      </h5>
    ),
    h6: ({ children }) => (
      <h6 className="text-sm sm:text-base font-semibold mt-3 mb-1">
        {children}
      </h6>
    ),
    normal: ({ children }) => <p className="mb-4">{children}</p>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-yellow-400 pl-4 italic my-4">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc pl-5 mb-4 space-y-1">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal pl-5 mb-4 space-y-1">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
    number: ({ children }) => <li>{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-bold">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    underline: ({ children }) => <span className="underline">{children}</span>,
    "strike-through": ({ children }) => (
      <s className="line-through">{children}</s>
    ),
    link: ({ value, children }) => {
      const href = value?.href || "";
      const isExternal = href.startsWith("http");
      return (
        <a
          href={href}
          className="underline text-yellow-500 hover:text-yellow-400 transition-colors"
          {...(isExternal
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
        >
          {children}
        </a>
      );
    },
  },
};
