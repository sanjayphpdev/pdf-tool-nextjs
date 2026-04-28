// app/blog/page.js

import Link from "next/link";
import { getAllPosts } from "../lib/blog";
import HomePage from "../page";
export const metadata = {
  title: "Blog - PDFMints",
  description: "Read latest PDF guides and tutorials",
};

export default function BlogPage() {
  const posts = getAllPosts();

  const [featured, ...rest] = posts;

  return (
    <HomePage>
      <div className="container">
        <h1 className="blog-title">Blog</h1>

        {/* 🔥 Featured Post */}
        {featured && (
          <div className="featured-card glass">
            <h2>{featured.title}</h2>
            <p>{featured.description}</p>

            <Link href={`/blog/${featured.slug}`} className="btn-primary">
              Read Article →
            </Link>
          </div>
        )}

        {/* 🧩 Grid */}
        <div className="blog-grid">
          {rest.map((post) => (
            <div key={post.slug} className="blog-card glass">
              <h3>{post.title}</h3>
              <p>{post.description}</p>

              <Link href={`/blog/${post.slug}`} className="read-link">
                Read More →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </HomePage>
  );
}
