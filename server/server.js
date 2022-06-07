//Dependency Declaration
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const session = require('express-session');
const MongoStore = require('connect-mongo')(session)
const Posts = require("./database/models/Post.js");
const Users = require("./database/models/Users.js");
const passport = require("./passport");
const dbConnection = require("./database");
const auth = require('./routes/auth');
const messages = require("./routes/messages");
const multer = require("multer");
const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");
const sanitize = require('mongo-sanitize');
//Port declaration
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(
  session({
    secret: "Gator Exchange is the best!",
    store: new MongoStore({ mongooseConnection: dbConnection }),
    resave: false,
    saveUninitialized: false
  })
);
//Initialize passport

app.use(passport.initialize());
app.use(passport.session());

//image upload middleware
cloudinary.config( {
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = cloudinaryStorage( {
  cloudinary: cloudinary,
  folder: "demo",
  allowedFormats: ["jpg", "png"],
  transformation: [{width:500, height:500, crop:"limit"}]
});

const parser = multer({storage:storage});


//TODO:Implement REST API routes
//TODO:Create, Read, Update, Index, Destroy, New

app.post("/api/post", parser.single("image"), (req,res) => {
  const postData = {};
  postData.image = req.file.url;
  postData.category = req.body.category;
  postData.description = req.body.description;
  postData.title = req.body.title;
  postData.price = req.body.price;
  postData.username = req.user.username;
  console.log(postData);
  Posts.create(postData)
    .then(newImage => res.json(newImage))
    .catch(err => console.log(err)); 
    res.redirect("/");

})

app.get("/api/user", (req,res) => {
  Users.find(function(err, result) {
    if(err) throw err;
    res.json(result);
  })
});

app.get("/api/:item", (req, res) => {
  //Shows the item
  let item = sanitize(req.params.item);
  Posts.find({ _id: item }, function(err, result) {
    if (err) throw err;
    res.json(result);
  });
});
//Returns all items
app.get("/allItems", (req, res) => {
  Posts.find(function(err, result) {
    if (err) throw err;
    res.json(result);
  });
});
//Search for items
app.post("/allItems", (req, res) => {
  let category = sanitize(req.body.value);
  let query = sanitize(req.body.query);
  if (category !== "All") {
    Posts.find(
      {
        title: { $regex: ".*" + query + ".*", $options: "i" },
        category: category
      },
      function(err, result) {
        if (err) throw err;
        res.json(result);
      }
    );
  } else {
    Posts.find(
      { title: { $regex: ".*" + query + ".*", $options: "i" } },
      function(err, result) {
        if (err) throw err;
        res.json(result);
      }
    );
  }
});

//Get user routes
app.use('/auth', auth);
//Messages
app.use('/messages',messages);

//Start server
app.listen(PORT, process.env.IP, function() {
  console.log("Server is listening");
});
