var express = require("express");
var app =express();
var mongoose =require("mongoose");
var bodyparser=require("body-parser");
var methodOverride=require("method-override");
var expressSanitizer=require("express-sanitizer");


app.set("view engine","ejs");
app.use(express.static("public"));
mongoose.connect("mongodb://localhost/blogapp");
app.use(bodyparser.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.use(expressSanitizer());


var blogSchema =new mongoose.Schema({
  title :"string",
  image:"string",
  body:"string",
  created :{type:Date,default:Date.now}
});
var blog =mongoose.model("blog",blogSchema);

/*blog.create({
title:"cute dog ",
image:"data:image/jpeg;base64,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",
body:"this is an husky .they are adorable .both bitches and girls like them",
},function(err,blogerr){
    if (err)
    {console.log(err);}
    else {
        console.log("done");
    }
});
*/
app.get("/",function(req,res)
{
res.redirect("/blogs");
});

app.get("/blogs/new",function(req,res){
res.render("new");
});

//create route 
app.post("/blogs",function(req,res){
    req.body.blog.body =req.sanitize(req.body.blog.body);
blog.create(req.body.blog,function(err,newblog){
if(err)
{res.render("new");
}
else{
    res.redirect("/blogs");
}
});
});

//index route 
app.get("/blogs",function(req,res)
{
blog.find({},function(err,blogs)
{
if(err)
{console.log(err);}
else{
    res.render("index",{blogs:blogs});
}
});
});

//show route
app.get("/blogs/:id",function(req,res){
  blog.findById(req.params.id,function(err,foundblog)
{
if(err){
    res.redirect("/blogs");
}
else{
    res.render("show",{blog:foundblog});
}
});
});

//edit route
app.get("/blogs/:id/edit",function(req,res){
blog.findById(req.params.id,function(err,foundblog){
if(err)
{
    res.redirect("/blogs");
}
else{
    res.render("edit",{blog:foundblog});
}
});
});

// update route 
app.put("/blogs/:id",function(req,res){
    req.body.blog.body =req.sanitize(req.body.blog.body);
blog.findByIdAndUpdate(req.params.id,req.body.blog,function(err,updatedblog){
if(err)
{res.redirect('/blogs');
}
else{
    res.redirect("/blogs/"+req.params.id);
}

});
});

//delete route 
app.delete("/blogs/:id",function(req,res){
blog.findByIdAndRemove(req.params.id,function(err)
{
if(err)
{res.redirect("/blogs");
}
else{
    res.redirect("/blogs");
}
});
});

app.get("*",function(req,res){
res.send("fuck off ,this is not the right page");
});

app.listen(8080,function(req,res)
{
console.log("server started!!");
});