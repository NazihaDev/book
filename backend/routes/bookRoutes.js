const express = require("express");
const asynHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const Book = require("../models/Book");
const generateToken = require("../utils/generateToken");
const User = require("../models/User");
const bookRouter = express.Router();

//Create Book
bookRouter.post(
  "/",
  //asynHandler,

  async (req, res) => {
    const book = await Book.create(req.body);
    if (book) {
      res.status(200);
      res.json(book);
    } else {
      res.status(500);
      res.send("Book creating failed");
    }
  }
);

//Fetch Book

bookRouter.get(
  "/",
  //,authMiddleware,
  //asynHandler
  async (req, res) => {
    const book = await Book.find({});
    //.populate('createdBy').sort('createdAt');
    //Compare password
    if (book) {
      res.status(200);
      res.send(book);
    } else {
      res.status(500);
      res.send("There are no books");
    }
  }
);

//Update Book

bookRouter.put(
  "/:id",
  //authMiddleware,
  //asynchHandler
  async (req, res) => {
    const book = await Book.findById(req.params.id);
    if (book) {
      const updateBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      res.status(200);
      res.json(updateBook);
    } else {
      res.status(500);
      res.send("Update failed");
    }
  }
);

//Delete Book

bookRouter.delete(
  '/:id',
  //asynchHandler
  (async (req, res) => {
    try {
      const book = await Book.findByIdAndDelete(req.params.id);
      res.status(200);
      res.send(book);
    } catch (error) {
      res.status(500);
      throw new Error('Server Error');
    }
  })
);
module.exports = bookRouter;
