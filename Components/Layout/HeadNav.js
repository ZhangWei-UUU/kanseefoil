import React,{Component} from "react";
import { Menu } from "antd";
import PropTypes from "prop-types";
import "../../style.css";

const { Item } = Menu;

class HeadNav extends Component{
    logout = () =>{
      fetch("/api/logout").then(res=>res.json()).then(data=>{
        if(data.success){
          Router.push({ pathname:"/login"});  
        }
      });
    }
 
    render(){
      let { themeStyle,loginUser } = this.props;
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
            <Item key="right" style={{float:"right"}}>
              {loginUser?
                <div>
                  <a href="/usercenter">{loginUser}</a>                   | 
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
  loginUser:PropTypes.string
};

export default HeadNav;

