const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
var multer  =   require('multer');  
var fs = require('fs');
const Comment_post = require("../models/comment_post");
router.get('/',function(req, res, next){
  Comment_post.find({}, function (err, comment_pos_list) {
    res.send(comment_pos_list);
});
});
router.post('/upload', function(req, res, next) {
    const file = req.files.postImage;
    const id = new mongoose.Types.ObjectId();
    const local ='uploads/'+ id +'-'+file.name;
    console.log("----------------id---------------------",id); 
    console.log("----------------path---------------------",local); 
    console.log("-------------------------------userid-----------------",req.body.userId);
      const comment_post = new Comment_post({
        _id: id,
        postTitle: req.body.postTitle,
        postImage: local,
        postDate: new Date(),
        user_id: req.body.userId,
        user_name: req.body.user_name,
        user_profile: local,
        postSkills:req.body.postSkills,
        postDescription: req.body.postDescription,
        postJobType: req.body.postJobType

      });
      console.log("-------------------------------payload-----------------",comment_post);
     file.mv( 'uploads/'+ file.name,function(err, result){
       if(err)throw err
      fs.rename( 'uploads/'+ file.name ,local, function (err) {
        if (err) throw err;
      });
     });
     comment_post.save()
     .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Created product successfully",
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
    
  });
module.exports = router;
