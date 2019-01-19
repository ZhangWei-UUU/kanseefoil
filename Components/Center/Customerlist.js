import React, { Component } from "react";
import Link from "next/link";
import { Row, Col,Button, Table,message } from "antd";
import { observer } from "mobx-react";
import { observable,toJS} from "mobx";
import PropTypes from "prop-types";
import request from "../Fetch/request";
import "../../Style/course.css";
import fake from "./model";

@observer class Customerlist extends Component{
    @observable columns = [
      {key:0, title:"客户编号",dataIndex:"code",render:(ele)=>
        <Link href={`/usercenter?subitem=orders&&id=${ele}`}>
          <a>{ele}</a>
        </Link>},
      {key:1, title:"客户名称",dataIndex:"orderer",render:(ele)=>
        <Link href={`/usercenter?subitem=customers&&id=${ele}`}>
          <a>{ele}</a>
        </Link>},
      {key:2, title:"地址",dataIndex:"date"},
      {key:3, title:"税号",dataIndex:"product",render:(ele,proxy)=>
        <span>
          <Link href={`/usercenter?subitem=products&&id=${ele}`}>
            <a>{ele}</a>
          </Link> | {proxy.color} | {proxy.size} 
        </span>}
    ]

    @observable dataSource = fake;

    async componentDidMount(){
    //   let data;
    //   try{
    //     data = await request("GET", "./model.json");  
    //   }catch(error){
    //     message.error(error.toString());
    //   }

    //   console.log(data);
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
                <Link href={"/usercenter?subitem=addCustomer"}><a>
            添加客户
                </a></Link>
              </Button>
         
            </center>
          </div>
        </div>
      );
    }
}

Customerlist.propTypes = {
  userInfo: PropTypes.object,
  update: PropTypes.func
};

export default Customerlist;