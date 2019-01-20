import React, { Component } from "react";
import Link from "next/link";
import { Breadcrumb,Icon,Button,Divider, Form, Input,Row,Col,message } from "antd";
import { observer } from "mobx-react";
import { observable,toJS} from "mobx";
import PropTypes from "prop-types";
import request from "../Fetch/request";
import "../../Style/course.css";
import fake from "./model";

@observer class addOrder extends Component{
    @observable loading = false;
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
        if (!err) {
          if(values.code && values.code.length !== 18){
            message.error("统一社会信用代码长度为18位");
          }else if(values.tel && values.tel.length !== 11){
            message.error("电话号码长度为11位");
          }else{
            this.loading = true;
            let res;
            values.contactors = [];
            let firstcontact = {};
            firstcontact.name = values.contactor;
            firstcontact.tel = values.tel;
            values.contactors.push(firstcontact);
            delete values.contactor;
            delete values.tel;
            try{
              res = await request("POST","/api/customer",values);
            }catch(err){
              console.error(err);
            }finally{
              this.loading =false;
            }
            if(res.ok === 1 && res.n ===1){
              message.success("添加成功");
              this.props.form.resetFields();
            }else{
              message.error("添加失败");
            }
          }
        }
      });
    }

    render(){
      const { getFieldDecorator } = this.props.form;
      return(
        <div>
          <div style={{margin:"30px auto",width:"1200px",background:"#fff",height:"600px",padding:"50px"}}>
            <Breadcrumb>
              <Breadcrumb.Item>
                <Link  href="/usercenter?subitem=mychannel"><a>
                  <Icon type="home" />
                  <span>订单列表</span>
                </a></Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <Icon type="user" />
                <span>新建订单</span>
              </Breadcrumb.Item>
            </Breadcrumb>
            <Divider/>
            <Row>
              <Col lg={12}>
            ss
              </Col>
              <Col lg={12}>
                <Form onSubmit={this.handleSubmit} style={{width:"350px",margin:"0 auto"}}>
                  <Form.Item>
                    {getFieldDecorator("name", {
                      rules: [{ required: true, message: "请填写公司全称!" }],
                    })(
                      <Input prefix={<Icon type="trademark" style={{ color: "rgba(0,0,0,.25)" }} />} placeholder="公司全称" />
                    )}
                  </Form.Item>
            
                  <Form.Item>
                    <Button type="primary" htmlType="submit" 
                      loading={this.loading}
                      style={{width:"350px"}}>
                      添加产品
                    </Button>
          
                  </Form.Item>
                </Form>
              </Col>
            </Row>
          </div>
        </div>
      );
    }
}

addOrder.propTypes = {
  userInfo: PropTypes.object,
  update: PropTypes.func,
  form:PropTypes.object
};

export default Form.create()(addOrder);
