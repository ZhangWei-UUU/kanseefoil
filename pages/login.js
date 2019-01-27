import React,{Component} from "react";
import { Input,Icon, Button,Form ,Alert,message} from "antd";
import PropTypes from "prop-types";
import { observer } from "mobx-react";
import { observable, toJS } from "mobx";
import Head from "next/head";
import Link from "next/link";
import request from "../Components/Fetch/request";

import "../style.css";

const FormItem = Form.Item;

@observer class Login extends Component{
    @observable loading = false;
    @observable alert = null;

    componentDidMount(){
      const script = document.createElement("script");
      script.async = true;
      script.src = "/static/js/demo-1.js";
      setTimeout(()=>{
        document.body.appendChild(script);
      },1000);
   
    }

    handleSubmit = (e) => {
      e.preventDefault();
      this.props.form.validateFields( async (err, values) => {
        if (!err) {
          this.loading = true;
          this.alert = null;
          let data;
          try{
            data =  await request("POST","/api/authentication/login",values);
          }catch(e){
            this.alert = e.toString();
          }finally{
            setTimeout(()=>{
              this.loading = false;
            },1500);
          }
          if(data.success){
            window.LOGIN_DATA = document.cookie;
            window.location.href="/usercenter";
          }else{
            this.alert = data.result;
          }
        }
      });
    }

    render(){
      const { getFieldDecorator } = this.props.form;
      return(
        <div className="login" id="large-header" >
          <Head>
            <title>登录</title>
            <script src="/static/js/TweenLite.min.js"></script>
            <script src="/static/js/EasePack.min.js"></script>
            <script src="/static/js/rAF.js"></script>
          </Head>
          <canvas id="demo-canvas"></canvas>
          <div className="login-form">
            <div>
              <h1>登录 <i>KANSEE</i> 智能系统</h1>
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
                            登录
                </Button>
                <Link href="/register"><a>立即注册</a></Link>
              </FormItem>
            </Form>
            <div>
                        
            </div>
          </div>
        </div>
      );
    }
}

Login.propTypes = {
  form:PropTypes.object
};

export default Form.create()(Login);