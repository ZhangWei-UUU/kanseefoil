var express = require("express");
var router = express.Router();
const request = require("request");
const {BACK_END} = process.env;

// 添加新客户
router.post("/",(req,res)=>{
  const options = {
    url: `${BACK_END}/partners?token=${req.cookies.jwt}&userId=${req.cookies.userId}`,
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
  request(`${BACK_END}/partners/${req.params.id}?token=${req.cookies.jwt}&userId=${req.cookies.userId}`)
    .on("error",(err)=>{
      res.statusCode = "500";
      res.statusMessage = err;
      res.end();
    }).pipe(res);

});
  
// 删除客户数据
router.delete("/:id",(req,res)=>{
  request.del(`${BACK_END}/partners/${req.params.id}?token=${req.cookies.jwt}&userId=${req.cookies.userId}`).on("error",(err)=>{
    res.statusCode = "500";
    res.statusMessage = err;
    res.end();
  }).pipe(res);
});

module.exports = router;