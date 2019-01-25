import React,{Component} from "react";
import {Layout,Row,Col} from "antd";
import Head from "next/head";
import PropTypes from "prop-types";
import { observer } from "mobx-react";
import { observable } from "mobx";
import dynamic from "next/dynamic";
import withPrivate from "../Components/Authentication";
import HeadNav from "../Components/Layout/HeadNav";
import "../style.css";

const { Content } = Layout;

const DynamicFooter = dynamic(import("../Components/Layout/FooterNav"),{ssr:false});

@observer class Home extends Component{
    @observable list = []
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
            <title>KANSEE 金箔</title>
          </Head>
          <HeadNav themeStyle="light" loginUser={loginUser}/> 
          <div style={{height:"800px",width:"100%",background:"#000"}}>
            <h2 style={{color:"#fff"}}>一键开启电子商务</h2>
          </div>

          <DynamicFooter /> 
        </Layout>
      );
    }
};

Home.propTypes = {
  loginUser:PropTypes.string
};

export default withPrivate(Home,{redirect:false});