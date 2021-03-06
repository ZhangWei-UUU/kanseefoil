import React,{Component} from "react";
import { Menu } from "antd";
import Link from "next/link";
import Router from "next/router";
import PropTypes from "prop-types";
import "../../style.css";

const { Item } = Menu;

class HeadNav extends Component{
    logout = () =>{
      fetch("/api/authentication/logout").then(res=>res.json()).then(data=>{
        if(data.success){
          Router.push({ pathname:"/login"});  
        }
      });
    }
 
    render(){
      let { themeStyle,userName } = this.props;
      return(
        <div>
          <Menu
            theme={themeStyle?themeStyle:"dark"}
            mode="horizontal"
            defaultSelectedKeys={["2"]}
            style={{ lineHeight: "64px",width:"100%" }}
          >
            <Item key="logo">
              <a href="/">
                <div className="logo">
                  <p style={themeStyle === "light"?
                    {color:"#1890ff"}:null
                  }>KANSEE 金箔</p>
                </div>
              </a>
            </Item>
            <Item key="market" >
              <Link href="/market"><a>我的仓库</a></Link>
            </Item>
            <Item key="balance" >
              <Link href="/product/balance"><a>我的购物车</a></Link>
            </Item>
            <Item key="bigdata" >
              <a href="/bigData" target="_blank">大数据分析</a>
            </Item>
            <Item key="right" style={{float:"right"}}>
              {userName?
                <div>
                  <a href="/usercenter">{userName}</a>                   | 
                  <a onClick={this.logout}>退出</a>
                </div>
                :
                <a href="/login">未登录</a>
              }
            </Item>
          </Menu>
        </div>
      );
    }
}

HeadNav.propTypes = {
  themeStyle: PropTypes.string,
  userName:PropTypes.string
};

export default HeadNav;

