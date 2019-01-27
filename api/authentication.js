var express = require("express");
var router = express.Router();
const request = require("request");
var hash = require("hash.js");

const {BACK_END} = process.env;

router.post("/registry",(req,res)=>{
  let user = {};
  user.userName = req.body.userName;
  user.password = hash.sha256().update(req.body.password).digest("hex");
  const options = {
    url: `${BACK_END}/authentication/registry`,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user)
  };

  request.post(options).on("error",(err)=>{
    res.statusCode = "500";
    res.statusMessage = err;
    res.end();
  }).pipe(res);

});

router.post("/login",(req,res)=>{
  let user = {};
  user.userName = req.body.userName;
  user.password = hash.sha256().update(req.body.password).digest("hex");
  const options = {
    url: `${BACK_END}/authentication/login`,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user)
  };
  request.post(options).on("error",(err)=>{
    res.statusCode = "500";
    res.statusMessage = err;
    res.end();
  }).pipe(res);
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
