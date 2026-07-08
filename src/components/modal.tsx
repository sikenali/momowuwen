'use client';

import { useEffect } from 'react';
import { RiCloseFill, RiUserFill, RiMailFill, RiGithubFill } from '@remixicon/react';
import { siteConfig } from '@/lib/site-config';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Modal({ isOpen, onClose }: ModalProps) {
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-ink/60 backdrop-blur-sm" />
      <div className="relative bg-parchment rounded-lg max-w-lg w-full p-8 shadow-2xl border border-gold/20" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-ink/50 hover:text-primary transition-colors">
          <RiCloseFill className="w-6 h-6" />
        </button>
        <div className="text-center">
          <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
            <RiUserFill className="w-12 h-12 text-primary" />
          </div>
          <h3 className="text-2xl text-primary font-calligraphy mb-2">{siteConfig.author}</h3>
          <p className="text-ink/60 font-body mb-4">{siteConfig.description}</p>
          <div className="flex justify-center gap-4 mb-6">
            {siteConfig.social.github && (
              <a href={siteConfig.social.github} target="_blank" rel="noopener noreferrer" className="text-ink/50 hover:text-primary transition-colors">
                <RiGithubFill className="w-6 h-6" />
              </a>
            )}
            <a href={`mailto:${siteConfig.email}`} className="text-ink/50 hover:text-primary transition-colors">
              <RiMailFill className="w-6 h-6" />
            </a>
          </div>
          <p className="text-ink/70 font-body text-sm leading-relaxed">
            热爱技术与设计，专注于创造优雅的数字体验。相信代码可以像诗歌一样优美，界面可以如水墨画般意境深远。
          </p>
        </div>
      </div>
    </div>
  );
}