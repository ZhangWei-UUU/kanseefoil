var express = require("express");
var router = express.Router();
const request = require("request");
const {BACK_END} = process.env;
router.get("/:id",(req,res)=>{
  request(`${BACK_END}/customer/${req.params.id}`).on("error",(err)=>{
    res.statusCode = "500";
    res.statusMessage = err;
    res.end();
  }).pipe(res);
});

module.exports = router;
