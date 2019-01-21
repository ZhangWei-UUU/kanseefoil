import React, { Component } from "react";
import Link from "next/link";
import {  Upload, Icon,Breadcrumb,Row,Col,Divider, Form, Tag,Modal } from "antd";
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
  size:[120,240],
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
    handleSubmit = (e) => {
      e.preventDefault();
      this.props.form.validateFields(async (err, values) => {
       
      });
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
