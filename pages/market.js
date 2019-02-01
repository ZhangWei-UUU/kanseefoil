import React,{Component} from "react";
import { Layout,Row,Col,notification} from "antd";
import { observer } from "mobx-react";
import { observable, toJS } from "mobx";
import PropTypes from "prop-types";
import Link from "next/link";
import HeadNav from "../Components/Layout/HeadNav";
import withPrivate from "../Components/Authentication";
import request from "../Components/Fetch/request";

import "../style.css";

const { Content } = Layout;

@observer class Market extends Component{
    @observable products = [];
    static getInitialProps(ctx){
      if(process.browser){
        return {userName:ctx.userName,userId:ctx.userId}; 
      }else{
        return {userName:ctx.userName,userId:ctx.userId};   
      }
    }

    async componentDidMount(){
      let res;
      try{
        res = await request("GET", "/api/product/all");  
      }catch(error){
        console.log(error.toString());
      }

      if(res && res.success && res.result){
        if(res.result.length>0){
          this.products = res.result;
          console.log(res.result);
        }
      }else{
        notification["error"]({
          message: "产品列表加载失败，请检查您的网络是否正常",
          style:{background:"#ffeded",color:"#FF0036",border:"1px solid #FF0036"}
        });
      }
    }
    render(){
      let {userName} = this.props;
      return(
        <Layout>
          <HeadNav themeStyle="light" userName={userName}/> 
          <Content style={{width:"970px",margin:"20px auto"}}>
            <Row>
              {this.products.map((product,key)=>{
                return(
                  <Col span={6} key={key} style={{padding:"8px"}}>
                    <Link href={`/product/details?id=${product._id}`}><a>
                      <div className="list-product-picture">
                        <img src={`http://${product.mainpicture}`}/>
                        <p style={{color:"#484848"}}>{product.name}</p>
                        <p style={{color:"#f23835"}}>￥{product.price}</p>
                      </div>
                    </a></Link>
                  </Col>
                );
              })}
            </Row>
          </Content>  
        </Layout>
      );
    }
}

Market.propTypes = {
  userName:PropTypes.string
};

export default withPrivate(Market,{redirect:true});