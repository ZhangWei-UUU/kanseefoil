var express = require("express");
var router = express.Router();
const request = require("request");
const {BACK_END} = process.env;

router.get("/:id",(req,res)=>{
  let {id} = req.params;
  let {jwt,userId} = req.cookies;
  request(`${BACK_END}/order/${id}?token=${jwt}&userId=${userId}`).on("error",(err)=>{
    res.statusCode = "500";
    res.statusMessage = err;
    res.end();
  }).pipe(res);
});

router.post("/",(req,res)=>{
  var value = req.body;
  let {jwt,userId} = req.cookies;
  value.creatorId = userId;
  let sum = 0;
  value.date = new Date().getTime();
  value.payment = false;
  value.list.forEach(obj=>{
    sum += obj.count * obj.price;
  });
  value.sum = sum;

  const options = {
    url: `${BACK_END}/order?token=${jwt}&userId=${userId}`,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(value)
  };
  request.post(options).on("error",(err)=>{
    res.statusCode = "500";
    res.statusMessage = err;
    res.end();
  }).pipe(res);
});

router.post("/modify",(req,res)=>{
  let {jwt,userId} = req.cookies;
  const options = {
    url: `${BACK_END}/order/modify?token=${jwt}&userId=${userId}`,
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

router.delete("/:id",(req,res)=>{
  request.del(`${BACK_END}/order/${req.params.id}?token=${req.cookies.jwt}&userId=${req.cookies.userId}`).on("error",(err)=>{
    res.statusCode = "500";
    res.statusMessage = err;
    res.end();
  }).pipe(res);
});

module.exports = router;
