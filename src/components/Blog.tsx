import React from "react";
import { Link } from "react-router-dom";
import { blogPosts } from "../data/blogPosts";

const Blog: React.FC = () => {
  return (
    <div className="blog">
      <h1>Blog</h1>
      <p>
        Discover reflections on creativity, process, and the ideas behind each
        project.
      </p>
      <div className="posts">
        {blogPosts.map((post) => (
          <div key={post.slug} className="post">
            <h2>{post.title}</h2>
            <p className="date">{post.date}</p>
            <p>{post.excerpt}</p>
            <Link to={`/blog/${post.slug}`} className="read-more">
              Read more
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
