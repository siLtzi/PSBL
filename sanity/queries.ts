import { groq } from "next-sanity";

export const homeSettingsQuery = `*[_type == "homeSettings"][0]{
  titleLine1,
  titleLine2,
  subtitle,
  primaryCtaLabel,
  primaryCtaHref,
  secondaryCtaLabel,
  secondaryCtaHref,
  "videoUrl": heroVideo.asset->url
}`;

export const aboutSettingsQuery = `
  *[_type == "aboutSettings"][0]{
    headline,
    lead,
    body,
    ctaLabel,
    ctaHref,
    imageUrl
  }
`; 

export const servicesSettingsQuery = `
  *[_type == "servicesSettings"][0]{
    heading,
    heroTitle,
    heroSubtitle,
    heroMediaType,
    "heroImageUrl": heroImage.asset->url,
    "heroVideoUrl": heroVideo.asset->url,

    services[] {
      title,
      "imageUrl": image.asset->url,
      ctaHref
    }
  }
`;

export const contactSettingsQuery = `
  *[_type == "contactSettings"][0]{
    heroMediaType,
    "heroImageUrl": heroImage.asset->url,
    "heroVideoUrl": heroVideo.asset->url
  }
`;


export const servicePageSlugsQuery = groq`
  *[_type == "servicePage" && defined(slug.current)]{
    "slug": slug.current
  }
`;

export const servicePageBySlugQuery = groq`
  *[_type == "servicePage" && slug.current == $slug][0]{
    title,
    heroSubtitle,
    heroImage,
    contentTitle,
    contentBody,
    sideImage,
    specsTitle,
    specsBody,
    coverageTitle,
    coverageBody,
    references[] {
      _key,
      caption,
      tag,
      image
    },
    seoTitle,
    seoDescription
  }
`;