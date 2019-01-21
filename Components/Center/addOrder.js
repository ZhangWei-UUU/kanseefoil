import React, { Component } from "react";
import Link from "next/link";
import { Breadcrumb,Icon,Button,Divider, Drawer,Row,Col,message,Select, Table } from "antd";
import { observer } from "mobx-react";
import { observable,toJS} from "mobx";
import PropTypes from "prop-types";
import request from "../Fetch/request";
import "../../Style/course.css";

const {Option} = Select;

@observer class addOrder extends Component{
    @observable customers = null;
    @observable selectedCustomer = null;
    @observable selectedContactor = null;
    @observable visible = false;
    async componentDidMount(){
      let data;
      try{
        data = await request("GET", "/api/customer/all");  
      }catch(error){
        message.error(error.toString());
      }
    
      if(data && data.length>0){
        this.customers = data.reverse();
        this.selectedCustomer = this.customers[0];
        this.selectedContactor = this.customers[0].contactors[0];
      }
    }

    showDrawer = () => {
      this.visible= true;
    }
    
    onClose = () => {
      this.visible= false;
    };

    selectCustomer = (e) => {
      this.customers.forEach(customer=>{
        if(customer.name === e){
          this.selectedContactor = customer.contactors[0];
          this.selectedCustomer = customer;
        }
      });
    }

    selectedContactor = (e) => {
      this.selectedCustomer.contactors.forEach(contactor=>{
        if(contactor.name === e){
          this.selectedContactor = contactor;
        }
      });
    }

    handleSubmit = (e) => {
      e.preventDefault();
      this.props.form.validateFields(async (err, values) => {
        if (!err) {
    
        }
      });
    }

    render(){
      const columns = [{
        title: "产品型号",
        dataIndex: "name",
        key: "name",
      }, {
        title: "尺寸",
        dataIndex: "size",
        key: "size",
      }, {
        title: "颜色",
        dataIndex: "color",
        key: "color",
      }, {
        title: "单价",
        dataIndex: "price",
        key: "price",
      }, {
        title: "数量",
        dataIndex: "count",
        key: "count",
      }, {
        title: "合计",
        dataIndex: "sum",
        key: "sum",
      }, {
        title: "操作",
        dataIndex: "handle",
        key: "handle",
      }];
      return(
        <div>
          <div style={{margin:"30px auto",width:"1200px",background:"#fff",height:"800px",padding:"50px"}}>
            <Breadcrumb>
              <Breadcrumb.Item>
                <Link  href="/usercenter?subitem=mychannel"><a>
                  <Icon type="home" />
                  <span>订单列表</span>
                </a></Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <Icon type="user" />
                <span>新建订单</span>
              </Breadcrumb.Item>
            </Breadcrumb>
            <Divider/>
            <Row>
              <Col lg={7}>
                <Button type="primary" onClick={this.showDrawer}>
                  <Icon type="plus" /> 添加产品
                </Button>     
              </Col>
              <Col lg={8}>
                {this.customers?
                  <Select prefix={<Icon type="trademark" style={{ color: "rgba(0,0,0,.25)"}} />} 
                    placeholder="选择客户名称" onChange={this.selectCustomer} 
                    defaultValue={this.customers.length>0?this.customers[0].name:null}
                    style={{width:"100%" }} >
                    {this.customers.map(customer=>{
                      return(<Option key={customer.name}>{customer.name}</Option>);
                    })}
                  </Select>:null}
              </Col>
              <Col lg={{span:8,offset:1}}>
                <h3>地址：{this.selectedCustomer?`${this.selectedCustomer.address}`:null}</h3>
              </Col>
            </Row>
            <Row style={{marginTop:"20px"}}>
              <Col lg={{span:8,offset:7}}>
                {this.selectedContactor.name
                  ?
                  <Select prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)"}} />} 
                    placeholder="联系人" style={{width:"100%" }} 
                    value={this.selectedContactor.name}
                  >
                    {this.selectedCustomer.contactors.map(customer=>{
                      return(<Option key={customer.name}>{customer.name}</Option>);
                    })}
                  </Select>:null}
              </Col>
              <Col lg={{span:8,offset:1}}>
                <h3>电话：{this.selectedContactor?this.selectedContactor.tel:null}</h3>
              </Col>
              <div>
               
                <Table columns={columns} style={{margin:"50px 0"}}/>
                <h2>总价：</h2>    
                
                <center>
                  <Button type="primary" htmlType="submit" 
                    loading={this.loading}
                    style={{width:"350px"}}>
                      确认下单
                  </Button>
          
                </center>
              </div>
            </Row>
          </div>
          <Drawer title="产品选择"
            width={420}
            placement="left"
            onClose={this.onClose}
            visible={this.visible}
            style={{
              overflow: "auto",
              height: "calc(100% - 108px)",
              paddingBottom: "108px",
            }}>xxx</Drawer>
        </div>
      );
    }
}

addOrder.propTypes = {
  userInfo: PropTypes.object,
  form:PropTypes.object
};

export default addOrder;
