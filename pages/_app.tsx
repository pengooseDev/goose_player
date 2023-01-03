import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';
import Header from '../src/components/Header';
import HydrationHandler from '../src/components/utils/HydrationHandler';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <Header />
      <Component {...pageProps} />
    </RecoilRoot>
  );
}

export default MyApp;
