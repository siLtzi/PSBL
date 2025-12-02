export const homeSettingsQuery = `*[_type == "homeSettings"][0]{
  logoText,
  titleLine1,
  titleLine2,
  subtitle,
  body,
  primaryCtaLabel,
  primaryCtaHref,
  secondaryCtaLabel,
  secondaryCtaHref,
  videoUrl
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
    services[]{
      title,
      "imageUrl": image.asset->url,
      ctaLabel,
      ctaHref
    }
  }
`;

