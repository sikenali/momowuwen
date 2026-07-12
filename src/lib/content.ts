import { posts as allPosts, projects as allProjects } from '../../.velite'
import type { Post, Project } from '../../.velite'

export function getPosts(): Post[] {
  return allPosts.filter((post) => !post.draft)
}

export function getPostBySlug(slug: string): Post | undefined {
  return allPosts.find((post) => post.slug === slug && !post.draft)
}

export function getProjects(): Project[] {
  return allProjects.filter((project) => !project.draft)
}

export function getProjectBySlug(slug: string): Project | undefined {
  return allProjects.find((project) => project.slug === slug && !project.draft)
}

export type { Post, Project }
