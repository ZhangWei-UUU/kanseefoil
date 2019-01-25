import React from "react";
import Document, { Head, Main, NextScript } from "next/document";
import escape from "htmlescape";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const {loginUser} = ctx.req.session;
    return { ...ctx,loginUser };
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
          <meta name="description" content="张伟JS个人网站"/>
          <link rel="shortcut icon" href="/static/favicon.ico"></link>
          <link href="https://cdn.bootcss.com/antd/3.12.3/antd.min.css" rel="stylesheet"></link>
          <script dangerouslySetInnerHTML={{ __html: this.renderCustomScript() }} async/>
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