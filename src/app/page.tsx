import Link from 'next/link';
import Image from 'next/image';
import { type SanityDocument } from 'next-sanity';
import { client } from '@/sanity/client';

const POST_QUERY = `*[
  _type == "post"
  && defined(slug.current)
] | order(publishedAt desc)[0...12]{_id, title, slug, publishedAt}`;

const options = { next: { revalidate: 30 } };

export default async function Home() {
  const posts = await client.fetch<SanityDocument[]>(POST_QUERY, {}, options);
  return (
    <>
      <main className="px-8 md:px-20">
        <header className="w-full h-20 flex items-center">
          <hgroup className="">
            <h1 className="font-bold leading-none text-2xl tracking-tight">
              Rec.dex
            </h1>
            <span className="block w-3.5 h-0.5 bg-[#333] leading-none mt-1"></span>
            <span className="text-[calc(11/16*1rem)] text-[#333] leading-none -mt-1">
              A blog where I write down my daily thoughts
            </span>
          </hgroup>
        </header>
        <section className="mt-10 w-full mx-auto md:mt-20 md:max-w-200">
          <ul className="flex flex-col divide-y divide-[#ddd]">
            {posts.map((post) => (
              <li key={post._id}>
                <Link
                  className="flex items-center justify-between py-5 group"
                  href={`/${post.slug.current}`}
                >
                  <div className="flex items-center gap-5 md:pl-4">
                    <p className="text-xs text-[#999] leading-none">
                      {new Date(post.publishedAt).toLocaleDateString()}
                    </p>
                    <h2 className="text-sm leading-none text-[#333] group-hover:opacity-50 transition-opacity duration-300 md:text-base">
                      {post.title}
                    </h2>
                  </div>
                  <div className="flex flex-col relative overflow-hidden">
                    <p className="text-xs flex gap-1 text-[#333] leading-none group-hover:-translate-y-full transition-transform duration-300 md:pr-4">
                      (<span>read more</span>)
                    </p>
                    <p className="text-sm flex gap-1 text-[#333] leading-none absolute top-full left-0 group-hover:-translate-y-full transition-transform duration-300 md:pr-4">
                      (<span>read more</span>)
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </>
  );
}
