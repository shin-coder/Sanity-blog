import { client } from '@/sanity/client';
import ArticleList from './_components/article-list';
import { type SanityDocument } from 'next-sanity';

const POST_QUERY = `*[
  _type == "post"
  && defined(slug.current)
] | order(publishedAt desc)[0...12]{_id, title, slug, category, publishedAt}`;

const options = { next: { revalidate: 30 } };

export default async function Home() {
  const posts = await client.fetch<SanityDocument[]>(POST_QUERY, {}, options);
  return (
    <>
      <ArticleList posts={posts} />
    </>
  );
}
