var express = require("express");
var router = express.Router();
const request = require("request");
const multer = require("multer");

const {BACK_END} = process.env;

// 添加新产品
router.post("/",(req,res)=>{
  let {jwt,userId} = req.cookies;
  const options = {
    url: `${BACK_END}/product/?token=${jwt}&userId=${userId}`,
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

  
// 获取产品信息
router.get("/:id",(req,res)=>{
  request(`${BACK_END}/product/${req.params.id}?token=${req.cookies.jwt}&userId=${req.cookies.userId}`)
    .on("error",(err)=>{
      res.statusCode = "500";
      res.statusMessage = err;
      res.end();
    }).pipe(res);
});
  
// 删除产品
router.delete("/:id",(req,res)=>{
  request.del(`${BACK_END}/product/${req.params.id}?token=${req.cookies.jwt}&userId=${req.cookies.userId}`)
    .on("error",(err)=>{
      res.statusCode = "500";
      res.statusMessage = err;
      res.end();
    }).pipe(res);
});

// 上传商品图片
router.post("/upload",multer().any(),(req,res)=>{
  const formData = {
    file: {
      value: req.files[0].buffer,
      options: {
        filename: req.files[0].originalname,
        contentType: req.files[0].mimetype
      }
    }
  };
  const options = {
    url: `${BACK_END}/product/upload?token=${req.cookies.jwt}&userId=${req.cookies.userId}`,
    method: "POST",
    timeout: 10000,
    formData,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  };
  
  request.post(options).on("error",(err)=>{
    res.statusCode = "500";
    res.statusMessage = err;
    res.end();
  }).pipe(res);
});
module.exports = router;