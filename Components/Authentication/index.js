import React,{Component} from "react";
import NextDocument from "next/document";
import Router from "next/router";

export default (InputComp,custom) =>(
  class withPrivate extends NextDocument {
    static getInitialProps(ctx) {
      console.log("xxxxx",ctx.req.cookies);
      if(process.browser){
        let {loginUser} = window.LOGIN_DATA;
        if(!loginUser){
          Router.push("/login");
        }
        return InputComp.getInitialProps({...ctx,loginUser});
      }else{
        let loginUser = ctx.req.cookies;
        if(!loginUser && custom.redirect){
          let {res} = ctx;
          res.redirect("/login");
        }
        return InputComp.getInitialProps({...ctx,loginUser});
      }   
    }
       
    render(){
            
      return <InputComp {...this.props}/>;
    }
  }
);



