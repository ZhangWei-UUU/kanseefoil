import React, { Component } from "react";
import Link from "next/link";
import {  Breadcrumb, Icon, Divider, Button  } from "antd";
import request from "../Fetch/request";
import "../../style.css";


class Customers extends Component{
  render(){
    return(
      <div style={{margin:"30px auto",width:"95%",background:"#fff",height:"900px",padding:"50px"}}>
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link  href="/usercenter?subitem=mychannel"><a>
              <Icon type="home" />
              <span>订单列表</span>
            </a></Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Icon type="user" />
            <span>客户信息</span>
          </Breadcrumb.Item>
        </Breadcrumb>
        <Divider/>
        Customers
       
      </div>
    );
  }
}

export default Customers;