import { groq } from "next-sanity";

export const homeSettingsQuery = `*[_type == "homeSettings"][0]{
  titleLine1,
  titleLine2,
  subtitle,
  primaryCtaLabel,
  primaryCtaHref,
  secondaryCtaLabel,
  secondaryCtaHref,
  heroMessage,
  "videoUrl": heroVideo.asset->url,
  "posterUrl": heroImage.asset->url
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

export const contactSettingsQuery = groq`
  *[_type == "contactSettings"][0]{
    heroMediaType,
    "heroImageUrl": heroImage.asset->url,
    "heroVideoUrl": heroVideo.asset->url,

    heroTitle,
    heroSubtitle,
    introTitle,
    introBody,

    company {
      name,
      businessId,
      location,
      email,
      phone
    },

    billing {
      eInvoiceAddress,
      operatorName,
      operatorCode
    },

    formTitle,
    formIntro
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
export const referencesSettingsQuery = groq`
  *[_type == "referencesSettings"][0]{
    heading,
    subheading,
    items[] {
      _key,
      caption,
      tag,
      location,
      "imageUrl": image.asset->url
    }
  }
`;
export const allReferencesQuery = groq`
  *[_type == "projectReference"]
  | order(featured desc, year desc, _createdAt desc) {
    _id,
    title,
    "slug": slug.current,
    tag,
    location,
    year,
    sizeM2,
    excerpt,
    "imageUrl": mainImage.asset->url
  }
`;
export const referenceBySlugQuery = groq`
  *[_type == "projectReference" && slug.current == $slug][0]{
    _id,
    title,
    tag,
    location,
    year,
    sizeM2,
    excerpt,
    body,
    "mainImage": mainImage,
    "gallery": gallery[]
  }
`;
export const referencesPageSettingsQuery = groq`
  *[_type == "referencesPageSettings"][0]{
    heroTitle,
    heroSubtitle,
    heroImage,
    "heroVideoUrl": heroVideo.asset->url
  }
`;

