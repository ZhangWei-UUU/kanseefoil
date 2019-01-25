import React,{Component} from "react";
import { Row,Col } from "antd";

import "../../style.css";

const array = [
  {title:"联系我们",items:[
    {name:"后台展示",link:"/monitor"},
    {name:"Email: kanseefoil@gmail.com",link:"/author"},
  ]}
];
class FooterNav extends Component{
  render(){
    return(
      <div className="footer" async>
        <div className="footer-content">
          <Row>
            {array.map(obj=>{
              return(
                <Col lg={6} key={obj.title}>
                  <p><strong>{obj.title}</strong></p>
                  {obj.items.map(item=>{
                    return(   
                      <a href={item.link} key={item.name}>
                        <p>{item.name}</p>
                      </a>
                    );
                  })}
                </Col>
              );
            })}
                   
                   
          </Row>
          <center style={{marginTop:"50px"}}>
          翰溪订单管理系统版权所有© 2018 备案号：沪ICP备18022274号-1
          </center>
        </div>
      </div>
    );
  }
}

export default FooterNav;

