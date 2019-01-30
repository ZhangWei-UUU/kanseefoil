import React, { Component } from "react";
import { observer } from "mobx-react";
import { Upload,Icon,notification} from "antd";
import { observable,toJS} from "mobx";

@observer class ProductUpload extends Component{
    @observable uploadedImage = null
    fontEndCheck = (file, fileList) =>{
     
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

    handleChange = (callback) => {
      let {status,response} = callback.file;
      console.log(callback);
      if(status === "done" && response.success){
        notification["success"]({
          message: "产品图片上传成功",
          style:{background:"#c3f0ad",color:"#fff",border:"1px solid #52c41a"}
        });
        this.uploadedImage = response.location;
      }

      if(status === "error"){
        notification["error"]({
          message: "产品图片上传成功失败，请检查您的网络是否正常",
          style:{background:"#ffeded",color:"#FF0036",border:"1px solid #FF0036"}
        });
      }
    }

    render(){
      return(
        <div>
          {this.uploadedImage?<img src={`${this.uploadedImage}`}/>:null}
          
          <Upload 
            accept="image/*"
            action="/api/product/upload" 
            beforeUpload={this.fontEndCheck}
            onChange={this.handleChange} 
          >
            <a><Icon type="edit"/>修改</a>
          </Upload>
        </div>
      );
    }
}


export default ProductUpload;