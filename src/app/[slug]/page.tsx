import { PortableText, type SanityDocument } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { client } from '@/sanity/client';
import Link from 'next/link';
import LinkText from '../_components/link-text';

const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]`;

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

const options = { next: { revalidate: 30 } };

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const post = await client.fetch<SanityDocument>(
    POST_QUERY,
    await params,
    options
  );
  const postImageUrl = post.image
    ? urlFor(post.image)?.width(550).height(310).url()
    : null;
  return (
    <>
      <section className="container mx-auto min-h-screen max-w-3xl p-8 flex flex-col gap-4">
        {postImageUrl && (
          <img
            src={postImageUrl}
            alt={post.title}
            className="aspect-video rounded-xl"
            width="550"
            height="310"
          />
        )}
        <h1 className="text-3xl font-bold mb-8">{post.title}</h1>

        <div className="prose prose-h2:text-foreground prose-h2:text-lg prose-li:text-foreground prose-p:text-foreground">
          <div className="flex items-center gap-3">
            <span className="text-xs opacity-50 text-foreground">
              {new Date(post.publishedAt).toLocaleDateString()}
            </span>
            <p className="text-sm leading-none opacity-50 my-3!">
              <span className="inline-block mr-[0.3em]">/</span>
              {post.category}
            </p>
          </div>
          {Array.isArray(post.body) && <PortableText value={post.body} />}
        </div>
        <Link href="/" className="text-sm mt-10 group">
          <LinkText text={'back to home'} />
        </Link>
      </section>
    </>
  );
}
