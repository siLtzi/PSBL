import type { ComponentProps } from 'react';
import type { PortableText } from 'next-sanity';

export type BlogImageValue = {
  _key?: string;
  asset?: { _ref: string };
  alt?: string;
  caption?: string;
  crop?: { top: number; bottom: number; left: number; right: number };
  hotspot?: { x: number; y: number; width: number; height: number };
};

export type BlogPost = {
  _id: string;
  _updatedAt?: string;
  title?: string;
  slug: string;
  excerpt?: string;
  mainImage?: BlogImageValue;
  author?: string;
  category?: string;
  publishedAt?: string;
  seoTitle?: string;
  seoDescription?: string;
  body?: ComponentProps<typeof PortableText>['value'];
};
