import React, { Component } from "react";
import Link from "next/link";
import {  Breadcrumb, Icon, Divider, Row,Col,Card,Avatar,Button } from "antd";
import request from "../Fetch/request";
import "../../style.css";

const customer = {
  id:"2e321122",
  name: "上海博物印刷股份有限公司",
  code:"xs323qsasdff",
  address:"上海市宝山区",
  contactors:[
    {name:"老板",tel:13782924021},
    {name:"老板娘",tel:13782924021},
  ]
};

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
        <Row gutter={16}>
          <Col lg={8}>
            <h1>{customer.name}</h1>
            <h3>地址：{customer.address}</h3>
            <h3>税号：{customer.code}</h3>
          </Col>
          {customer.contactors.map((contactor,key)=>{
            return(
              <Col lg={8} key={key}>
                <Card>
                  <div style={{display:"grid",gridTemplateColumns:"5fr 5fr",marginBottom:"20px"}}>
                    <Avatar  icon="user" size="large"/>
                    <h2>{contactor.name}</h2>
                  </div>
                  <h3 style={{marginLeft:"30%"}}>联系电话：{contactor.tel}</h3>
                </Card>
              </Col>
            );
          })}
          
        </Row>
        <center>
          <Button type="primary" style={{marginTop:"50px"}}>
            <Link href={`/usercenter?subitem=editConstomer&&id=${customer.id}`}><a>
            修改客户信息
            </a></Link>
          </Button>
         
        </center>
      </div>
    );
  }
}

export default Customers;