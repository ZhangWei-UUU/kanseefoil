import React,{Component} from "react";
import { Row,Col,Select,notification, Button,message} from "antd";
import { observer } from "mobx-react";
import { observable } from "mobx";
import PropTypes from "prop-types";
import request from "../Fetch/request";
import "../../style.css";

const {Option} = Select;

@observer class ConfirmReceiver extends Component{
    @observable receiver = null;
    @observable partnersSource = [];
    @observable partnerName = null;

    componentDidMount(){
      this.getPartnersList();
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
        console.error("客户列表获取失败");
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
    
    back = () => {
      this.props.jumpPage(0);
    }

    submit = async () => {
      var shopping_cart = sessionStorage.getItem("shopping-cart");
      if(shopping_cart){
        var listData = JSON.parse(shopping_cart);
        let order = {};
        order.list = listData;
        if(this.receiver){
          order.receiver = this.receiver;
          let res;
          try{
            res = await request("POST", "/api/order/",order);  
          }catch(error){
            console.log(error.toString());
          }
          if(res && res.ok === 1 && res.n === 1){
             
            sessionStorage.removeItem("shopping-cart");
            this.props.jumpPage(2,"success");
          }else{
            notification["error"]({
              message: "订单提交失败，请检查您的网络是否正常",
              style:{background:"#ffeded",color:"#FF0036",border:"1px solid #FF0036"}
            });
          }
        }else{
          notification["error"]({
            message: "请选择收货客户",
            style:{background:"#ffeded",color:"#FF0036",border:"1px solid #FF0036"}
          });
        }
     
      }else{
        alert("出现未知错误，没有获取到当前订单数据");
      }

     
    }

    render(){
      return(
        <div>
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
                <Col span={12}>
                  <a style={{color:"#fff"}} onClick={this.reselect}>重新选择</a>
                </Col>
                <Col span={12}>
                  <a style={{color:"#fff"}} onClick={this.preview}>预览报价单</a>
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
          <Row style={{marginTop:"50px"}}>
            <Col span={5} offset={14}>    
              <button className="goods-btn-empty"  onClick={this.back}>返回商品列表</button>
            </Col>
            <Col span={5}>
              <button className="goods-btn" 
                loading={`${this.loading}`}
                onClick={this.submit}>提交订单</button>
            </Col>
          </Row>
        </div>
      );
    }
}

ConfirmReceiver.propTypes = {
  jumpPage:PropTypes.func
};
export default ConfirmReceiver;

