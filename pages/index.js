import React,{Component} from "react";
import {Layout,Row,Col} from "antd";
import Head from "next/head";
import PropTypes from "prop-types";
import dynamic from "next/dynamic";
import withPrivate from "../Components/Authentication";
import HeadNav from "../Components/Layout/HeadNav";
import "../style.css";

const { Content } = Layout;

const DynamicFooter = dynamic(import("../Components/Layout/FooterNav"),{ssr:false});

class Home extends Component{
  static getInitialProps(ctx){
    if(process.browser){
      return {loginUser:window.LOGIN_DATA.loginUser};
    }else{
      return {loginUser:ctx.req.session.loginUser};   
    }
  }
  render(){
    let {loginUser} = this.props;
    return(
      <Layout>
        <Head>
          <title>翰溪订单管理系统</title>
        </Head>
        <HeadNav themeStyle="transparent" loginUser={loginUser}/> 
        <Layout>
          <Content >
            <div className="first-component">
              <div className="first-component-wrapper">
                            
              </div>
            </div>
           
          </Content>
        </Layout>
        <DynamicFooter /> 
      </Layout>
    );
  }
};

Home.propTypes = {
  loginUser:PropTypes.string
};

export default withPrivate(Home,{redirect:false});