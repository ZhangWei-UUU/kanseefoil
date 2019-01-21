import React,{Component} from "react";
import { Layout,Menu,Icon} from "antd";
import { observer } from "mobx-react";
import { observable, toJS } from "mobx";
import PropTypes from "prop-types";
import Link from "next/link";

import HeadNav from "../Components/Layout/HeadNav";
import FooterNav from "../Components/Layout/FooterNav";
import MultiComponents from "../Components/Center";
import withPrivate from "../Components/Authentication";
import request from "../Components/Fetch/request";

import "../style.css";

const { Content, Sider } = Layout;
const { Item } = Menu;
const ITEMS = [
  {name:"订单管理",icon:"file",url:"?subitem=mychannel",key:"mychannel"},
  {name:"商品管理",icon:"shop",url:"?subitem=goodslist",key:"goodslist"},
  {name:"客户管理",icon:"usergroup-add",url:"?subitem=customerlist",key:"customerlist"},
  {name:"消息",icon:"mail",url:"?subitem=message",key:"message"},
  {name:"设置",icon:"setting",url:"?subitem=settings",key:"settings"}];

@observer class UserCenter extends Component{

  static getInitialProps(ctx){
    if(process.browser){
      console.log(ctx);
      return {subitem: ctx.query.subitem || "mychannel",loginUser:ctx.loginUser,id:ctx.query.id || ""}; 
    }else{
      return {subitem:ctx.req.query.subitem || "mychannel",loginUser:ctx.req.session.loginUser,id:ctx.req.query.id || ""};   
    }
  }
    @observable userInfo = null;

    async componentDidMount() {
      let data;
      try{
        data = await request("GET", "/api/currentUserInfo");  
      }catch(error){
        message.error(error);
      }
      this.userInfo = data.payload;
    }

    update = async ()=>{
      let data;
      try{
        data = await request("GET", "/api/currentUserInfo");  
      }catch(error){
        message.error(error);
      }
      this.userInfo = data.payload;
    }

    render(){
      let {subitem,loginUser} = this.props;
      let DynamicComponent = MultiComponents[subitem];

      return(
        <Layout>
          <HeadNav themeStyle="light" loginUser={loginUser}/> 
          <Layout>
            <Sider>
              <Menu
                style={{ width: "100%",height:"100%" ,minHeight:"900px"}}
                defaultSelectedKeys={[subitem]}
                mode={"inline"}
                theme={"light"}
              >
                {ITEMS.map((i)=>{
                  return(
                    <Item key={`${i.key}`}>  
                      <Link href={i.url}>
                        <a> 
                          <Icon type={i.icon}/>
                          <span>{i.name}</span>
                        </a>
                      </Link>   
                    </Item>
                  );
                })}
              </Menu>
            </Sider>
            <Content>
              {this.userInfo?<DynamicComponent userInfo={toJS(this.userInfo)} update={this.update} id={this.props.id}/>:null}
            </Content>  
          </Layout>
          <FooterNav /> 
        </Layout>
      );
    }
}

UserCenter.propTypes = {
  subitem: PropTypes.string,
  loginUser:PropTypes.string,
  id:PropTypes.string
};

export default withPrivate(UserCenter,{redirect:true});