import Image from 'next/image';
import { stegaClean } from 'next-sanity';
import { urlFor } from '@/sanity/lib/image';
import type { BlogImageValue } from './types';

export default function BlogImage({ value, cover = false, priority = false }: { value?: BlogImageValue; cover?: boolean; priority?: boolean }) {
  if (!value?.asset?._ref) return null;
  const source = stegaClean(value);
  const dimensions = /-(\d+)x(\d+)-/.exec(source.asset!._ref);
  const width = Number(dimensions?.[1] || 1600);
  const height = Number(dimensions?.[2] || 1000);
  const crop = source.crop;
  const ratio = width * (1 - (crop?.left || 0) - (crop?.right || 0)) / (height * (1 - (crop?.top || 0) - (crop?.bottom || 0)));
  const builder = urlFor(source).width(1600).auto('format').quality(85);
  return <Image src={(cover ? builder.height(1000).fit('crop') : builder).url()} alt={stegaClean(value.alt || '')} width={1600} height={cover ? 1000 : Math.round(1600 / ratio)} sizes="(min-width: 1280px) 1100px, 100vw" priority={priority} className={cover ? 'blog-cover' : 'blog-inline-image'} />;
}
