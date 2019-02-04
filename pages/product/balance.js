import React,{Component} from "react";
import { Layout,Row,Col,Icon,InputNumbe,Table,Select,notification, Button} from "antd";
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

const {Option} = Select;
const { Content } = Layout;

@observer class Balance extends Component{
    @observable dataSource = [];
    @observable receiver = null;
    @observable partnersSource = [];
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
          message: "您还没有创建订单，三秒后回到商品页面",
          style:{background:"#c3f0ad",color:"#fff",border:"1px solid #52c41a"}
        });
        setTimeout(()=>{
          Router.push("/market");
        },3000);
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
          message: "您的购物车已清空，1秒后回到商品页面",
          style:{background:"#c3f0ad",color:"#fff",border:"1px solid #52c41a"}
        });
        sessionStorage.removeItem("shopping-cart");
        setTimeout(()=>{
          Router.push("/market");
        },1000);
      }else{
        sessionStorage.setItem("shopping-cart",JSON.stringify(newArray));
        this.dataSource = newArray;
      }
     
    }
    
    selectPartner = (partner) => {
      console.log(partner);
    }
    cancel = () => {
      sessionStorage.removeItem("shopping-cart");
      notification["success"]({
        message: "订单取消，三秒后回到商品页面",
        style:{background:"#c3f0ad",color:"#fff",border:"1px solid #52c41a"}
      });

      setTimeout(()=>{
        Router.push("/market");
      },3000);
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
            {this.receiver?
              <Row>
                <Col span={12}>
                  <h3>客户名称：</h3>
                </Col>
                <Col span={12}>
                  <h3>税号：</h3>
                </Col>
                <Col span={12}>
                  <h3>收货人：</h3>
                </Col>
                <Col span={12}>
                  <h3>联系电话：</h3>
                </Col>
                <Col span={24}>
                  <h3>收货地址：</h3>
                </Col>
              </Row>:
              <div style={{height:"200px",border:"2px dashed #ccc",background:"#e8e8e8"}}>
                <center>
                  <Select style={{width:"60%",margin:"80px 20px"}} 
                    onChange={()=>this.selectPartner(partner)}>
                    {this.partnersSource.map(partner=>{
                      return <Option key={partner.name}>{partner.name}</Option>;
                    })}
                  </Select>
                  <Button type="primary">确认客户</Button>
                </center>
              </div>
            }
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
                <button className="goods-btn" >确认订单</button>
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