import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';
import Header from '../src/components/Header';
import { Analytics } from '@vercel/analytics/react';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <Header />
      <Component {...pageProps} />
      <Analytics />
    </RecoilRoot>
  );
}

export default MyApp;
