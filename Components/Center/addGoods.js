import React, { Component } from "react";
import Link from "next/link";
import {  Upload, Icon,Breadcrumb,Row,Col,Divider, Form, Tag,Modal,Input,notification } from "antd";
import { observer } from "mobx-react";
import { observable} from "mobx";
import PropTypes from "prop-types";
import request from "../Fetch/request";
import "../../Style/course.css";
import fake from "./model";

const product = {
  pictures:["/static/images/test-goods.png"],
  name: "Xiaomi/小米 小米8年度旗舰全面屏骁龙845处理器官方正品智能手机",
  price:2200,
  size:["120米","240米"],
  colors:["red","black","golden","white","blue"],
  machines:["自动滚烫机","手动烫印机"],
  materials:["纸张","塑料","皮革"]
};

@observer class addGoods extends Component{
    @observable loading = false;
    @observable uploadstate = {
      previewVisible: false,
      previewImage: "",
      fileList: [{
        uid: "-1",
        name: "xxx.png",
        status: "done",
        url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
      }],
    };

    submit = async () => {
      const FAKE_PRODUCT = {
        name:"小米手机"+Math.random(), 
        size:["120米","240米"], 
        color:["red","blue"], 
        suited:["纸张","塑料","皮革"],
        machines:["自动滚烫机","手动烫印机"],
        price:[{id:1,count:999},{id:2,count:1999},{id:3,count:2999}],
        creator:document.cookie.userId
      };
      let res;
      try{
        res = await request("POST", "/api/product/",FAKE_PRODUCT);  
      }catch(error){
        message.error(error.toString());
      }
      if(res.success){
        notification["success"]({
          message: "产品添加成功",
          style:{background:"#c3f0ad",color:"#fff",border:"1px solid #52c41a"}
        });
      }else{
        notification.open({
          message: "产品添加失败",
        });
      }
    }

      handleCancel = () => {
        this.uploadstate.previewVisible= false;
      }
    
      handlePreview = (file) => {
        this.uploadstate.previewImage=file.url || file.thumbUrl;
        this.uploadstate.previewVisible=true;
      }
    checkPublicCode = (rule, value, callback) => {
      if(value && value.length>16 && value.length !== 18 ){
        callback("统一社会信用代码长度为18位");
      }else{
        callback(undefined);
      }
    }
    
    checkTel = (rule, value, callback) => {
      if(value && value.length>10 && value.length !== 11){
        callback("电话号码长度为11位");
      }else{
        callback(undefined);
      }
    }
    
   
    

    render(){
      const uploadButton = (
        <div>
          <Icon type="plus" />
          <div className="ant-upload-text">Upload</div>
        </div>
      );
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
                <div style={{width:"100%"}}>
                  <Upload
                    action="//jsonplaceholder.typicode.com/posts/"
                    listType="picture-card"
                    fileList={this.uploadstate.fileList}
                    onPreview={this.uploadstate.handlePreview}
                    onChange={this.uploadstate.handleChange}
                  >
                    {this.uploadstate.fileList.length >= 3 ? null : uploadButton}
                  </Upload>
                  <Modal visible={this.previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="example" style={{ width: "100%" }} src={this.previewImage} />
                  </Modal>
                </div>
              </Col>
              <Col span={14}>
                <h3>
                  <Input placeholder="产品名称及相关型号名" style={{color:"#000",fontWeight:"bolder"}}/>
                </h3>
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
                          <Tag closable className="goods-tag">
                            {s}
                          </Tag>
                        </Col>
                      );
                    })}
                  </Row>
                  <Row style={{margin:"10px auto"}}>
                    <Col span={4}>颜色</Col>
                    {product.colors.map((s,key)=>{
                      return(
                        <Col span={4} key={key}>
                          <Tag closable className="goods-tag">
                            {s}
                          </Tag>
                        </Col>
                      );
                    })}
                  </Row>
                  <Row style={{margin:"20px auto"}}>
                    <Col span={4}>适用材质</Col>
                    {product.materials.map((s,key)=>{
                      return(
                        <Col span={3} key={key}>
                          <Tag color="red" closable>
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
                          <Tag color="blue" closable>
                            {s}
                          </Tag>
                        </Col>
                      );
                    })}
                  </Row>
                  <Row>
                    <Col span={4}>价格规则设置</Col>
                    
                  </Row>
                  <Row>
                    <button className="goods-btn-empty" onClick={this.submit}>信息已确认，提交</button>
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
