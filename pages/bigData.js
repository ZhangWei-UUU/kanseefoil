import React,{Component} from "react";
import { Row,Col} from "antd";
import PropTypes from "prop-types";
import { observer } from "mobx-react";
import { observable, toJS } from "mobx";
import Head from "next/head";
import Link from "next/link";
import request from "../Components/Fetch/request";
import "../static/theme.css";
import {data,circle_data,pillar_data,bar_data} from "./fake";
@observer class BigData extends Component{
  componentDidMount(){
      
    var chart = new G2.Chart({
      container: "mountNode",
      forceFit: true,
      height: 380,
      theme: "dark"
    });

    var circle_chart = new G2.Chart({
      container: "circel-place",
      forceFit: true,
      height: 380,
      animate: false,
      theme: "dark"
    });
    
    circle_chart.source(circle_data, {
      percent: {
        formatter: function formatter(val) {
          val = val * 100 + "%";
          return val;
        }
      }
    });
    // 环状图坐标设置
    circle_chart.coord("theta", {
      radius: 0.75,
      innerRadius: 0.6
    });

    circle_chart.tooltip({
      showTitle: false,
      itemTpl: "<li><span style=\"background-color:{color};\" class=\"g2-tooltip-marker\"></span>{name}: {value} | {count} 元</li>"
    });
    
    //环形图表中间文字
    circle_chart.guide().html({
      position: ["50%", "50%"],
      html: "<div style=\"color:#8c8c8c;font-size: 14px;text-align: center;width: 10em;\">销售总额<br><span style=\"color:#8c8c8c;font-size:20px\">190,000</span>元</div>",
      alignX: "middle",
      alignY: "middle"
    });


    var interval = circle_chart.intervalStack().position("percent").color("item").label("percent", {
      // 每一个环状部分的文字
      formatter: function formatter(val, item) {
        return item.point.item + ": " + val;
      }
    }).tooltip("item*percent*count", function(item, percent,count) {
      percent = percent * 100 + "%";
      return {
        name: item,
        value: percent,
        count: count
      };
    }).style({
      lineWidth: 1,
      color:"#000"
    });
    circle_chart.render();


    chart.source(data, {
      year: {
        type: "linear",
        tickInterval: 6
      }
    });
    
    chart.tooltip({
      triggerOn: "click",
      crosshairs: {
        type: "line"
      },
      color:"#000",
      dimension: "type",
    });

    chart.areaStack().position("year*value").color("country");
    chart.lineStack().position("year*value").color("country").size(2);
    chart.render();

    var pillar_chart = new G2.Chart({
      container: "pillar_place",
      forceFit: true,
      height: 380,
      theme: "dark"
    });

    pillar_chart.source(pillar_data);
    pillar_chart.scale("sales", {
      tickInterval: 20
    });
    pillar_chart.interval().position("year*sales");
    pillar_chart.render();


    //条状图
    var _DataSet = DataSet,
      DataView = _DataSet.DataView;

    var dv = new DataView();
    dv.source(bar_data).transform({
      type: "fold",
      fields: ["结算处理中", "已支付", "未支付"],
      key: "opinion",
      value: "value",
      retains: ["group", "type"]
    });

    var colorMap = {
      "未支付": "red",
      "已支付": "#25b864",
      "结算处理中": "#1A6EBC"
    };

    var bar_chart = new G2.Chart({
      container: "bar",
      forceFit: true,
      height: 380,
      padding: "auto",
      theme:"dark"
    });
    bar_chart.source(dv);
    bar_chart.axis("type", {
      title: null,
      labelOffset: 10
    });
    bar_chart.axis("value", {
      position: "right",
      title: null,
      tickLine: null,
      formatter: function formatter(val) {
        return val + "%";
      }
    });
    bar_chart.coord().transpose();
    bar_chart.intervalStack().position("type*value").color("opinion", function(opinion) {
      return colorMap[opinion];
    });
    bar_chart.render();
  }
  render(){
    return(
      <div className="big-data">
        <Head>
          <script src="https://gw.alipayobjects.com/os/antv/pkg/_antv.g2-3.4.1/dist/g2.min.js"></script>
          <script src="https://gw.alipayobjects.com/os/antv/pkg/_antv.data-set-0.10.1/dist/data-set.min.js"></script>
        </Head>
        <div style={{padding:"5px 20px"}}>
          <center>
            <h1 style={{color:"#fff"}}>大数据统计报表</h1>
          </center>
        </div>
        <Row>
          <Col lg={15}>
            <h2 style={{color:"#fff",marginLeft:"30px"}}>大客户数据</h2>
            <div id="mountNode"></div>
          </Col>
          <Col lg={{span:8,offset:1}}>
            <h2 style={{color:"#fff"}}>销售额</h2>
            <div id="circel-place"></div>
          </Col>
          <Col lg={15}>
            <h2 style={{color:"#fff",marginLeft:"30px"}}>逾期未付·警示</h2>
            <div id="bar"></div>
          </Col>
          <Col lg={{span:8,offset:1}}>
            <h2 style={{color:"#fff"}}>产品销量</h2>
            <div id="pillar_place"></div>
          </Col>
        </Row>

      </div>
    );
  }
}

export default BigData;