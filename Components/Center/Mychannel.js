import React, { Component } from "react";
import Link from "next/link";
import { Row, Col,Button, Table,message } from "antd";
import { observer } from "mobx-react";
import { observable,toJS} from "mobx";
import PropTypes from "prop-types";
import request from "../Fetch/request";
import "../../Style/course.css";
import fake from "./model";
@observer class Mychannel extends Component{
    @observable columns = [
      {key:0, title:"订单编号",dataIndex:"code",render:(ele)=>
        <Link href={`/usercenter?subitem=orders&id=${ele}`}>
          <a>{ele}</a>
        </Link>},
      {key:1, title:"订货单位",dataIndex:"orderer",render:(ele)=>
        <Link href={`/usercenter?subitem=customers&id=${ele}`}>
          <a>{ele}</a>
        </Link>},
      {key:2, title:"日期",dataIndex:"date"},
      {key:3, title:"产品",dataIndex:"product",render:(ele,proxy)=>
        <span>
          <Link href={`/usercenter?subitem=products&id=${ele}`}>
            <a>{ele}</a>
          </Link> | {proxy.color} | {proxy.size} 
        </span>},
      {key:6, title:"发货",dataIndex:"delivery",render:(ele,proxy)=>{
        return <Link href={`/usercenter?subitem=delivery&id=${proxy.code}`}><a>{ele?"已发货":"未发货"}</a></Link>;
      }},
      {key:67, title:"结算",dataIndex:"clearup",render:(ele,proxy)=>{
        return <Link href={`/usercenter?subitem=balance&id=${proxy.code}`}><a>{ele?"已结算":"未结算"}</a></Link>;
      }},
    ]

    @observable dataSource = fake;

    async componentDidMount(){
      let data;
      try{
        data = await request("GET", "/api/order/all");  
      }catch(error){
        message.error(error.toString());
      }
    }
    closeDrawer = () => {
      this.isDrawer = false;
    }

    popUp = (channel) => {
      this.isDrawer = true;
      this.currentCourse = channel;
    }
    
    delete = async (e,value) =>{
      e.preventDefault();
      e.stopPropagation();
      let data;
      try{
        data = await request("DELETE", `/api/shop/order/${value}`);  
      }catch(error){
        message.error(data);
      }
      if(data.success){
        this.props.update();
      }else{
        message.warn("失败");
      }
    }
    render(){
      return(
        <div>
          <div style={{margin:"30px auto",width:"95%",background:"#fff",height:"900px",padding:"50px"}}>
            <Table columns={this.columns} dataSource={this.dataSource}/>
            <center>
              <Button type="primary" style={{marginTop:"50px"}}>
                <Link href={"/usercenter?subitem=addOrder"}><a>
                 创建订单
                </a></Link>
              </Button>
         
            </center>
          </div>
        </div>
      );
    }
}

Mychannel.propTypes = {
  userInfo: PropTypes.object,
  update: PropTypes.func
};

export default Mychannel;