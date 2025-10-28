import Link from 'next/link';
import { type SanityDocument } from 'next-sanity';
import { client } from '@/sanity/client';
import ReadMore from './link-text';
import LinkText from './link-text';

const POST_QUERY = `*[
  _type == "post"
  && defined(slug.current)
] | order(publishedAt desc)[0...12]{_id, title, slug, publishedAt}`;

const options = { next: { revalidate: 30 } };

export default async function ArticleList() {
  const posts = await client.fetch<SanityDocument[]>(POST_QUERY, {}, options);
  return (
    <>
      <section className="mt-10 w-full mx-auto md:mt-20 md:max-w-200">
        <ul className="flex flex-col divide-y divide-border">
          {posts.map((post) => (
            <li key={post._id}>
              <Link
                className="flex items-center justify-between py-5 group"
                href={`/${post.slug.current}`}
              >
                <div className="flex items-center gap-5 md:pl-4">
                  <p className="text-xs opacity-50 leading-none">
                    {new Date(post.publishedAt).toLocaleDateString()}
                  </p>
                  <h2 className="text-sm leading-none group-hover:opacity-80 transition-opacity duration-300 md:text-base">
                    {post.title}
                  </h2>
                </div>
                <LinkText text={'read more'} />
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
