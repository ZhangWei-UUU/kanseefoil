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

module.exports = router;
