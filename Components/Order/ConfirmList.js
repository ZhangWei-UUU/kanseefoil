import React,{Component} from "react";
import Router from "next/router";
import PropTypes from "prop-types";

import {
  Table, Input, InputNumber, Popconfirm, Form,Row,Col,notification
} from "antd";

const FormItem = Form.Item;
const EditableContext = React.createContext();
  
const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);
  
const EditableFormRow = Form.create()(EditableRow);
  
class EditableCell extends React.Component {
    getInput = () => {
      if (this.props.inputType === "number") {
        return <InputNumber />;
      }
      return <Input />;
    };
  
    render() {
      const {
        editing,
        dataIndex,
        title,
        inputType,
        record,
        index,
        ...restProps
      } = this.props;
      return (
        <EditableContext.Consumer>
          {(form) => {
            const { getFieldDecorator } = form;
            return (
              <td {...restProps}>
                {editing ? (
                  <FormItem style={{ margin: 0 }}>
                    {getFieldDecorator(dataIndex, {
                      rules: [{
                        required: true,
                        message: `Please Input ${title}!`,
                      }],
                      initialValue: record[dataIndex],
                    })(this.getInput())}
                  </FormItem>
                ) : restProps.children}
              </td>
            );
          }}
        </EditableContext.Consumer>
      );
    }
}
  
class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data:[], editingKey: "" };
    this.columns = [
      {
        title: "商品名称",
        dataIndex: "name",
        width: "25%",
        editable: false,
      },
      {
        title: "数量",
        dataIndex: "count",
        width: "15%",
        editable: true,
      },
      {
        title: "单价",
        dataIndex: "price",
        editable: true,
      },
      {
        title: "合计",
        dataIndex: "sum",
        editable: false,
        render:(ele,proxy)=>{
          return(
            <span>￥{proxy.price * proxy.count}</span>
          );
        }
      },
      {
        title: "操作",
        dataIndex: "operation",
        render: (text, record) => {
          const editable = this.isEditing(record);
          return (
            <div>
              {editable ? (
                <span>
                  <EditableContext.Consumer>
                    {form => (
                      <a
                        href="javascript:;"
                        onClick={() => this.save(form, record.key)}
                        style={{ marginRight: 8 }}
                      >
                          保存
                      </a>
                    )}
                  </EditableContext.Consumer>
                  <Popconfirm
                    title="是否确认取消?"
                    onConfirm={() => this.cancel(record.key)}
                  >
                    <a>取消</a>
                  </Popconfirm>
                </span>
              ) : (
                <div>
                  <span style={{marginRight:"10px"}}>
                    <a onClick={() => this.edit(record.key)}>修改</a> 
                  </span>
                  <span>
                    <Popconfirm
                      title="是否确认删除?"
                      onConfirm={() => this.delete(record)}
                    >
                      <a>删除</a>
                    </Popconfirm>
                   
                  </span>
                </div>
              )}
            </div>
          );
        },
      },
    ];
  }
    
  componentDidMount(){
    var shopping_cart = sessionStorage.getItem("shopping-cart");
    if(shopping_cart){
      var originData = JSON.parse(shopping_cart);
      var productArray = originData.filter((obj,key)=>{
        obj.key = key;
        return obj;
      });
      this.setState({ data:productArray });
    }else{
      Router.push("/market");
    }
  }

    delete = (record) => {
      var newarray = this.state.data.filter((obj)=>{
        if(record.id === obj.id){
          return null;
        }else{
          return obj;
        }
      });
      sessionStorage.setItem("shopping-cart",JSON.stringify(newarray));
      this.setState({ data:newarray});
    }

    isEditing = record => record.key === this.state.editingKey;
  
    cancel = () => {
      this.setState({ editingKey: "" });
    };
    
    cancelOrder = () => {
      sessionStorage.removeItem("shopping-cart");
      notification["success"]({
        message: "订单取消，回到商品页面",
        style:{background:"#c3f0ad",color:"#fff",border:"1px solid #52c41a"}
      });
      Router.push("/market");
    }

    save(form, key) {
      form.validateFields((error, row) => {
        if (error) {
          return;
        }
        const newData = [...this.state.data];
        const index = newData.findIndex(item => key === item.key);
        if (index > -1) {
          const item = newData[index];
          newData.splice(index, 1, {
            ...item,
            ...row,
          });
          sessionStorage.setItem("shopping-cart",JSON.stringify(newData));
          this.setState({ data: newData, editingKey: "" });
        } else {
          newData.push(row);
          sessionStorage.setItem("shopping-cart",JSON.stringify(newData));
          this.setState({ data: newData, editingKey: "" });
        }
      });
    }
    
    confirm = () => {
      sessionStorage.setItem("shopping-cart",JSON.stringify(this.state.data));
      this.props.jumpPage(1);
    }

    edit(key) {
      this.setState({ editingKey: key });
    }
    
    sumPrice = (data)=>{
      let result = 0;
      data.forEach(obj=>{
        var sum = obj.count * obj.price;
        result += sum;
      });
      return result;
    }

    render() {
      const components = {
        body: {
          row: EditableFormRow,
          cell: EditableCell,
        },
      };
  
      const columns = this.columns.map((col) => {
        if (!col.editable) {
          return col;
        }
        return {
          ...col,
          onCell: record => ({
            record,
            inputType: col.dataIndex === "age" ? "number" : "text",
            dataIndex: col.dataIndex,
            title: col.title,
            editing: this.isEditing(record),
          }),
        };
      });
  
      return (
        <div>
          <Table
            style={{marginTop:"50px"}}
            components={components}
            bordered
            dataSource={this.state.data}
            columns={columns}
            rowClassName="editable-row"
            pagination={false}
          />
          <Row style={{marginTop:"50px"}}>
            <Col span={5} offset={9}>    
              <h2 style={{lineHeight:"60px"}}>总价：
                <span style={{color:"red"}}>￥ {this.sumPrice(this.state.data)}
                </span>
              </h2>
            </Col>
            <Col span={5}>    
              <button className="goods-btn-empty"  onClick={this.cancelOrder}> 取消订单</button>
            </Col>
            <Col span={5}>
              <button className="goods-btn" 
                loading={`${this.loading}`}
                onClick={this.confirm}>确认订单</button>
            </Col>
          </Row>
        </div>
       
      );
    }
}

EditableTable.propTypes = {
  jumpPage:PropTypes.func
};

export default EditableTable;