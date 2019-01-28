import React,{Component} from "react";
import { Layout,Menu,Icon} from "antd";
import { observer } from "mobx-react";
import { observable, toJS } from "mobx";
import PropTypes from "prop-types";
import Link from "next/link";
import HeadNav from "../Components/Layout/HeadNav";
import MultiComponents from "../Components/Center";
import withPrivate from "../Components/Authentication";

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
      return {subitem: ctx.query.subitem || "mychannel",userName:ctx.userName,userId:ctx.userId}; 
    }else{
      return {subitem:ctx.req.query.subitem || "mychannel",userName:ctx.userName,userId:ctx.userId};   
    }
  }
    @observable userInfo = null;

    render(){
      let {subitem,userName} = this.props;
      let DynamicComponent = MultiComponents[subitem];
      return(
        <Layout>
          <HeadNav themeStyle="light" userName={userName}/> 
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
              <DynamicComponent/>
            </Content>  
          </Layout>
        </Layout>
      );
    }
}

UserCenter.propTypes = {
  subitem: PropTypes.string,
  userName:PropTypes.string
};

export default withPrivate(UserCenter,{redirect:true});