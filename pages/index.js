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

    componentDidMount(){
      let array = [];
      for(let i = 0;i<100;i+=1){
        array.push({url:"/static/images/print-test.png"});
      }
      this.list = array;
    }

    render(){
      let {loginUser} = this.props;
      return(
        <Layout>
          <Head>
            <title>KANSEE 金箔</title>
          </Head>
          <HeadNav themeStyle="light" loginUser={loginUser}/> 
          <Row gutter={16}>
            {this.list.map((picture,key)=>
              <Col key={key} lg={4}>
                <div 
                  style={{
                    height:400,
                    borderRadius:"18px",
                    margin:"10px",
                    width:"100%",
                    boxShadow:"0 8px 40px rgba(0, 0, 0, 0.15)"
                  }}>
                  <img src={picture.url} style={{width:"100%",height:"100%",borderRadius:"18px"}}/>
                </div>
              </Col>
            )}
          </Row>
          <DynamicFooter /> 
        </Layout>
      );
    }
};

Home.propTypes = {
  loginUser:PropTypes.string
};

export default withPrivate(Home,{redirect:false});