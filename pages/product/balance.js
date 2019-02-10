import React,{Component} from "react";
import { Layout,Row,Col,Icon,InputNumbe,Table,Select,notification, Button,message} from "antd";
import { observer } from "mobx-react";
import { observable, toJS } from "mobx";
import Router from "next/router";
import PropTypes from "prop-types";
import Link from "next/link";
import HeadNav from "../../Components/Layout/HeadNav";
import withPrivate from "../../Components/Authentication";
import request from "../../Components/Fetch/request";
import {COLORS_CONVERT} from "../../Translator";

import "../../style.css";
import { async } from "rxjs/internal/scheduler/async";

const {Option} = Select;
const { Content } = Layout;

@observer class Balance extends Component{
    @observable dataSource = [];
    @observable receiver = null;
    @observable partnersSource = [];
    @observable partnerName = null;
    @observable loading = false;

    static getInitialProps(ctx){
      if(process.browser){   
        return {userName:ctx.userName,userId:ctx.userId,id:ctx.query.id}; 
      }else{
        return {userName:ctx.userName,userId:ctx.userId,id:ctx.req.query.id};   
      }
    }

    componentDidMount(){
      this.getPartnersList();
      var shopping_cart = sessionStorage.getItem("shopping-cart");
      if(shopping_cart){
        var originData = JSON.parse(shopping_cart);
        var productArray = originData.filter((obj,key)=>{
          obj.key = key;
          return obj;
        });
        this.dataSource = productArray;
      }else{
        notification["error"]({
          message: "您还没有创建订单，回到商品页面",
          style:{background:"#c3f0ad",color:"#fff",border:"1px solid #52c41a"}
        });
        Router.push("/market");
      }
    }
    
    getPartnersList = async () =>{
      let res;
      try{
        res = await request("GET", "/api/partners/all");  
      }catch(error){
        message.error(error.toString());
      }
      if(res.success){
        this.partnersSource = res.result;
      }else{
        alert("xxx");
      }
    }

    sumPrice = (array) => {
      let sum = 0;
      array.forEach(obj=>{
        sum+= obj.price;
      });
      return sum;
    }

    delete = (key) => {
      var newArray = toJS(this.dataSource).filter(obj=>{
        if(obj.key ===key){
          return null;
        }else{
          return obj;
        }
      });

      if(newArray.length === 0){
        notification["error"]({
          message: "您的购物车已清空，回到商品页面",
          style:{background:"#c3f0ad",color:"#fff",border:"1px solid #52c41a"}
        });
        sessionStorage.removeItem("shopping-cart");
        Router.push("/market");
      }else{
        sessionStorage.setItem("shopping-cart",JSON.stringify(newArray));
        this.dataSource = newArray;
      }
     
    }
    
    selectPartner = (partner) => {
      this.partnerName = partner;
    }

    confirmPartner = () => {
      this.partnersSource.forEach(obj=>{
        if(obj.name === this.partnerName){
          this.receiver = obj;
        }
      });
    }
    
    reselect = () => {
      this.receiver = null;
    }
    cancel = () => {
      sessionStorage.removeItem("shopping-cart");
      notification["success"]({
        message: "订单取消，回到商品页面",
        style:{background:"#c3f0ad",color:"#fff",border:"1px solid #52c41a"}
      });

      Router.push("/market");
    }
    // 提交订单
    submit = async () => {
      this.loading = true;
      var value = {};
      value.list = this.dataSource;
      value.receiver = this.receiver;
      value.sum = this.sumPrice(this.dataSource);
      if(value.list.length < 0 || !value.receiver){
        message.info("请填写完整的订单信息");
      }else{
        let res;
        try{
          res = await request("POST","/api/order/",value);
        }catch(error){
          console.log(error.message);
        }finally{
          this.loading = false;
        }

        if(res && res.ok === 1 && res.n === 1){
          notification["success"]({
            message:"订单创建成功",
            style:{background:"#c3f0ad",color:"#fff",border:"1px solid #52c41a"}
          });
          sessionStorage.removeItem("shopping-cart");
          Router.push("/usercenter");
        }
      }
    }

    render(){
      let {userName} = this.props;
      const columns = [{
        title: "产品名称",
        dataIndex: "name",
        key: "name",
      }, {
        title: "尺寸/颜色",
        dataIndex: "size",
        key: "size",
        render:(ele,proxy)=>{
          return(
            <span>{proxy.size}米/{COLORS_CONVERT[proxy.color]}</span>
          );
        }
      }, {
        title: "数量",
        dataIndex: "count",
        key: "count",
      }, {
        title: "价格",
        dataIndex: "price",
        key: "price",
      }, {
        title: "删除",
        dataIndex: "handle",
        key: "handle",
        render:(ele,proxy)=>{
          return(<a onClick={()=>this.delete(proxy.key)}><Icon type="delete"/></a>);
        }}
      ];
      return(
        <Layout>
          <HeadNav themeStyle="light" userName={userName}/> 
          <Content style={{margin:"30px auto",width:"1100px",background:"#fff",height:"auto",padding:"50px",position:"relative"}}>
            <h1 style={{marginBottom:"50px 0"}}>订单列表</h1>
            <Table columns={columns} dataSource={this.dataSource} pagination={false}/>
            <h1 style={{margin:"50px 0"}}>收货客户</h1>
            <div id="case-box">
              {this.receiver?
                <Row id="order-box">
                  <Col span={24}>
                    <h3>客户名称：{this.receiver.name}</h3>
                  </Col>
                  <Col span={24}>
                    <h3>税号：{this.receiver.code}</h3>
                  </Col>
                  <Col span={24}>
                    <h3>收货人：{this.receiver.contactors[0].name}</h3>
                  </Col>
                  <Col span={24}>
                    <h3>联系电话：{this.receiver.contactors[0].tel}</h3>
                  </Col>
                  <Col span={24}>
                    <h3>收货地址：{this.receiver.address}</h3>
                  </Col>
                  <Col span={24}>
                    <a style={{color:"#fff"}} onClick={this.reselect}>重新选择</a>
                  </Col>
                </Row>:
                <div  id="order-box-select">
                  <center>
                    <Select style={{width:"60%",marginLeft:"150px",marginTop:"200px",marginBottom:"20px"}} 
                      onChange={this.selectPartner}>
                      {this.partnersSource.map(partner=>{
                        return <Option key={partner.name}>{partner.name}</Option>;
                      })}
                    </Select><br/>
                    <Button type="primary" onClick={this.confirmPartner}>确认客户</Button>
                  </center>
                </div>  
              }
            </div>
            <Row style={{position:"absolute",bottom:0,left:0,
              height:"60px",width:"100%"
            }}>
              <Col span={7} offset={5}>
                <h2 style={{lineHeight:"60px"}}>总价：
                  <span style={{color:"red"}}>￥ {this.sumPrice(this.dataSource)}
                  </span></h2>
              </Col>
              <Col span={2}>
                <a style={{lineHeight:"60px",color:"#999"}} onClick={this.cancel}>
                  取消订单
                </a>
              </Col>
              <Col span={5}>
                <Link href="/market"><a>
                  <button className="goods-btn-empty" >继续下单</button>
                </a></Link>
              </Col>
              <Col span={5}>
                <button className="goods-btn" 
                  loading={`${this.loading}`}
                  onClick={this.submit}>确认订单</button>
              </Col>
            </Row>
          </Content>  
        </Layout>
      );
    }
}

Balance.propTypes = {
  userName:PropTypes.string,
  id:PropTypes.string
};

export default withPrivate(Balance,{redirect:true});