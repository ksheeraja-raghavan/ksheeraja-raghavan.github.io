export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
};

const markdownPosts = import.meta.glob("../content/blog/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

type Frontmatter = {
  title: string;
  date: string;
  excerpt: string;
};

const parseFrontmatter = (fileContents: string) => {
  const frontmatterMatch = fileContents.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);

  if (!frontmatterMatch) {
    throw new Error("Markdown blog posts must include frontmatter.");
  }

  const [, frontmatterBlock, markdownBody] = frontmatterMatch;
  const frontmatter = frontmatterBlock.split("\n").reduce<Partial<Frontmatter>>(
    (fields, line) => {
      const separatorIndex = line.indexOf(":");

      if (separatorIndex === -1) {
        return fields;
      }

      const key = line.slice(0, separatorIndex).trim() as keyof Frontmatter;
      const value = line.slice(separatorIndex + 1).trim();

      fields[key] = value;
      return fields;
    },
    {},
  );

  if (!frontmatter.title || !frontmatter.date || !frontmatter.excerpt) {
    throw new Error("Each markdown blog post needs title, date, and excerpt.");
  }

  return {
    title: frontmatter.title,
    date: frontmatter.date,
    excerpt: frontmatter.excerpt,
    content: markdownBody.trim(),
  };
};

export const blogPosts: BlogPost[] = Object.entries(markdownPosts)
  .map(([filePath, fileContents]) => {
    const slug = filePath.split("/").pop()?.replace(/\.md$/, "");

    if (!slug) {
      throw new Error(`Could not determine slug for blog post: ${filePath}`);
    }

    return {
      slug,
      ...parseFrontmatter(fileContents),
    };
  })
  .sort((firstPost, secondPost) => secondPost.date.localeCompare(firstPost.date));
