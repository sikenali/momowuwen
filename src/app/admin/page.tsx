'use client';

import { useEffect } from 'react';

export default function AdminPage() {
  useEffect(() => {
    // 动态加载 Decap CMS 并配置
    const loadCMS = async () => {
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/decap-cms@^3.0.0/dist/decap-cms.js';
      script.defer = true;
      
      script.onload = () => {
        // @ts-expect-error Decap CMS global
        if (window.initDecapCMS) {
          // @ts-expect-error Decap CMS global
          window.initDecapCMS({
            config: {
              backend: {
                name: 'github',
                repo: process.env.NEXT_PUBLIC_GITHUB_REPO || 'YOUR_USERNAME/YOUR_REPO_NAME',
                branch: 'main',
              },
              media_folder: 'public/images',
              public_folder: '/images',
              collections: [
                {
                  name: 'posts',
                  label: '博客文章',
                  folder: 'content/posts',
                  create: true,
                  slug: '{{slug}}',
                  fields: [
                    { label: '标题', name: 'title', widget: 'string' },
                    { label: '日期', name: 'date', widget: 'datetime' },
                    { label: '摘要', name: 'description', widget: 'string' },
                    { label: '标签', name: 'tags', widget: 'list', allow_add: true },
                    { label: '分类', name: 'category', widget: 'string', default: '技术' },
                    { label: '封面图', name: 'cover', widget: 'image', required: false },
                    { label: 'Slug', name: 'slug', widget: 'string' },
                    { label: '正文', name: 'body', widget: 'markdown' },
                  ],
                },
                {
                  name: 'projects',
                  label: '项目',
                  folder: 'content/projects',
                  create: true,
                  slug: '{{slug}}',
                  fields: [
                    { label: '项目名称', name: 'title', widget: 'string' },
                    { label: '日期', name: 'date', widget: 'datetime' },
                    { label: '项目简介', name: 'description', widget: 'string' },
                    { label: '标签', name: 'tags', widget: 'list', allow_add: true },
                    { label: '分类', name: 'category', widget: 'string', default: 'Web 应用' },
                    { label: '封面图', name: 'cover', widget: 'image', required: false },
                    { label: '外部链接', name: 'link', widget: 'string', required: false },
                    { label: 'Slug', name: 'slug', widget: 'string' },
                    { label: '项目详情', name: 'body', widget: 'markdown' },
                  ],
                },
              ],
            },
          });
        }
      };
      
      document.head.appendChild(script);
    };

    loadCMS();
    return () => {
      const s = document.querySelector('script[src*="decap-cms"]');
      if (s) s.remove();
    };
  }, []);

  return <div id="cms"></div>;
}
