const express = require("express");
const router = express.Router();
const request = require("request");
const hash = require("hash.js");
const multer = require("multer");
var j = request.jar();
var requestapi = request.defaults({jar:j});
const {BACK_END} = process.env;
var requestapi = request.defaults({jar: true});
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

  requestapi.post(options).on("error",(err)=>{
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
    body: JSON.stringify(user),
    jar:true
  };
  requestapi.post(options).on("error",(err)=>{
    res.statusCode = "500";
    res.statusMessage = err;
    res.end();
  }).pipe(res);
});

router.get("/logout",(req,res)=>{
  requestapi(`${BACK_END}/authentication/logout`).on("error",(err)=>{
    res.statusCode = "500";
    res.statusMessage = err;
    res.end();
  }).pipe(res);
});

router.post("/uploadUserHeader",multer().any(),(req,res)=>{
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
    url: `${BACK_END}/authentication/uploadUserHeader`,
    method: "POST",
    timeout: 10000,
    formData,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  };

  requestapi.post(options).on("error",(err)=>{
    res.statusCode = "500";
    res.statusMessage = err;
    res.end();
  }).pipe(res);
});




module.exports = router;
