var express = require("express");
var router = express.Router();
const MongoClient = require("mongodb").MongoClient;
const request = require("request");
const DB_CONFIG = require("../db");

router.get("/:id",(req,res)=>{
  request(`${BACKEND}/customer/${req.params.id}`).on("error",(err)=>{
    res.statusCode = "500";
    res.statusMessage = err;
    res.end();
  }).pipe(res);
});

module.exports = router;
