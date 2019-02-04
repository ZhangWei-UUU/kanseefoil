import React, { Component } from "react";
import Link from "next/link";
import PropTypes from "prop-types";
import { observer } from "mobx-react";
import { observable } from "mobx";
import {  Breadcrumb, Icon, Divider, Row,Col,message,Tag } from "antd";
import request from "../Fetch/request";
import "../../style.css";

const product = {
  pictures:["/static/images/test-goods.png"],
  name: "Xiaomi/小米 小米8年度旗舰全面屏骁龙845处理器官方正品智能手机",
  price:2200,
  size:[120,240],
  colors:["red","black","golden","white","blue"],
  machines:["自动滚烫机","手动烫印机"],
  materials:["纸张","塑料","皮革"]
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
    if(data && data.name){
      this.customer = data;
    }else{
      message.error("数据加载失败");
    }
   
  }

  render(){
    return(
      <div style={{margin:"30px auto",width:"1100px",background:"#fff",height:"900px",padding:"50px"}}>
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link  href="/usercenter?subitem=goodslist"><a>
              <Icon type="shop" />
              <span>商品列表</span>
            </a></Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Icon type="shop" />
            <span>商品详情</span>
          </Breadcrumb.Item>
        </Breadcrumb>
        <Divider/>
        <Row gutter={16}>
          <Col span={10}>
            <img src="/static/images/test-goods.png" style={{width:"100%"}}/>
          </Col>
          <Col span={14}>
            <h3>{product.name}</h3>
            <div className="goods-header">
              <Row>
                <Col span={6}>
                  价格
                </Col>
                <Col span={18}>
                  <h2 style={{color:"red"}}>
                    ￥{product.price}
                  </h2>
                </Col>
              </Row>
              <Row  style={{margin:"10px auto"}}>
                <Col span={4}>尺寸</Col>
                {product.size.map((s,key)=>{
                  return(
                    <Col span={4} key={key}>
                      <div className={key===0?"select-box-active":"select-box"}>
                        {s}
                      </div>
                    </Col>
                  );
                })}
              </Row>
              <Row style={{margin:"10px auto"}}>
                <Col span={4}>颜色</Col>
                {product.colors.map((s,key)=>{
                  return(
                    <Col span={4} key={key}>
                      <div className={key===0?"select-box-active":"select-box"}>
                        {s}
                      </div>
                    </Col>
                  );
                })}
              </Row>
              <Row style={{margin:"20px auto"}}>
                <Col span={4}>适用材质</Col>
                {product.materials.map((s,key)=>{
                  return(
                    <Col span={4} key={key}>
                      <Tag color="red">
                        {s}
                      </Tag>
                    </Col>
                  );
                })}
              </Row>
              <Row style={{margin:"20px auto"}}>
                <Col span={4}>适用机器</Col>
                {product.machines.map((s,key)=>{
                  return(
                    <Col span={4} key={key}>
                      <Tag color="blue">
                        {s}
                      </Tag>
                    </Col>
                  );
                })}
              </Row>
              <Row>
                <button className="goods-btn-empty">编辑商品信息</button>
              </Row>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

Customers.propTypes = {
  id: PropTypes.string
};

export default Customers;