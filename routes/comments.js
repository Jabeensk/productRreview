// routes/comments.js

const express = require("express");
const router = express.Router();

const comments = require("../data/comments");
const error = require("../utilities/error");

router
  .route("/")
  .get((req, res) => {
    res.json({ comments });
  })
  .post((req, res, next) => {
 
  });

router
  .route("/:id")
  .get((req, res, next) => {
    
  })
  .patch((req, res, next) => {
    
  })
  .delete((req, res, next) => {
  
  });


module.exports = router;
