import React,{Component} from "react";
import { Layout,Row,Col,Icon,InputNumber,notification} from "antd";
import { observer } from "mobx-react";
import { observable, toJS } from "mobx";
import PropTypes from "prop-types";
import Link from "next/link";
import Router from "next/router";

import HeadNav from "../../Components/Layout/HeadNav";
import withPrivate from "../../Components/Authentication";
import request from "../../Components/Fetch/request";
import {COLORS_CONVERT,METIRAILS_CONVERT,MACHINES_CONVERT} from "../../Translator";

import "../../style.css";

const { Content } = Layout;

@observer class Details extends Component{
    @observable product = null;
    @observable count = 1;
    @observable price = 0;
    @observable color = "gold";
    @observable size = 120;
    static getInitialProps(ctx){
      if(process.browser){   
        return {userName:ctx.userName,userId:ctx.userId,id:ctx.query.id}; 
      }else{
        return {userName:ctx.userName,userId:ctx.userId,id:ctx.req.query.id};   
      }
    }

    async componentDidMount(){
      let res;
      try{
        res = await request("GET", `/api/product/${this.props.id}`);  
      }catch(error){
        console.log(error.toString());
      }
      
      if(res && res.success){
        this.product = res.result;
      }
    }

    onChangeCount = (value) => {
      if(!value){
        this.count = 1;
      }else{
        this.count = value;
      }
    }

    select = (key,value) => {
      this[key] = value;
    }
    submit = () => {
      this.addCart();
      Router.push("/product/balance");
    }

    addCart = () => {
      var obj ={};
      obj.name = this.product.name;
      obj.color = this.color;
      obj.size = this.size;
      obj.count = this.count;
      obj.price = this.product.price*this.count*(this.size/120);
      var shopping_cart = sessionStorage.getItem("shopping-cart");
      if(!shopping_cart){
        var empty_array = [];
        empty_array.push(obj);
        sessionStorage.setItem("shopping-cart",JSON.stringify(empty_array)); 
      }else{
        var cart_array = JSON.parse(shopping_cart);
        cart_array.push(obj);
        sessionStorage.setItem("shopping-cart",JSON.stringify(cart_array));
      }

      notification["success"]({
        message: this.product.name+"加入购物车",
        style:{background:"#c3f0ad",color:"#fff",border:"1px solid #52c41a"}
      });
          
    }

    render(){
      let {userName} = this.props;
      return(
        <Layout>
          <HeadNav themeStyle="light" userName={userName}/> 
          <Content style={{margin:"30px auto",width:"1100px",background:"#fff",height:"900px",padding:"50px"}}>
            {this.product?
              <Row gutter={16}>
                <Col span={10}>
                  <img 
                    style={{width:"100%"}}
                    src={`http://${this.product.mainpicture}`}/>
                </Col>
                <Col span={14}>
                  <h3  style={{color:"#000",
                    fontSize:"27px",
                    outline:"none",
                    border:"none",
                    textAlign:"center",
                    fontWeight:"bolder"}}>{this.product.name}</h3>
                  <div className="goods-header">
                    <Row>
                      <Col span={6}>
                     价格
                      </Col>
                      <Col span={18}>
                        <h2 style={{color:"red"}}>￥{this.product.price*this.count*(this.size/120)}</h2>
                      </Col>
                    </Row>
                    <Row  style={{margin:"10px auto"}}>
                      <Col span={4}>尺寸</Col>
                      {this.product.size.map((s,key)=>{
                        return(
                          <Col span={4} key={key}>
                            <div 
                              className={this.size === s?"red-single-select":"gray-single-select"}
                              onClick={()=>this.select("size",s)}>
                              {s}米
                            </div>
                          </Col>
                        );
                      })}
                    </Row>
                    <Row style={{margin:"10px auto"}}>
                      <Col span={4}>颜色</Col>
                      {this.product.colors.map((color,key)=>{
                        return(
                          <Col span={4} key={key}>
                            <div 
                              onClick={()=>this.select("color",color)}
                              className={this.color === color?"red-single-select":"gray-single-select"}>
                              {COLORS_CONVERT[color]}
                            </div>
                          </Col>
                        );
                      })}
                    </Row>
                    <Row style={{margin:"10px auto"}}>
                      <Col span={4}>数量</Col>
                      <InputNumber min={1} max={1000} value={this.count} onChange={this.onChangeCount} /> 支
                    </Row>
                    <Row>
                      <button className="goods-btn-empty" 
                        onClick={this.addCart}>
                        <Icon type="shopping-cart"/>加入结算包
                      </button>
                    
                      <button className="goods-btn" 
                        onClick={this.submit}>
                        <Icon type="shopping"/>下单
                      </button>
         
                      <Link href="/market"><a style={{color:"red",marginLeft:"10px"}}>
                        返回商城
                      </a></Link>
                    </Row>
                  </div>
                </Col>
              </Row>:
              null}
          </Content>  
        </Layout>
      );
    }
}

Details.propTypes = {
  userName:PropTypes.string,
  id:PropTypes.string
};

export default withPrivate(Details,{redirect:true});