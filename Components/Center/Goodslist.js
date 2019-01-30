import React, { Component } from "react";
import Link from "next/link";
import { Button, Table,message,Icon,notification,Tag } from "antd";
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
      let res;
      try{
        res = await request("GET", "/api/product/all");  
      }catch(error){
        message.error(error.toString());
      }
  
      if(res.success && res.result){
        if(res.result.length>0){
          this.dataSource = res.result;
        }
      }else{
        notification["error"]({
          message: "产品列表加载失败，请检查您的网络是否正常",
          style:{background:"#ffeded",color:"#FF0036",border:"1px solid #FF0036"}
        });
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
        {key:1, title:"产品名称",dataIndex:"name",render:(ele,proxy)=>
          <Link href={`/usercenter?subitem=goods&id=${proxy._id}`}>
            <a>{ele}</a>
          </Link>},
        {key:4, title:"颜色",dataIndex:"color",
          render:(colors)=>{
            return colors.map((color,key)=>{
              return(
                <Tag key={key} color={color}>{color}</Tag>
              );
            });
          }
        },
        {key:5, title:"尺寸",dataIndex:"size",
          render:(colors)=>{
            return colors.map((color,key)=>{
              return(
                <Tag key={key} color={"green"}>{color}</Tag>
              );
            });
          }
        },
        {key:6, title:"价格",dataIndex:"price",
          render:(colors)=>{
            return colors.map((price,key)=>{
              return(
                <Tag key={key} color={"red"}>{price.count}</Tag>
              );
            });
          }
        },
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