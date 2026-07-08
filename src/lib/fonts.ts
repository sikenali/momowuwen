import { Ma_Shan_Zheng, ZCOOL_XiaoWei, Noto_Serif_SC } from 'next/font/google';

export const maShanzheng = Ma_Shan_Zheng({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-calligraphy',
});

export const zcoXiaoWei = ZCOOL_XiaoWei({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
});

export const notoSerifSC = Noto_Serif_SC({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-serif',
});
