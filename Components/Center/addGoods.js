import React, { Component } from "react";
import Link from "next/link";
import { Icon,Breadcrumb,Row,Col,Divider, Form, Tag,notification,InputNumber } from "antd";
import { observer } from "mobx-react";
import { observable,toJS} from "mobx";
import Router from "next/router";

import PropTypes from "prop-types";
import ProductUpload from "./ProductUpload";

import request from "../Fetch/request";
import "../../Style/course.css";

import {COLORS_CONVERT,METIRAILS_CONVERT,MACHINES_CONVERT} from "../../Translator";

@observer class addGoods extends Component{
    @observable name = "";
    @observable size = [120,240];
    @observable colors = ["red","blue","gold","white","black","copper","ray","green"];
    @observable suited = ["paper","lether","pet"];
    @observable machines = ["auto","non_auto"];
    @observable price = "";
    @observable mainpicture = null;
    
    updateImage = (param) => {
      this.mainpicture = param;
    }
    
    changeName = (e) => {
      this.name = e.target.value;
    }

    changePrice = (e) => {
      this.price = e.target.value;
    }

    reduce = (key,value) => {
      if(this[key].length<2){
        notification["warn"]({
          message: "至少保留一个规格",
          style:{background:"#ffeded",color:"#FF0036",border:"1px solid #FF0036"}
        });
      }else{
        const newarray = this[key].filter(tag => tag !== value);
        this[key]= newarray;
      }
    }

    submit = async () => {
      
      if(this.name === "" || this.name === undefined  || this.name === null ){
        notification["warn"]({
          message: "请填写产品名称",
          style:{background:"#ffeded",color:"#FF0036",border:"1px solid #FF0036"}
        });
        return;
      }
      if(this.price === "" || this.price === undefined  || this.price === null ){
        notification["warn"]({
          message: "请填写产品价格",
          style:{background:"#ffeded",color:"#FF0036",border:"1px solid #FF0036"}
        });
        return;
      }

      if(this.price && typeof JSON.parse(toJS(this.price)) !== "number"){
        notification["warn"]({
          message: "价格为非法字符",
          style:{background:"#ffeded",color:"#FF0036",border:"1px solid #FF0036"}
        });
      }
      if(this.mainpicture === "" || this.mainpicture === undefined  || this.mainpicture === null ){
        notification["warn"]({
          message: "请上传产品图片",
          style:{background:"#ffeded",color:"#FF0036",border:"1px solid #FF0036"}
        });
        return;
      }

      const product = {
        name:this.name, 
        size:toJS(this.size), 
        colors:toJS(this.colors), 
        suited:toJS(this.suited), 
        machines:toJS(this.machines),
        mainpicture:this.mainpicture,
        price:this.price
      };
      let res;

      try{
        res = await request("POST", "/api/product/",product);  
      }catch(error){
        message.error(error.toString());
      }
      if(res.success){
        notification["success"]({
          message: "产品添加成功",
          style:{background:"#c3f0ad",color:"#fff",border:"1px solid #52c41a"}
        });
        this.name = "";
        this.size = [120,240];
        this.colors = ["red","blue","gold"];
        this.suited = ["paper","lether","pet"];
        this.machines = ["auto","non_auto"];
        this.price = "";
        this.mainpicture = null;
        Router.push("/usercenter?subitem=goodslist");
      }else{
        notification.open({
          message: "产品添加失败",
        });
      }
    }

    render(){
      return(
        <div>
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
                <span>上架新商品</span>
              </Breadcrumb.Item>
            </Breadcrumb>
            <Divider/>
            <Row gutter={16}>
              <Col span={10}>
                <ProductUpload mainpicture={this.mainpicture} callback={this.updateImage}/>
              </Col>
              <Col span={14}>
                <h3>
                  <input placeholder="产品名称及相关型号名" 
                    value = {this.name}
                    onChange={this.changeName}
                    style={{color:"#000",
                      fontSize:"27px",
                      outline:"none",
                      border:"none",
                      borderBottom:"2px solid #ccc",
                      fontWeight:"bolder"}}/>
                </h3>
                <div className="goods-header">
                  <Row>
                    <Col span={6}>
                     基础价格
                    </Col>
                    <Col span={18}>
                      <h2 style={{color:"red"}}>
                    ￥<InputNumber value={this.price} 
                          onChange={this.changePrice}
                          style={{
                            outline:"none",
                            border:"none",
                            background:"none",
                            borderBottom:"1px solid red",
                            fontWeight:"bolder"}}/>
                      </h2>
                    </Col>
                  </Row>
                  <Row  style={{margin:"10px auto"}}>
                    <Col span={4}>尺寸</Col>
                    {this.size.map((s,key)=>{
                      return(
                        <Col span={3} key={key}>
                          <Tag 
                            color="blue" 
                            onClick={()=>this.reduce("size",s)}>
                            {s}米
                          </Tag>
                        </Col>
                      );
                    })}
                  </Row>
                  <Row style={{margin:"10px auto"}}>
                    <Col span={4}>颜色</Col>
                    {this.colors.map((color,key)=>{
                      return(
                        <Col span={2} key={key}>
                          <Tag 
                            onClick={()=>this.reduce("colors",color)}
                            color={"red"}>
                            {COLORS_CONVERT[color]}
                          </Tag>
                        </Col>
                      );
                    })}
                  </Row>
                  <Row style={{margin:"20px auto"}}>
                    <Col span={4}>适用材质</Col>
                    {this.suited.map((m,key)=>{
                      return(
                        <Col span={2} key={key}>
                          <Tag color="orange"  
                            onClick={()=>this.reduce("suited",m)}>
                            {METIRAILS_CONVERT[m]}
                          </Tag>
                        </Col>
                      );
                    })}
                  </Row>
                  <Row style={{margin:"20px auto"}}>
                    <Col span={4}>适用机器</Col>
                    {this.machines.map((machine,key)=>{
                      return(
                        <Col span={4} key={key}>
                          <Tag color="#000"  onClick={()=>this.reduce("machines",machine)}>
                            {MACHINES_CONVERT[machine]}
                          </Tag>
                        </Col>
                      );
                    })}
                  </Row>
                  <Row>
                    <button className="goods-btn-empty"
                      onClick={this.submit}>信息已确认，提交</button>
                  </Row>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      );
    }
}

addGoods.propTypes = {
  userInfo: PropTypes.object,
  update: PropTypes.func,
  form:PropTypes.object
};

export default Form.create()(addGoods);
