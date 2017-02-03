import Document, { Head, Main, NextScript } from 'next/document'


class MyDocument extends Document {
  render() {
    return (
      <html>
        <Head>
          <style>{`
            body {
              background-color: #141414;
              color: white;
              font-family: Helvetica, Arial, sans-serif;
              margin: 0;
              user-select: none;
              cursor: default;
            }
          `}</style>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
     </html>
   );
  }
}


export default MyDocument;
