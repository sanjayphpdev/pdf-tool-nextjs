// app/blog/[slug]/page.js
import { marked } from "marked";
import { getPostBySlug, getAllPosts } from "@/app/lib/blog";
import HomePage from "@/app/page";

// Generate static pages (SEO boost)
export async function generateStaticParams() {
  const posts = getAllPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// SEO metadata
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  return {
    title: post.title,
    description: post.description,
  };
}

export default async function BlogDetail({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) return <h1>Not Found</h1>;

  return (
    <HomePage>
      <div className="container">
        <h1>{post.title}</h1>

        {/* Render markdown (basic) */}
        <div style={{ whiteSpace: "pre-line" }}>
          <div dangerouslySetInnerHTML={{ __html: marked(post.content) }} />
        </div>
      </div>
    </HomePage>
  );
}
