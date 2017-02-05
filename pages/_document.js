import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document'


class MyDocument extends Document {
  render() {
    return (
      <html>
        <Head>
          <title>YIFI Search</title>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
          />
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
