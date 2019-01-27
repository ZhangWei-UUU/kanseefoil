import React,{Component} from "react";
import {Layout,Row,Col} from "antd";
import Link from "next/link";
import Head from "next/head";
import PropTypes from "prop-types";
import { observer } from "mobx-react";
import { observable } from "mobx";
import dynamic from "next/dynamic";
import withPrivate from "../Components/Authentication";
import HeadNav from "../Components/Layout/HeadNav";
import "../style.css";

@observer class Home extends Component{
    @observable list = []
    static getInitialProps(ctx){
      if(process.browser){
        return {loginUser:window.LOGIN_DATA.loginUser};
      }else{
        return {loginUser:ctx.req.session.loginUser};   
      }
    }
    
    componentDidMount(){
      //宇宙特效
      "use strict";
      var canvas = document.getElementById("canvas"),
        ctx = canvas.getContext("2d"),
        w = canvas.width = window.innerWidth,
        h = canvas.height = window.innerHeight,

        hue = 217,
        stars = [],
        count = 0,
        maxStars = 1300;//星星数量

      var canvas2 = document.createElement("canvas"),
        ctx2 = canvas2.getContext("2d");
      canvas2.width = 100;
      canvas2.height = 100;
      var half = canvas2.width / 2,
        gradient2 = ctx2.createRadialGradient(half, half, 0, half, half, half);
      gradient2.addColorStop(0.025, "#CCC");
      gradient2.addColorStop(0.1, "hsl(" + hue + ", 61%, 33%)");
      gradient2.addColorStop(0.25, "hsl(" + hue + ", 64%, 6%)");
      gradient2.addColorStop(1, "transparent");

      ctx2.fillStyle = gradient2;
      ctx2.beginPath();
      ctx2.arc(half, half, half, 0, Math.PI * 2);
      ctx2.fill();

      // End cache

      function random(min, max) {
        if (arguments.length < 2) {
          max = min;
          min = 0;
        }

        if (min > max) {
          var hold = max;
          max = min;
          min = hold;
        }

        return Math.floor(Math.random() * (max - min + 1)) + min;
      }

      function maxOrbit(x, y) {
        var max = Math.max(x, y),
          diameter = Math.round(Math.sqrt(max * max + max * max));
        return diameter / 2;
        //星星移动范围，值越大范围越小，
      }

      var Star = function() {

        this.orbitRadius = random(maxOrbit(w, h));
        this.radius = random(60, this.orbitRadius) / 8; 
        //星星大小
        this.orbitX = w / 2;
        this.orbitY = h / 2;
        this.timePassed = random(0, maxStars);
        this.speed = random(this.orbitRadius) / 100000; 
        //星星移动速度
        this.alpha = random(2, 10) / 10;

        count++;
        stars[count] = this;
      };

      Star.prototype.draw = function() {
        var x = Math.sin(this.timePassed) * this.orbitRadius + this.orbitX,
          y = Math.cos(this.timePassed) * this.orbitRadius + this.orbitY,
          twinkle = random(10);

        if (twinkle === 1 && this.alpha > 0) {
          this.alpha -= 0.05;
        } else if (twinkle === 2 && this.alpha < 1) {
          this.alpha += 0.05;
        }

        ctx.globalAlpha = this.alpha;
        ctx.drawImage(canvas2, x - this.radius / 2, y - this.radius / 2, this.radius, this.radius);
        this.timePassed += this.speed;
      };

      for (var i = 0; i < maxStars; i++) {
        new Star();
      }

      function animation() {
        ctx.globalCompositeOperation = "source-over";
        ctx.globalAlpha = 0.5; //尾巴
        ctx.fillStyle = "hsla(" + hue + ", 64%, 6%, 2)";
        ctx.fillRect(0, 0, w, h);

        ctx.globalCompositeOperation = "lighter";
        for (var i = 1, l = stars.length; i < l; i++) {
          stars[i].draw();
        };

        window.requestAnimationFrame(animation);
      }

      animation();
    }
    render(){
      return(
        <Layout>
          <Head>
            <title>KANSEE 金箔</title>
          </Head>
          
          <div style={{position:"absolute",
            width:"100%",
            height:"100%",
            top:0,left:0,bottom:0,right:0,
            background:"linear-gradient(135deg,#172029,#111A23 76%,#111A23 0)"}}>
            <canvas id="canvas"></canvas> 
            <Row style={{position:"absolute",
              width:"100%",
              height:"100%",
              zIndex:"100",
              top:0,left:0,bottom:0,right:0,
              background:"none"}}>
              <Col lg={{span:8,offset:8}} md={{span:12,offset:6}}>
                <h1 style={{color:"#fff",marginTop:"300px",textAlign:"center",fontSize:"60px"}}>Kansee · 翰溪<br/>智能管理系统</h1>
                <center>
                  <Link href="/login">
                    <a style={{border:"1px solid #fff",
                      borderRadius:"8px",padding:"5px 10px",
                      margin:"10px auto",
                      color:"#fff",fontSize:"20px"}}>点击登录
                    </a>
                  </Link>
                </center>
              </Col>
            </Row>
           
            <div style={{position:"absolute",color:"#fff",bottom:10,textAlign:"center",width:"100%"}}>
             翰溪订单管理系统版权所有© 2018 备案号：沪ICP备18022274号-1
            </div>
          </div>

        </Layout>
      );
    }
};

Home.propTypes = {
  loginUser:PropTypes.string
};

export default withPrivate(Home,{redirect:false});