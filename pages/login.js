import React,{Component} from "react";
import { Input,Icon, Button,Form ,Alert,message} from "antd";
import PropTypes from "prop-types";
import Head from "next/head";
import Link from "next/link";
import request from "../Components/Fetch/request";

import "../style.css";

const FormItem = Form.Item;

class Login extends Component{
  constructor(props){
    super(props);
    this.state ={
      loading:false,
      alert:null
    };
  }

  componentDidMount(){
    const script = document.createElement("script");
    script.async = true;
    script.src = "/static/js/demo-1.js";
    document.body.appendChild(script);
  }
    handleSubmit = (e) => {
      e.preventDefault();
      this.props.form.validateFields( async (err, values) => {
        if (!err) {
          this.setState({
            loading:true,
            alert:null
          });
          try{
            const data =  await request("POST","/api/login",values);
            if(data.success){
              window.location.href="/usercenter";
              message.success(data.message);
            }else{
              this.setState({
                alert:data.message
              });
            }
          }catch(e){
            this.setState({
              alert:e.message
            });
          }finally{
            this.setState({
              loading:false
            });
          }
        }
      });
    }

    render(){
      let { loading,alert } = this.state;
      const { getFieldDecorator } = this.props.form;
      return(
        <div className="login" id="large-header" >
          <Head>
            <title>登录</title>
            <script src="/static/js/TweenLite.min.js" async></script>
            <script src="/static/js/EasePack.min.js" async></script>
            <script src="/static/js/rAF.js" async></script>
          </Head>
          <canvas id="demo-canvas"></canvas>
          <div className="login-form">
            <div>
              <h1>登录 翰溪金箔</h1>
            </div>
            {alert?<Alert message={alert}
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
                  disabled={ loading }
                  loading={ loading }
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