var express = require("express");
var router = express.Router();
const request = require("request");
const {BACK_END} = process.env;

// 添加新客户
router.post("/customer",(req,res)=>{
  const options = {
    url: `${BACK_END}/customer`,
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

  
// 获取客户数据
router.get("/:id",(req,res)=>{
  console.log("获取客户列表");
  request(`${BACK_END}/partners/${req.params.id}?token=${req.cookies.jwt}&userId=${req.cookies.userId}`)
    .on("error",(err)=>{
      res.statusCode = "500";
      res.statusMessage = err;
      res.end();
    }).pipe(res);

});
  
// 删除客户数据
router.delete("/customer/:id",(req,res)=>{
  request.del(`${BACK_END}/customer/${req.params.id}`).on("error",(err)=>{
    res.statusCode = "500";
    res.statusMessage = err;
    res.end();
  }).pipe(res);
});

module.exports = router;