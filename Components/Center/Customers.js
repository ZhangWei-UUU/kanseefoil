import React, { Component } from "react";
import Link from "next/link";
import PropTypes from "prop-types";
import { observer } from "mobx-react";
import { observable } from "mobx";
import {  Breadcrumb, Icon, Divider, Row,Col,message,Button,Card,Avatar } from "antd";
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

@observer class Customers extends Component{
  componentDidMount(){
    this.getDetails();
  }
  
  @observable customer = null;
  getDetails = async () => {
    let data;
    try{
      data = await request("GET", `/api/customer/${this.props.id}`);  
    }catch(error){
      message.error(error.toString());
    }
    if(data.name){
      this.customer = data;
    }else{
      message.error("数据加载失败");
    }
   
  }

  render(){
    return(
      <div style={{margin:"30px auto",width:"95%",background:"#fff",height:"900px",padding:"50px"}}>
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link  href="/usercenter?subitem=customerlist"><a>
              <Icon type="home" />
              <span>客户列表</span>
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
            <h1>{this.customer && this.customer.name?this.customer.name:null}</h1>
            <h3>地址：{this.customer && this.customer.address?this.customer.address:null}</h3>
            <h3>税号：{this.customer && this.customer.code?this.customer.code:null}</h3>
          </Col>
          {this.customer && this.customer.contactors?this.customer.contactors.map((contactor,key)=>{
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
          }):null}
          
        </Row>
        <center>
          <Button type="primary" style={{marginTop:"50px"}}>
            <Link href={`/usercenter?subitem=editConstomer&id=${customer.id}`}><a>
            修改客户信息
            </a></Link>
          </Button>
         
        </center>
      </div>
    );
  }
}

Customers.propTypes = {
  id: PropTypes.string
};

export default Customers;