import { defineCollection, defineConfig, s } from 'velite';

const posts = defineCollection({
  name: 'Post',
  pattern: 'posts/**/*.md',
  schema: s.object({
    title: s.string().max(200),
    date: s.isodate(),
    description: s.string().max(500),
    tags: s.array(s.string()).default([]),
    category: s.string().default('随笔'),
    cover: s.string().optional(),
    draft: s.boolean().default(false),
    slug: s.slug(),
    content: s.markdown(),
    metadata: s.metadata(),
    excerpt: s.excerpt(),
    toc: s.toc(),
  }),
});

const projects = defineCollection({
  name: 'Project',
  pattern: 'projects/**/*.md',
  schema: s.object({
    title: s.string().max(200),
    date: s.isodate(),
    description: s.string().max(500),
    tags: s.array(s.string()).default([]),
    category: s.string().default('项目'),
    cover: s.string().optional(),
    link: s.string().url().optional(),
    draft: s.boolean().default(false),
    slug: s.slug(),
    content: s.markdown(),
    metadata: s.metadata(),
    excerpt: s.excerpt(),
    toc: s.toc(),
  }),
});

export default defineConfig({
  collections: { posts, projects },
  root: 'content',
});