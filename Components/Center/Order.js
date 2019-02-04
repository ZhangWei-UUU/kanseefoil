import React, { Component } from "react";
import Link from "next/link";
import { observer } from "mobx-react";
import { observable,toJS} from "mobx";
import PropTypes from "prop-types";
import moment from "moment";
import { Breadcrumb, Icon, Divider,Button,message,notification } from "antd";
import request from "../Fetch/request";
import "../../style.css";
import {COLORS_CONVERT} from "../../Translator";

  @observer class Order extends Component{
    @observable order = null;
    printOrder = () => {
      var mywindow = window.open("", "PRINT", "height=400,width=600");
      mywindow.document.write("<html><head><title>" + document.title  + "</title>");
      mywindow.document.write("</head><body >");
      var order = document.getElementById("order-content");
      mywindow.document.write(order.innerHTML);
      mywindow.document.write("</body></html>");
      mywindow.print();
      mywindow.close();
      return true;
    }
    
    clear = async () => {
      var order = this.order;
      order.payment = true;
      let res;
      try{
        // res = await request("POST","/api/order/",order);
      }catch(error){
        console.log(error.message);
      }
    }
    async componentDidMount(){
      let res;
      try{
        res = await request("GET",`/api/order/${this.props.id}`);
      }catch(err){
        console.error(err.message);
      }

      if(res && res.success){
        console.log(res.result);
        this.order = res.result;
      }else{
        message.error(res.result);  
      }
    }

    render(){
      return(
        <div style={{margin:"30px auto",width:"95%",background:"#fff",height:"900px",padding:"50px"}}>
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link  href="/usercenter?subitem=mychannel"><a>
                <Icon type="home" />
                <span>订单列表</span>
              </a></Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Icon type="user" />
              <span>订单详情</span>
            </Breadcrumb.Item>
          </Breadcrumb>
          <Divider/>
          {this.order?
            <div id="order-content">
              <center>
                <h1>上海翰溪金箔出货单</h1>
              </center>
           
              <div style={{display:"grid",gridTemplateColumns:"1fr 10fr 5fr",marginTop:"28px"}}>
                <div>
              
                </div>
                <div>
                  <h3>收件单位:{this.order.receiver.name}</h3>
                  <h3>收件地址:{this.order.receiver.address}</h3>
                </div>
                <div>
                  <h3>收件人:{this.order.receiver.contactors[0].name}</h3>
                  <h3>联系电话:{this.order.receiver.contactors[0].tel}</h3>
                </div>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 10fr 5fr",marginTop:"5px"}}>
                <div></div>
                <div>出货日期：{this.order.date?moment(this.order.date).format("YYYY-MM-DD"):null} | 单号：{this.order._id?this.order._id:null}</div>
              
              </div>
              <table border="1" cellSpacing="0" style={{margin:"10px auto",textAlign:"center"}}>
                <tbody>
                  <tr>
                    <th style={{width:"200px",padding:"5px 10px"}}>产品名称</th> 
                    <th style={{width:"100px",padding:"5px 10px"}}>颜色 </th>
                    <th style={{width:"200px",padding:"5px 10px"}}>尺寸 </th>
                    <th style={{width:"100px",padding:"5px 10px"}}>单价(元)</th>
                    <th style={{width:"100px",padding:"5px 10px"}}>数量(支)</th>
                    <th style={{width:"100px",padding:"5px 10px"}}>总价(元)</th>
                  </tr>
             
                  {this.order.list.map((product,key)=>{
                    return(
                      <tr key={key}>
                        <th>{product.name}</th> 
                        <th>{COLORS_CONVERT[product.color]} </th>
                        <th>{product.size}米 </th>
                        <th>{product.price/product.count}</th>
                        <th>{product.count}</th>
                        <th>{product.price}</th>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <div style={{display:"grid",gridTemplateColumns:"1fr 10fr 5fr",marginTop:"35px"}}>
                <div></div>
                <div></div>
                <div>
                  <h2 style={{float:"right",marginRight:"100px"}}>总计：{this.order.sum?this.order.sum:null} 元</h2>
                </div>
              </div>
            </div>
            :null}
          <center>
            <Button type="primary" onClick={this.printOrder}>打印出货单</Button>
            {this.order && this.order.payment?null:
              <Button style={{marginLeft:"20px",color:"#fff",backgroundColor:"red"}} 
                onClick={this.clear}>货款结清</Button>}
          </center>
        </div>
      );
    }
  }

Order.propTypes = {
  id: PropTypes.string
};
  
export default Order;