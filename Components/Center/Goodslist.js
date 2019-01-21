import React, { Component } from "react";
import Link from "next/link";
import { Button, Table,message,Icon } from "antd";
import { observer } from "mobx-react";
import { observable,toJS} from "mobx";
import PropTypes from "prop-types";
import request from "../Fetch/request";
import "../../Style/course.css";

@observer class Goodslist extends Component{
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
        {key:3, title:"商品编号",dataIndex:"_id"},
        {key:1, title:"产品名称",dataIndex:"name",render:(ele,proxy)=>
          <Link href={`/usercenter?subitem=goods&id=${proxy._id}`}>
            <a>{ele}</a>
          </Link>},
        {key:2, title:"产品型号",dataIndex:"address"},
        {key:4, title:"颜色",dataIndex:"contactors",render:(ele)=>ele && ele.length>0?ele[0].name:"无"},
        {key:5, title:"尺寸",dataIndex:"contactors",render:(ele)=>ele && ele.length>0?ele[0].tel:"无"},
        {key:6, title:"价格",dataIndex:"contactors",render:(ele)=>ele && ele.length>0?ele[0].tel:"无"},
        {key:7, title:"操作",dataIndex:"handle",render:(ele,proxy)=>{
          return(<a onClick={()=>this.delete(proxy._id)}><Icon type="delete"/></a>);
        }},
      ];

      return(
        <div>
          <div style={{margin:"30px auto",width:"95%",background:"#fff",height:"900px",padding:"50px"}}>
            <Table columns={columns} dataSource={this.dataSource}/>
            <center>
              <Button type="primary" style={{marginTop:"50px"}}>
                <Link href={"/usercenter?subitem=addGoods"}><a>
                 上架新产品
                </a></Link>
              </Button>
         
            </center>
          </div>
        </div>
      );
    }
}

Goodslist.propTypes = {
  userInfo: PropTypes.object,
  update: PropTypes.func
};

export default Goodslist;