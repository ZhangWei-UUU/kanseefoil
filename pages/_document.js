import React from "react";
import Document, { Head, Main, NextScript } from "next/document";
import escape from "htmlescape";
import { ServerStyleSheet } from "styled-components";

class MyDocument extends Document {
  static getInitialProps ({ renderPage,req }) {
    const sheet = new ServerStyleSheet();
    const page = renderPage(App => props => sheet.collectStyles(<App {...props} />));
    const styleTags = sheet.getStyleElement();
    return { ...page, styleTags  };
  }
    
  render() {
    return (
      <html lang="zh-Hans">
        <Head>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <meta name="description" content="Kanseefoil"/>
          <link rel="shortcut icon" href="/static/favicon.ico"></link>
          {this.props.styleTags}
        </Head>
        <body>
          <Main />
          <NextScript/>
        </body>
      </html>
    );
  }
}
export default MyDocument;