var express = require("express");
var router = express.Router();
const request = require("request");

router.get("/:id",(req,res)=>{
  request(`${BACKEND}/customer/${req.params.id}`).on("error",(err)=>{
    res.statusCode = "500";
    res.statusMessage = err;
    res.end();
  }).pipe(res);
});

module.exports = router;
