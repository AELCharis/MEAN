const express = require("express");  //apothikevo to express package sto variable express
const bodyParser = require("body-parser");
const mongoose = require("mongoose");


const Post = require('./models/post'); // zito to file me ta Post pou periexi to  Schema

const app = express();  //apothikevo tin fucntion express() se ena variable app


mongoose.connect("mongodb+srv://Charis:FM1k6OPub2WFq1FQ@cluster0-4vanq.mongodb.net/node-angular?retryWrites=true&w=majority", { useNewUrlParser: true }) //connect to the db
  .then(() => {   //ean gini connect kanonika to db
    console.log("Database Connected !!!");
  })
  .catch(() => {
    console.log("FAIL Database to Connect !!!");
  });


app.use(bodyParser.json());  //kalo to bodyparser
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.post("/api/posts", (req, res, next) => { //perni 3 to request response k to next, To next xriazete gia sinexisi pio kato
  const post = new Post({  //to new Post erxete apo ti grami 4 pou kano import
      title: req.body.title,
      content: req.body.content
  });
  post.save().then(createdPost => {  // i .save methodos parexete apo to mongoose package
    // (aftomata tha dimiourgisi to katalilio query gia na kani insert ta data sto databse )
    res.status(201).json({
      message: 'Post added successfully',
      postId: createdPost._id
    });
  });
});

app.get("/api/posts", (req, res, next) => {   //Fetching data from the server

  Post.find()     //.find ine function tis mongoose k ferni ola ta Post se afti ti periptosi
    .then(documents => {    //k meta pare ola ta documents
      res.status(200).json({
        message: "Posts fetched successfully!",
        posts: documents
      });
    });
});

app.delete("/api/posts/:id", (req, res, next)  => {
        Post.deleteOne({ _id: req.params.id }).then(result => {
        console.log(result);
        res.status(200).json({ message: "Post deleted!" });
  });
});

module.exports = app; //kano export olo to pio pano application
