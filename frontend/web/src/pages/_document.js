import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="manifest" href="/manifest.json" />
          <link rel="apple-touch-icon" href="/icon-192x192.png" />
          <meta name="theme-color" content="#84A59D" />
        </Head>
        <body className="w-full h-full">
          <Main className="w-full h-full" />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
