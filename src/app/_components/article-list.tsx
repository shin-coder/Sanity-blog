import Link from 'next/link';
import { type SanityDocument } from 'next-sanity';
import LinkText from './link-text';

interface ArticleProps {
  posts: SanityDocument[];
}

export default function ArticleList({ posts }: ArticleProps) {
  return (
    <>
      <section className="mt-10 w-full mx-auto md:mt-20 md:max-w-200">
        <ul className="flex flex-col divide-y divide-border">
          {posts.map((post) => (
            <li key={post._id}>
              <Link
                className="flex flex-col gap-2 justify-between py-5 group md:flex-row md:items-end"
                href={`/${post.slug.current}`}
              >
                <article className="flex flex-col gap-3">
                  <div className="flex gap-2 items-center">
                    <p className="text-xs opacity-50 pt-px">
                      {new Date(post.publishedAt).toLocaleDateString()}
                    </p>
                    <p className="text-xs text-foreground">
                      <span className="inline-block mr-[0.3em]">/</span>
                      {post.category}
                    </p>
                  </div>
                  <h2 className="text-sm leading-none group-hover:opacity-80 transition-opacity duration-300 md:text-base">
                    {post.title}
                  </h2>
                </article>
                <LinkText text={'read more'} />
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
