import { defineQuery } from 'next-sanity';

export const blogSettingsQuery = defineQuery(`*[_type == "blogSettings" && _id == "blogSettings"][0]{title, description}`);
export const blogPostsQuery = defineQuery(`*[_type == "blogPost" && defined(slug.current)] | order(publishedAt desc, _createdAt desc) {
  _id, title, "slug": slug.current, excerpt, mainImage, author, category, publishedAt
}`);
export const blogPostQuery = defineQuery(`*[_type == "blogPost" && slug.current == $slug][0] {
  _id, _updatedAt, title, "slug": slug.current, excerpt, mainImage, author, category, publishedAt, seoTitle, seoDescription,
  body[]{
    ...,
    _type in ["videoObject", "blogAudio", "blogAttachment"] => {"fileUrl": file.asset->url},
    _type == "blogArticleLink" => {"post": post->{title, "slug": slug.current, excerpt}}
  }
}`);
