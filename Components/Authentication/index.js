import React,{Component} from "react";
import NextDocument from "next/document";
import Router from "next/router";
import parseCookies from "./parseCookies";

export default (InputComp,custom) =>(
  class withPrivate extends NextDocument {
    static getInitialProps(ctx) {
      if(process.browser){
        if(document.cookie){
          const result = parseCookies(document.cookie);
          if(result.jwt){
            return InputComp.getInitialProps({...ctx,login:true});
          }else{
            Router.push("/login");
          }
        }else{
          Router.push("/login");
          
        } 
      }else{
        if(ctx.req.cookies.jwt){
          return InputComp.getInitialProps({...ctx,login:true});
        }else{
          res.redirect("/login");
        }
      }   
    }
       
    render(){     
      return <InputComp {...this.props}/>;
    }
  }
);



