import React, { Component } from "react";
import Link from "next/link";
import { Button, Table,message,Icon,notification,Tag } from "antd";
import { observer } from "mobx-react";
import { observable,toJS} from "mobx";
import PropTypes from "prop-types";
import request from "../Fetch/request";
import "../../Style/course.css";
import {COLORS_CONVERT,METIRAILS_CONVERT} from "../../Translator";

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
      console.log(res.result);
      if(res && res.success && res.result){
        if(res.result.length>0){
          this.dataSource = res.result;
        }
      }
    }

    delete = async (proxy) => {
      let res;
      let deletePicRes;
      const urlarray = proxy.mainpicture.split(".com/");
      try{
        res = await request("DELETE", `/api/product/${proxy._id}`);  
        deletePicRes = await request("DELETE", `/api/product/deleteUploaded/${urlarray[1]}`);  
      }catch(error){
        message.error(error.toString());
      }
      if(res && res.value && res.value._id === proxy._id && res.ok === 1 &&  deletePicRes &&  deletePicRes.success){
        message.success("删除成功");
        this.getList();
      }else{
        message.error("删除失败，请检查网络是否正常");
      }
    }
    
    render(){
      const columns = [
        {key:1, title:"产品名称",dataIndex:"name"},
        {key:2, title:"使用范围",dataIndex:"suited",
          render:(suited)=>{
            return suited.map((s,key)=>{
              return(
                <Tag key={key} color="#000">{METIRAILS_CONVERT[s]}</Tag>
              );
            });
          }
        },
        {key:4, title:"颜色",dataIndex:"colors",
          render:(colors)=>{
            return colors.map((color,key)=>{
              return(
                <Tag key={key} color={color}>{COLORS_CONVERT[color]}</Tag>
              );
            });
          }
        },
        {key:5, title:"尺寸",dataIndex:"size",
          render:(size)=>{
            return size.map((s,key)=>{
              return(
                <Tag key={key} color={"#000"}>{s}米</Tag>
              );
            });
          }
        },
        {key:6, title:"价格",dataIndex:"price",
          render:(price)=>{
            return <strong style={{color:"red"}}>{"￥"+price}</strong>;
          }
        },
        {key:7, title:"操作",dataIndex:"handle",render:(ele,proxy)=>{
          return(<a onClick={()=>this.delete(proxy)}><Icon type="delete"/></a>);
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