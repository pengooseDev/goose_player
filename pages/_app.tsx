import "../styles/globals.css";
import type { AppProps } from "next/app";
import Nav from "../components/Nav";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Nav title={"Home"} />
            <Component {...pageProps} />
        </>
    );
}

export default MyApp;
