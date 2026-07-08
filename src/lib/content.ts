import { posts as allPosts, projects as allProjects } from '../../.velite'
import type { Post, Project } from '../../.velite'

export function getPosts(): Post[] {
  return allPosts
}

export function getPostBySlug(slug: string): Post | undefined {
  return allPosts.find((post) => post.slug === slug)
}

export function getProjects(): Project[] {
  return allProjects
}

export function getProjectBySlug(slug: string): Project | undefined {
  return allProjects.find((project) => project.slug === slug)
}

export type { Post, Project }