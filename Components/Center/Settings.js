import React, { Component } from "react";
import { Card,Input,Upload,Icon,Alert,Divider,Row,Col } from "antd";
import { observer } from "mobx-react";
import { observable} from "mobx";
import PropTypes from "prop-types";
import request from "../Fetch/request";
import parseCookies from "../Authentication/parseCookies";
import "../../Style/course.css";

@observer class Settings extends Component{
  @observable editBlock = null;
  @observable userHeaderUrl = null;
  @observable userEnterprise = null;
  @observable userTitle = null;
  edit = (params) => {
    this.editBlock = params;
  }
  
  handleChange = (info) => {
    const { file } = info;
    if (file.status === "done") {
      const { docId } = file.response;
      alert("成功");
    }
    if (file.status === "error") {
      alert("失败");
    }
  }
  async componentDidMount(){
    let cookieInfo = parseCookies(document.cookie);
    cookieInfo.userHeaderUrl?this.userHeaderUrl = cookieInfo.userHeaderUrl:null;
    cookieInfo.userEnterprise?this.userEnterprise = cookieInfo.userEnterprise:null;
    cookieInfo.userTitle?this.userTitle = cookieInfo.userTitle:null;
  }
  render(){
    return(
      <div>
        <Card title="账户信息" 
          bordered={false} 
          style={{width:"720px",margin:"20px auto"}}
        >
          {this.formStatus === "error"?<Alert message="新增课程失败" type="error" showIcon />:null}
          <Row>
            <Col span={4}>
              <strong>用户头像</strong>
            </Col>
            <Col span={4}>
              {this.userHeaderUrl?<div>有头像</div>:<div style={{width:"80px",height:"80px",background:"#e8e8e8"}}></div>}
            </Col>
            <Col span={12}>
              <p style={{marginTop:"40px",color:"#999"}}>支持 jpg、png 格式大小 2M 以内的图片</p>
            </Col>
            <Col span={4}>
              <Upload 
                name="header"
                onChange={this.handleChange} 
                accept="image/*"
                action="/api/authentication/uploadUserHeader" >
                <a><Icon type="edit"/>修改</a>
              </Upload>
            </Col>
          </Row>           
          <Divider/>
          <Row>
            <Col span={4}>
              <strong>公司名称</strong>
            </Col>
            <Col span={16}>
              {this.editBlock === 1?<Input style={{width:"300px"}}/>:
                <p style={{color:"#999"}}>
                  {this.userEnterprise?this.userEnterprise:"请填写您的公司名称"}
                </p>
              }
              
            </Col>
            <Col span={4}>
              {this.editBlock === 1?
                <span>
                  <a onClick={()=>this.edit()}>
                    <Icon type="edit"/>取消
                  </a> |  
                  <a onClick={()=>this.edit()}>
                    <Icon type="upload"/>提交
                  </a> 
                </span>
                :<a onClick={()=>this.edit(1)}><Icon type="edit"/>修改</a>  
              }
            </Col>
          </Row>
          <Divider/>
          <Row>
            <Col span={4}>
              <strong>用户职位</strong>
            </Col>
            <Col span={16}>
              {this.editBlock === 2?<Input style={{width:"300px"}}/>:
                <p style={{color:"#999"}}>
                  {this.userTitle?this.userTitle:"请填写您的公司职位"}
                </p>
              }
            </Col>
            <Col span={4}>
              {this.editBlock === 2?
                <span>
                  <a onClick={()=>this.edit()}>
                    <Icon type="edit"/>取消
                  </a> |  
                  <a onClick={()=>this.edit()}>
                    <Icon type="upload"/>提交
                  </a> 
                </span>
                :<a onClick={()=>this.edit(2)}><Icon type="edit"/>修改</a>  
              }
            </Col>
          </Row>
            
          <Divider/>
          <Row>
            <Col span={4}>
              <strong>数据库管理</strong>
            </Col>
            <Col span={16} style={{color:"#999"}}>
              <p>默认数据库为mongodb,数据路径为/data/db,在导出数据：
                {"mongoexport --db DB_NAME -c DATA_COLLECTION --query \"{}\" --out xxx.json"}
              </p>
              <p>
              导入数据：  
                {"mongoimport --db DB_NAME -c DATA_COLLECTION --file xxx.json"}
              </p>
            </Col>
            <Col span={4}>
              
            </Col>
          </Row>
            
          <Divider/>

        </Card>
      </div>
    );
  }
}

Settings.propTypes = {
  form:PropTypes.object
};
export default Settings;