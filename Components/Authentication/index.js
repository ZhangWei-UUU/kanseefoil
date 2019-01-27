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
          if(result.jwt && result.userName && result.userId){
            return InputComp.getInitialProps({...ctx,userName:result.userName,userId:result.userId});
          }else{
            Router.push("/login");
          }
        }else{
          Router.push("/login"); 
        } 
      }else{
        if(ctx.req.cookies.jwt && ctx.req.cookies.userName){
          return InputComp.getInitialProps({...ctx,userName:ctx.req.cookies.userName,userId:ctx.req.cookies.userId});
        }else{
          ctx.res.redirect("/login");
        }
      }   
    }
       
    render(){     
      return <InputComp {...this.props}/>;
    }
  }
);



