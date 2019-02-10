import React from "react";
import { Icon, Button } from "antd";
import Link from "next/link";

const Finished  = () => (
  <div style={{marginTop:"70px"}}>
    <center>
      <Icon type="check-circle" theme="filled" style={{fontSize:"80px",color:"#52c41a",marginBottom:"20px"}}/>
      <h2>订单提交成功</h2>
      <p style={{color:"rgba(0,0,0,.45)"}}>请尽快安排发货</p>
     
    </center>
    <div style={{width:"500px",height:"300px",margin:"20px auto",background:"#fafafa"}}>

    </div>
    <center>
      <Link href="/market"><a>
        <Button type="primary">再下一单</Button>
      </a></Link>
      <Link href="/usercenter"><a>
        <Button style={{marginLeft:"20px"}}>查看订单列表</Button>
      </a>
      </Link>
    </center>
  </div>
);

export default Finished;