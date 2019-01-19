import React, { Component } from "react";
import Link from "next/link";
import {  Row,Col,Breadcrumb, Icon, Divider,Button  } from "antd";
import request from "../Fetch/request";
import "../../style.css";

const order =  {key :"112",code:"xa2312d1",orderer:"上海博物馆有限公司",date:"2018-02-12",
  contact:"王大锤",tel:15789212122,
  goods:[
    { name:"S1CNY-123",color:"红",size:"240m",price:240,count:1},
    { name:"S1CNY-124",color:"红",size:"120m",price:340,count:3},
    { name:"S1CNY-125",color:"红",size:"240m",price:140,count:8},
    { name:"S1CNY-126",color:"红",size:"120m",price:240,count:3},
  ],
  address:"上海市宝山区曲阜路2013号",
  price:120,count:8,sum:960,delivery:true,clearup:false};


class Order extends Component{
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
    
    sum = () => {
      let result = 0;
      order.goods.forEach(good=>{
        result += good.price * good.count;
      });
      return result;
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
          <div id="order-content">
            <center>
              <h1>上海翰溪金箔出货单</h1>
            </center>
            <div style={{display:"grid",gridTemplateColumns:"1fr 10fr 5fr",marginTop:"28px"}}>
              <div>
              
              </div>
              <div>
                <h3>收件单位:{order.orderer}</h3>
                <h3>收件地址:{order.address}</h3>
              </div>
              <div>
                <h3>收件人:{order.contact}</h3>
                <h3>联系电话:{order.tel}</h3>
              </div>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 10fr 5fr",marginTop:"5px"}}>
              <div></div>
              <div>出货日期：{order.date} | 单号：{order.code}</div>
              
            </div>
            <table border="1" cellSpacing="0" style={{margin:"10px auto",textAlign:"center"}}>
              <tr>
                <th style={{width:"200px",padding:"5px 10px"}}>产品名称</th> 
                <th style={{width:"100px",padding:"5px 10px"}}>颜色 </th>
                <th style={{width:"200px",padding:"5px 10px"}}>尺寸 </th>
                <th style={{width:"100px",padding:"5px 10px"}}>单价(元)</th>
                <th style={{width:"100px",padding:"5px 10px"}}>数量(支)</th>
                <th style={{width:"100px",padding:"5px 10px"}}>总价(元)</th>
              </tr>
              {order.goods.map((product,key)=>{
                return(
                  <tr key={key}>
                    <th>{product.name}</th> 
                    <th>{product.color} </th>
                    <th>{product.size} </th>
                    <th>{product.price}</th>
                    <th>{product.count}</th>
                    <th>{product.count * product.price}</th>
                  </tr>
                );
              })}
            </table>
            <div style={{display:"grid",gridTemplateColumns:"1fr 10fr 5fr",marginTop:"35px"}}>
              <div></div>
              <div></div>
              <div>
                <h2 style={{float:"right",marginRight:"100px"}}>总计：{this.sum()} 元</h2>
              </div>
            </div>
          </div>
          <center>
            <Button type="primary" onClick={this.printOrder}>打印出货单</Button>
          </center>
        </div>
      );
    }
}

export default Order;