
var express = require("express");
var next = require("next");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
const compression = require("compression");
var dev = process.env.NODE_ENV !== "production";
var configure = require("./configure/index.js");
var app = next({dev});
var authentication = require("./api/authentication.js");
var order = require("./api/order.js");
var product = require("./api/product.js");

var partners = require("./api/partners.js");

const handle = app.getRequestHandler();

var server = express();
server.set("trust proxy", 1); // trust first proxy
server.set("port",configure.port);
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

server.use(cookieParser());
server.use(compression());
server.use("/api/authentication",authentication);
server.use("/api/order",order);
server.use("/api/product",product);
server.use("/api/partners",partners);
server.use(function (req, res, next) {
  return next();
});

app.prepare().then(()=>{
  server.get("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(configure.port,(err)=>{
    if (err) throw err;
    console.log(`启动安全服务器,端口号：${configure.port}`);
  });
});

process.on("uncaughtException",(err)=>{
  console.log(err);
});

