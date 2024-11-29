const express = require("express");
const app = express();

const port = 8080;
const path = require("path");

const methodOverride = require("method-override");
app.use(methodOverride('_method'));

const {v4 : uuidv4} = require("uuid");
uuidv4();

app.use(express.urlencoded({extended :true}));

app.set("view engine" , "ejs");
app.set("views" , path.join(__dirname , "views"));

app.use(express.static(path.join(__dirname , "public")));

let posts = [
    {   id : uuidv4(),
        username : "Anirudh Aggarwal",
        content : "Work-life balance is essential for maintaining mental and physical well-being. Balancing professional responsibilities with personal interests fosters productivity, creativity, and happiness. Prioritize time management, set boundaries, and embrace relaxation to thrive in both work and life"
    },
    {   
        id : uuidv4(),
        username : "Pranshu Bansal",
        content : "Food is more than sustenance; it’s a celebration of culture, joy, and connection. It nourishes the body, delights the senses, and brings people together. From simple meals to gourmet feasts, food truly enriches every moment of life."
    },
    {
        id : uuidv4(),
        username : "Akshat Kumar",
        content : "Data Structures and Algorithms (DSA) in C provide a solid foundation for problem-solving and efficient programming. Mastering arrays, linked lists, stacks, and recursion helps tackle complex challenges. C’s simplicity and speed make it ideal for DSA exploration."
    }
]; 

app.listen(port , ()=> {
    console.log("listening on port 8080");
})

app.get("/posts" , (req , res) => {
    res.render("index.ejs" , { posts });
})

app.get("/posts/new" , (req , res) => {
    res.render("new.ejs");
})

app.post("/posts" , (req , res) => {
    let {username , content} = req.body;
    let id = uuidv4();
    posts.push({id ,username , content});
    res.redirect("/posts");
})

app.get("/posts/:id" , (req , res) => {
    let {id} = req.params;
    let post = posts.find((p) => id === p.id)
    res.render("show.ejs" , {post});
})

app.patch("/posts/:id" , (req , res) => {
    let {id} = req.params;
    let newcontent = req.body.content;
    let post = posts.find((p) => id === p.id);
    post.content = newcontent;
    res.redirect("/posts");
})

app.get("/posts/:id/edit" , (req , res) => {
    let {id} = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("edit.ejs" , {post});
})

app.delete("/posts/:id" , (req , res) => {
    let {id} = req.params;
    posts = posts.filter((p) => id !== p.id);
    res.redirect("/posts");
})