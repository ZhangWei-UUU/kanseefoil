import React from "react";
import Document, { Head, Main, NextScript } from "next/document";
import escape from "htmlescape";
import { ServerStyleSheet } from "styled-components";

class MyDocument extends Document {
  static getInitialProps ({ renderPage,req }) {
    const sheet = new ServerStyleSheet();
    const {loginUser} = req.session;
    const page = renderPage(App => props => sheet.collectStyles(<App {...props} />));
    const styleTags = sheet.getStyleElement();
    return { ...page, styleTags,loginUser  };
  }
    
  renderCustomScript () {
    return `
          window.LOGIN_DATA = {
            loginUser: ${this.props.loginUser ? escape(this.props.loginUser) : "null"}
          };
        `;
  }
  render() {
    return (
      <html lang="zh-Hans">
        <Head>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <meta name="description" content="Kanseefoil"/>
          <link rel="shortcut icon" href="/static/favicon.ico"></link>
          <script dangerouslySetInnerHTML={{ __html: this.renderCustomScript() }} async defer/>
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