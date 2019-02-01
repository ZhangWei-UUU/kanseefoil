import React, { Component } from "react";
import { observer } from "mobx-react";
import { Upload,Icon,notification} from "antd";
import { observable,toJS} from "mobx";
import PropTypes from "prop-types";

import request from "../Fetch/request";

@observer class ProductUpload extends Component{
    @observable tmpKey = null;

    //上传前，前端对上传资料的检测
    fontEndCheck = (file) =>{
      const isJPG = file.type === "image/jpeg";
      if (!isJPG) {
        message.error("图片必须为JPG格式!");
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        message.error("图片大小应该小于2MB!");
      }
      return isJPG && isLt2M;
    }
    
    //上传图片后的返回数据处理
    handleChange = (callback) => {
      let {status,response} = callback.file;
      if(status === "done" && response.success){
        notification["success"]({
          message: "产品图片上传成功",
          style:{background:"#c3f0ad",color:"#fff",border:"1px solid #52c41a"}
        });
        this.props.callback(response.location);
        this.tmpKey = response.Key;
      }

      if(status === "error"){
        notification["error"]({
          message: "产品图片上传失败，请检查您的网络是否正常",
          style:{background:"#ffeded",color:"#FF0036",border:"1px solid #FF0036"}
        });
      }
    }
    
    //上传已上传图片
    deletePic = async () => {
      let res;
      try{
        res = await request("DELETE", `/api/product/deleteUploaded/${this.tmpKey}`);  
      }catch(error){
        console.error(error.toString());
      }
      console.log(res);
      if(res && res.success){
        this.props.callback(null);
      }else{
        notification["error"]({
          message: "删除图片失败，请检查您的网络是否正常",
          style:{background:"#ffeded",color:"#FF0036",border:"1px solid #FF0036"}
        });
      }
    }
    
    render(){
      return(
        <div>
          {this.props.mainpicture?
            <div>
              <a>
                <Icon type="close" style={{position:"absolute",
                  right:"10px",top:"5px",fontSize:"20px",
                  color:"#fff"}}
                onClick={this.deletePic}
                />
              </a>
              <img 
                style={{width:"100%"}}
                src={`http://${this.props.mainpicture}`}/>
            </div>
            :
            <div style={{width:"100%",height:"300px",background:"#e8e8e8",textAlign:"center",lineHeight:"300px"}}>
              <Upload 
                accept="image/*"
                action="/api/product/upload" 
                beforeUpload={this.fontEndCheck}
                onChange={this.handleChange} 
              ><a style={{color:"#999",fontSize:"30px"}}>点击上传您的产品图片</a>
              </Upload>
            </div>
          }
        </div>
      );
    }
}

ProductUpload.propTypes = {
  mainpicture: PropTypes.string,
  callback:PropTypes.func
};
export default ProductUpload;