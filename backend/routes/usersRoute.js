const express = require("express");
const User = require("../models/User");
const generateToken = require("../utils/generateToken");
const asynHandler = require("express-async-handler");
const authMiddleware = require("../middlewares/authMiddleware");

//const bcrypt = require('bcryptjs');
//const jwt = require('jsonwebtoken');
//const{validation,registerValidator,loginValidator} = require('../middlewares/errorMiddlewareHandler ');
const usersRoute = express.Router();

//register
usersRoute.post(
  "/register",
  //asynHandler
  async (req, res) => {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email: email });
    if (userExists) {
      res.send("user Exist");
      //throw new Error('user Exist');
    }
    const userCreated = await User.create({ email, name, password });
    res.json({
      _id: userCreated.id,
      name: userCreated.name,
      password: userCreated.password,
      email: userCreated.email,
      //partie token
      //const payload = {id : userCreated._id }
      //var token = jwt.sign({payload,process.env.privateKey})
      token: generateToken(userCreated._id),
    });
  }
);
//login
usersRoute.post(
  "/login",
  //asynHandler
  async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await user.isPasswordMatch(password))) {
      //set status code
      res.status(200);
      res.json({
        _id: user.id,
        name: user.name,
        password: user.password,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(401);
      res.send("Invalid credentials");
    }
  }
);

//fetch users

usersRoute.get("/", authMiddleware, (req, res) => {
  console.log(req.headers);
  /*res.send(req.user);*/
  res.send("fetch user");
}); 


//update user video

/*usersRoute.put(
  '/update',
  authMiddleware,
  //asynchHandler
  async (req, res) => {
    const user = await User.findById(req.user.id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      //This will encrypt automatically in our model
      if (req.body.password) {
        user.password = req.body.password || user.password;
      }
      const updateUser = await user.save();
      res.json({
        _id: updateUser._id,
        name: updateUser.name,
        password: updateUser.password,
        email: updateUser.email,
        token: generateToken(updateUser._id),
      });
    }else {
      res.status(401);
      res.send('User Not found');
    }
  });*/


//put
usersRoute.put(
  '/update/:id',
  authMiddleware,
  //asynchHandler
  async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      const updateUser = await Book.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      res.status(200);
      res.json(updateUser);
    } else {
      res.status(500);
      res.send("Update failed");
    }
  }
);
//Delete User
usersRoute.delete("/:id",
//authMiddleware,
  //asynchHandler
  async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      res.status(200);
      res.send(user);
    } catch (error) {
      res.status(500);
      res.send('Server Error');
    }
  });

module.exports = usersRoute;