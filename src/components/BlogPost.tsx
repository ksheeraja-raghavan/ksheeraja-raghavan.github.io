import React from "react";
import { Link, useParams } from "react-router-dom";
import { blogPosts } from "../data/blogPosts";
import MarkdownContent from "./MarkdownContent";

const BlogPost: React.FC = () => {
  const { slug } = useParams();
  const post = blogPosts.find((entry) => entry.slug === slug);

  if (!post) {
    return (
      <div className="blog-post">
        <p className="post-kicker">Blog post</p>
        <h1>Post not found</h1>
        <p>
          The blog post you tried to open does not exist yet. You can head back
          to the main blog page to browse the available posts.
        </p>
        <Link to="/blog" className="read-more">
          Back to blog
        </Link>
      </div>
    );
  }

  return (
    <article className="blog-post">
      <p className="post-kicker">Blog post</p>
      <h1>{post.title}</h1>
      <p className="date">{post.date}</p>
      <div className="post-body">
        <MarkdownContent content={post.content} />
      </div>
      <Link to="/blog" className="read-more">
        Back to blog
      </Link>
    </article>
  );
};

export default BlogPost;
