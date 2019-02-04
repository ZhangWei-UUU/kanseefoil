import React, { Component } from "react";
import Link from "next/link";
import { Button, Table,message } from "antd";
import { observer } from "mobx-react";
import { observable,toJS} from "mobx";
import PropTypes from "prop-types";
import moment from "moment";
import request from "../Fetch/request";
import "../../Style/course.css";

@observer class Mychannel extends Component{


    @observable dataSource = [];

    async componentDidMount(){
      let data;
      try{
        data = await request("GET", "/api/order/all");  
      }catch(error){
        message.error(error.toString());
      }

      if(data && data.success && data.result){
        this.dataSource = data.result;
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
        data = await request("DELETE", `/api/order/${value}`);  
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
      const columns = [
        {key:0, title:"订单编号",dataIndex:"_id",render:(ele)=>
          <Link href={`/usercenter?subitem=orders&id=${ele}`}>
            <a>{ele}</a>
          </Link>},
        {key:1, title:"订货单位",dataIndex:"receiver",render:(receiver)=>
          <Link href={`/usercenter?subitem=customers&id=${receiver.name}`}>
            <a>{receiver.name}</a>
          </Link>},
        {key:2, title:"下单时间",dataIndex:"date",render:(value)=>{
          return <span>{moment(value).format("YYYY-MM-DD HH:mm:ss")}</span>;
        }},
        {key:3, title:"总金额",dataIndex:"sum",render:(ele,proxy)=><strong style={{color:"red"}}>￥{ele}</strong>},
        {key:4, title:"结算",dataIndex:"clearup",render:(ele,proxy)=>{
          return <Link href={`/usercenter?subitem=balance&id=${proxy.code}`}><a>{ele?"已结算":"未结算"}</a></Link>;
        }},
      ];
      return(
        <div>
          <div style={{margin:"30px auto",width:"95%",background:"#fff",height:"900px",padding:"50px"}}>
            <Table columns={columns} dataSource={this.dataSource}/>
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