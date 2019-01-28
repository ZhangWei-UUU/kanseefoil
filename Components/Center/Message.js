import React, { Component } from "react";
import { Row,Col,Badge  } from "antd";
import "../../style.css";

class Messages extends Component{
 
  render(){
    return(
      <div id="target">
        <iframe src="https://wx.qq.com"
          sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
          height="820px" width="100%" frameBorder="0" 
          align="middle">
        </iframe>
      </div>
    );
  }
}

export default Messages;