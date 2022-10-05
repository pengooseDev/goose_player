import "../styles/globals.css";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import Nav from "../src/components/Nav";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <Nav title={"Home"} />
      <Component {...pageProps} />
    </RecoilRoot>
  );
}

export default MyApp;
