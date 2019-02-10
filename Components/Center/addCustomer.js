import React, { Component } from "react";
import Link from "next/link";
import { Breadcrumb,Icon,Button,Divider, Form, Input,message } from "antd";
import { observer } from "mobx-react";
import { observable,toJS} from "mobx";
import PropTypes from "prop-types";
import request from "../Fetch/request";
import fake from "./model";

@observer class addCustomer extends Component{
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
              res = await request("POST","/api/partners",values);
            }catch(err){
              message.error("请检查网络，接口调用失败");
              console.error(err);
            }finally{
              this.loading =false;
            }
            if(res.ok && res.n && res.ok === 1 && res.n ===1){
              message.success("添加成功");
              this.props.form.resetFields();
            }else{
              message.error("添加失败，请检查数据库是否正常运行");
            }
          }
        }
      });
    }

    render(){
      const { getFieldDecorator } = this.props.form;
      return(
        <div>
          <div style={{margin:"30px auto",width:"600px",background:"#fff",height:"600px",padding:"50px"}}>
            <Breadcrumb>
              <Breadcrumb.Item>
                <Link  href="/usercenter?subitem=customerlist"><a>
                  <Icon type="home" />
                  <span>客户列表</span>
                </a></Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <Icon type="user" />
                <span>添加客户</span>
              </Breadcrumb.Item>
            </Breadcrumb>
            <Divider/>
            <Form onSubmit={this.handleSubmit} style={{width:"350px",margin:"0 auto"}}>
              <Form.Item>
                {getFieldDecorator("name", {
                  rules: [{ required: true, message: "请填写公司全称!" }],
                })(
                  <Input prefix={<Icon type="trademark" style={{ color: "rgba(0,0,0,.25)" }} />} placeholder="公司全称" />
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator("address", {
                  rules: [{ required: true, message: "请填写公司地址!" }],
                })(
                  <Input prefix={<Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />} placeholder="公司地址" />
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator("code", {
                  rules: [{validator: this.checkPublicCode}],
                })(
                  <Input prefix={<Icon type="idcard" style={{ color: "rgba(0,0,0,.25)" }} />} placeholder="统一社会信用代码" />
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator("contactor", {
                  rules: [{ required: true, message: "请填写联系人!" }],
                })(
                  <Input prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />} placeholder="联系人" />
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator("tel", {
                  rules: [{ required: true, message: "请填写联系电话!" },{validator: this.checkTel}],
                })(
                  <Input prefix={<Icon type="phone" style={{ color: "rgba(0,0,0,.25)" }} />} placeholder="联系电话" />
                )}
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" 
                  loading={this.loading}
                  style={{width:"350px"}}>
             提交
                </Button>
          
              </Form.Item>
            </Form>
          </div>
        </div>
      );
    }
}

addCustomer.propTypes = {
  userInfo: PropTypes.object,
  update: PropTypes.func,
  form:PropTypes.object
};

export default Form.create()(addCustomer);
