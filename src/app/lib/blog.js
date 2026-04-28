// lib/blog.js

import fs from "fs";
import path from "path";
import matter from "gray-matter";

const blogDir = path.join(process.cwd(), "src/app/content/blog");

// Get all posts (for list page)
export function getAllPosts() {
  const files = fs.readdirSync(blogDir);

  return files.map((file) => {
    const slug = file.replace(".md", "");
    const fullPath = path.join(blogDir, file);
    const fileContent = fs.readFileSync(fullPath, "utf-8");

    const { data } = matter(fileContent);

    return {
      slug,
      title: data.title,
      description: data.description,
      date: data.date,
    };
  });
}

// Get single post
export function getPostBySlug(slug) {
  const fullPath = path.join(blogDir, `${slug}.md`);
  const fileContent = fs.readFileSync(fullPath, "utf-8");

  const { data, content } = matter(fileContent);
  console.log(`Data = ${JSON.stringify(data)}`, content);
  return {
    slug,
    title: data.title,
    description: data.description,
    content,
  };
}
