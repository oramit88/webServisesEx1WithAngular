var express=require('express');
var app=express();
app.use('/', express.static('./public')).listen(8080);
console.log("listening to 8080");