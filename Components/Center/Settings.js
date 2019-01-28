import React, { Component } from "react";
import { Card,Button,Form,Upload,Icon,Alert,Divider } from "antd";
import { observer } from "mobx-react";
import { observable,toJS} from "mobx";
import PropTypes from "prop-types";
import request from "../Fetch/request";

import "../../Style/course.css";
const FormItem = Form.Item;

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};
@observer class Settings extends Component{
    // 进度条
    @observable tags = ["ceshi"];
    @observable formStatus = null;
    @observable inputVisible = false;
    showInput = () => {
      this.inputVisible= true;
      () => this.input.focus();
    }

    saveInputRef = input => this.input = input

    handleClose = (removedTag) => {
      const tags = this.tags.filter(tag => tag !== removedTag);
      this.tags = tags;
    }

    handleInputChange = (e) => {
      console.log(e.target.value);
      this.inputValue =  e.target.value;
    }

    handleInputConfirm = () => {
      let tags = this.tags;
      //   if (this.inputValue && this.tags.indexOf(inputValue) === -1) {
      //     tags = [...tags, this.inputValue];
      //   }
      tags = [...tags, this.inputValue];
      this.inputValue =  "";
      this.inputVisible= false;
      this.tags = tags;
    }

   handleSubmit = (e) => {
     e.preventDefault();
     this.props.form.validateFields(  async (err, values) => {
     
       if (!err) {
         this.formStatus = "loading";
         let data;
         try{
           data = await request("PUT", "/api/course/setting");  
         }catch(e){
           this.formStatus = "error";
         }finally{
           setTimeout(()=>{
             this.formStatus = null;
           },3000);
         }
         console.log(data);
       }else{
         console.log("Received values of form: ", values);
       }
     });
   }

   render(){
     const { getFieldDecorator } = this.props.form;

     return(
       <div>
         <Card title="账户信息" 
           bordered={false} 
           style={{width:"720px",margin:"20px auto"}}
         >
           {this.formStatus === "error"?<Alert message="新增课程失败" type="error" showIcon />:null}
           
           <Form onSubmit={this.handleSubmit}>
             <FormItem
               {...formItemLayout}
               label="头像"
             >
               <div className="dropbox">
                 {getFieldDecorator("dragger", {
                   valuePropName: "fileList",
                   getValueFromEvent: this.normFile,
                 })(
                   <Upload name="files" action="/upload.do" 
                   >
                     <p>
                       支持 jpg、png 格式大小 2M 以内的图片
                     </p>
                     <Button type="primary">
                       <Icon type="inbox" /> 修改头像                    
                     </Button> 
                   </Upload>
                 )}
               </div>
             </FormItem>
             <Divider/>
             <FormItem
               {...formItemLayout}
               label="公司名称"
             >
               <span className="ant-form-text">China</span>
             </FormItem>
             <Divider/>
             <FormItem
               {...formItemLayout}
               label="职位"
             >
               <span className="ant-form-text">China</span>
             </FormItem>
             <Divider/>
             <FormItem>
               <Button type="primary" htmlType="submit" className="course-btn">确认提交</Button>
             </FormItem>
           </Form>
         </Card>
       </div>
     );
   }
}

Settings.propTypes = {
  form:PropTypes.object
};
export default Form.create()(Settings);