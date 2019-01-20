import React, { Component } from "react";
import Link from "next/link";
import { Button, Table,message,Icon } from "antd";
import { observer } from "mobx-react";
import { observable,toJS} from "mobx";
import PropTypes from "prop-types";
import request from "../Fetch/request";
import "../../Style/course.css";

@observer class Customerlist extends Component{
    @observable dataSource = [];
    componentDidMount(){
      this.getList();
    }
    
    getList = async () =>{
      let data;
      try{
        data = await request("GET", "/api/customer/all");  
      }catch(error){
        message.error(error.toString());
      }
  
      if(data && data.length>0){
        this.dataSource = data.reverse();
      }
    }

    delete = async (_id) => {
      let res;
      try{
        res = await request("DELETE", `/api/customer/${_id}`);  
      }catch(error){
        message.error(error.toString());
      }
      if(res && res.value && res.value._id === _id && res.ok === 1){
        message.success("删除成功");
        this.getList();
      }else{
        message.error("删除失败，请检查网");
      }
    }
    
    render(){
      const columns = [
        {key:3, title:"税号",dataIndex:"code"},
        {key:1, title:"客户名称",dataIndex:"name",render:(ele,proxy)=>
          <Link href={`/usercenter?subitem=customers&id=${proxy._id}`}>
            <a>{ele}</a>
          </Link>},
        {key:2, title:"地址",dataIndex:"address"},
        {key:4, title:"联系人",dataIndex:"contactors",render:(ele)=>ele && ele.length>0?ele[0].name:"无"},
        {key:5, title:"联系电话",dataIndex:"contactors",render:(ele)=>ele && ele.length>0?ele[0].tel:"无"},
        {key:6, title:"操作",dataIndex:"handle",render:(ele,proxy)=>{
          return(<a onClick={()=>this.delete(proxy._id)}><Icon type="delete"/></a>);
        }},
      ];

      return(
        <div>
          <div style={{margin:"30px auto",width:"95%",background:"#fff",height:"900px",padding:"50px"}}>
            <Table columns={columns} dataSource={this.dataSource}/>
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