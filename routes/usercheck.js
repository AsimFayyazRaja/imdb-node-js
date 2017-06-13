console.log("user check");

var express = require('express');
var router = express.Router();



router.get("/usercheck", function (req, res, next) {
    //var yourLocalVar = req.session.localVar;
    res.render('loggedin');
});