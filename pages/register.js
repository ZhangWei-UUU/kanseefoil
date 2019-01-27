import React,{Component} from "react";
import Link from "next/link";
import Router from "next/router";
import PropTypes from "prop-types";
import { observer } from "mobx-react";
import { observable, toJS } from "mobx";
import { Input,Icon, Button,Form ,Alert,message} from "antd";
import request from "../Components/Fetch/request";
import "../style.css";

const FormItem = Form.Item;

@observer class Register extends Component{
  @observable loading = false;
  @observable alert = null;

    handleSubmit = (e) => {
      e.preventDefault();
      this.props.form.validateFields(async (err, values) => {
        if (!err) {
          this.loading = true;
          this.alert = null;
          let data;
          try{
            data =  await request("POST","/api/authentication/registry",values);
          }catch(e){
            this.alert = e.toString();   
          }finally{
            setTimeout(()=>{
              this.loading = false;
            },1500);
          }
          if(data&& data.n === 1&& data.ok ===1){
            message.success("注册成功");
            setTimeout(()=>{
              Router.push("/login");
            },1500);
          }else{
            message.success("注册失败，请检查您的网络是否正常连接");
          }
        }
      });
    }

    render(){
      const { getFieldDecorator } = this.props.form;
      return(
        <div className="login">
          <div className="login-form">
            <div>
              <h1>欢迎注册您的账户</h1>
            </div>
            {this.alert?<Alert message={this.alert}
              type="error"
              showIcon/>:null}
            <Form onSubmit={this.handleSubmit}>
              <FormItem>
                {getFieldDecorator("userName", {
                  rules: [{ required: true, message: "请输入用户名!" }],
                })(
                  <Input 
                    autoComplete="on"
                    prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />} placeholder="用户名" />
                )}
              </FormItem>
              <FormItem>
                {getFieldDecorator("password", {
                  rules: [{ required: true, message: "请输入密码!" }],
                })(
                  <Input
                    autoComplete="on"
                    prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />} type="password" placeholder="密码" />
                )}
              </FormItem>
              <FormItem>
                <Button htmlType="submit"
                  disabled={ this.loading }
                  loading={ this.loading }
                  className="login-form-button">
                            注册 
                </Button>
                <Link href="/login"><a>已有账户，立即登录</a></Link>
              </FormItem>
            </Form>
            <div>             
            </div>
          </div>
        </div>
      );
    }
}

Register.propTypes = {
  form:PropTypes.object
};

export default Form.create()(Register);