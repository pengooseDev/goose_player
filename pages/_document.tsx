import React from 'react';
import NextDocument, { Head, Html, Main, NextScript } from 'next/document';

class Document extends NextDocument {
  render() {
    return (
      <Html>
        <Head>
          <meta name="theme-color" content="#8AC896" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <link rel="apple-touch-icon" href="/apple-icon-180.png" />
          <link
            rel="icon"
            type="image/png"
            sizes="196x196"
            href="favicon_196.png"
          />
          <meta name="description" content="MusicPlayer based on Youtube" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default Document;
