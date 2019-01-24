var express = require("express");
var router = express.Router();

const MongoClient = require("mongodb").MongoClient;
const os = require("os");
var fs = require("fs");
const request = require("request");
var hash = require("hash.js");
var checkPrivated = require("./Middleware/authentication");
var checkRegister = require("./Middleware/checkRegister");
var checkBlacklist = require("./Middleware/checkBlacklist");
const DB_CONFIG = require("../db");
const User = require("../Class/User");

router.post("/register",checkRegister,(req,res)=>{
  MongoClient.connect(DB_CONFIG.url, function(err, client) {
    if(err){
      res.send(DB_CONFIG.dbError);
    }else{
      const db = client.db(DB_CONFIG.dbname);
      const hashPassword = hash.sha256().update(req.body.password).digest("hex");
      const collection = db.collection("users");
      const user = new User(req.body.userName,hashPassword);
      collection.insertOne(user,(err)=>{
        if(err){
          res.send(DB_CONFIG.collectionError);
        }else{
          res.send({success:true,message:"注册成功"});
        }
      });
    }
  });
});

router.post("/login",checkBlacklist,(req,res)=>{
  MongoClient.connect(DB_CONFIG.url, function(err, client) {
    if(err){
      res.send(DB_CONFIG.dbError);
    }else{
      const db = client.db(DB_CONFIG.dbname);
      const collection = db.collection("users");
      const password = hash.sha256().update(req.body.password).digest("hex");
      let {userName} = req.body;
      collection.findOne({userName,password},(err,data)=>{
        if(err){
          res.send(DB_CONFIG.collectionError);
        }else{
          if(data){
            req.session.loginUser = userName;
            res.send({success:true,message:`${data.userName}登录成功`});
          }else{
            res.send({success:false,message:"用户名或密码错误,输入错误超过三次以上账户将会被冻结1小时"});
          } 
        }
      });
    }
  }); 
});

router.get("/logout",(req,res)=>{
  req.session.destroy((err)=>{
    res.send({success:true});
  });
});

router.get("/staticfile/:filename",(req,res)=>{
  const exist = fs.existsSync(`./Files/${req.params.filename}.md`);
  if(exist){
    const content = fs.readFileSync(`./Files/${req.params.filename}.md`,"utf8");
    res.send({content});
  }else{
    res.send({error:"无此文件"});
  }
});

// 获取当前登录用户信息
router.get("/currentUserInfo",checkPrivated,(req,res)=>{
  const {loginUser} = req.session;
  MongoClient.connect(DB_CONFIG.url,(err,client)=>{
    if(!err){
      const db = client.db(DB_CONFIG.dbname);
      const collection = db.collection("users");
      collection.findOne({userName:loginUser},(err,back)=>{
        if(err){
          res.send(DB_CONFIG.collectionError);
        }else{
          delete back.password;
          delete back._id;
          res.send({success:true,payload:back});
        }
      });
    }else{
      res.send(DB_CONFIG.dbError);
           
    }
  });  
});

// 添加新客户
router.post("/customer",(req,res)=>{
  const options = {
    url: `${BACKEND}/customer`,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(req.body)
  };
  request.post(options).on("error",(err)=>{
    res.statusCode = "500";
    res.statusMessage = err;
    res.end();
  }).pipe(res);
});

// 获取全部客户数据
router.get("/customer/:id",(req,res)=>{
  request(`${BACKEND}/customer/${req.params.id}`).on("error",(err)=>{
    res.statusCode = "500";
    res.statusMessage = err;
    res.end();
  }).pipe(res);
});

// 删除客户数据
router.delete("/customer/:id",(req,res)=>{
  request.del(`${BACKEND}/customer/${req.params.id}`).on("error",(err)=>{
    res.statusCode = "500";
    res.statusMessage = err;
    res.end();
  }).pipe(res);
});



module.exports = router;
