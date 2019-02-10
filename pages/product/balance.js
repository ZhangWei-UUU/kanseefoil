import React,{Component} from "react";
import { Layout,Row,Col,Steps} from "antd";
import { observer } from "mobx-react";
import { observable } from "mobx";
import PropTypes from "prop-types";
import HeadNav from "../../Components/Layout/HeadNav";
import withPrivate from "../../Components/Authentication";
import ConfirmList from "../../Components/Order/ConfirmList";
import ConfirmReceiver from "../../Components/Order/ConfirmReceiver";
import Finished from "../../Components/Order/Finished";
import "../../style.css";
const Step = Steps.Step;
const { Content } = Layout;

@observer class Balance extends Component{
  static getInitialProps(ctx){
    if(process.browser){   
      return {userName:ctx.userName,userId:ctx.userId,id:ctx.query.id}; 
    }else{
      return {userName:ctx.userName,userId:ctx.userId,id:ctx.req.query.id};   
    }
  }

  @observable current = 0;
  
  jumpPage = (index,option) =>{
    this.current = index;
  }

  render(){
    let {userName} = this.props;
    const steps = [{
      title: "确认商品订单",
      content: <ConfirmList jumpPage={this.jumpPage}/>,
    }, {
      title: "选择收货客户",
      content: <ConfirmReceiver jumpPage={this.jumpPage}/>,
    }, {
      title: "完成",
      content: <Finished />,
    }];
    return(
      <Layout>
        <HeadNav themeStyle="light" userName={userName}/> 
        <Content style={{margin:"30px auto",width:"1100px",background:"#fff",height:"auto",padding:"50px",position:"relative"}}>
          <Steps current={this.current}>
            {steps.map(item => <Step key={item.title} title={item.title} />)}
          </Steps>
          <div className="steps-content">{steps[this.current].content}</div>
        </Content>  
      </Layout>
    );
  }
}

Balance.propTypes = {
  userName:PropTypes.string,
  id:PropTypes.string
};

export default withPrivate(Balance,{redirect:true});