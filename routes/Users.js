const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const router = express.Router();

const User = require("../models/User");

//create new user
router.post("/signup", function(req, res, next) {
  const newUser = {
    name: req.body.name,
    role: req.body.role,
    email: req.body.email,
    phone: req.body.phone
  };

  //find a user with the same email
  User.findOne({
    email: req.body.email
  })
    .exec()
    .then(function(user) {
      //if a user exists
      if (user) {
        res.status(409).send({
          message: "Email already in use"
        });
      } //end if
      else {
        //if no user exists with the provided email
        bcrypt
          .hash(req.body.password, 10)
          .then(function(hash) {
            //add password to user object created above
            newUser.password = hash;

            //create user in mongo database
            User.create(newUser)
              .then(function(user) {
                res.status(201).send(user);
              })
              .catch(next); //error for creating user in mongo database
          })
          .catch(next); //error for bcrypt
      } //end else
    })
    .catch(next);
  //if a user exists, send the user email already exists
  //if no user exists with the email then continue to sign user in
});

//signs in an existing user
router.post("/signin", function(req, res, next) {
  User.findOne({
    email: req.body.email
  })
    .exec()
    .then(function(user) {
      //if no user is found return auth failed
      if (!user) {
        res.status(404).send({
          message: "No user exits with provided email"
        });
      } //end if
      else {
        //if a use exists with such email proceed to login
        console.log(user);
        bcrypt
          .compare(req.body.password, user.password)
          .then(function(result) {
            //if the password provided isn't correct
            if (!result) {
              res.status(401).send({
                message: "Authentication Failed"
              });
            } //end if
            else {
              //correct password
              //proceed to generate a token and sign user in
              const token = jwt.sign(
                {
                  email: user.email,
                  id: user._id,
                  name: user.name
                },
                process.env.JWT_SECRET
              );

              res.status(200).send({
                token: token
              });
            }
          })
          .catch(next); //error for bcrypt
      } //end else
    })
    .catch(next); //error for finding user in mongo database
});

//gets the profile of a user with id userId
router.get("/:email/profile", function(req, res, next) {
  User.findOne({
    email: req.params.email
  })
    .populate("role")
    .select("-password")
    .exec()
    .then(function(user) {
      if (!user) {
        //no user exists with such an email
        res.status(404).send({
          message: "User not found"
        });
      } //end if
      else {
        //if user exits
        res.status(200).send({
          user
        });
      }
    })
    .catch(next); //error for finding user in mongo database
});

//verify user on sign up
router.post("/:userId/verify", function(req, res, next) {});

//reset user password
router.put("/:userId/reset-password", async function(req, res, next) {
  try {
    const id = req.params.userId;
    const email = req.body.email;
    const newPassword = req.body.newPassword;

    const password = await bcrypt.hash(newPassword, 10);

    const updatedUser = await User.findOneAndUpdate(
      {
        _id: id,
        email: email
      },
      {
        password: password
      }
    ).exec();

    if (!updatedUser) {
      res.status(404).json({
        error: "User does not exist"
      });
    }

    res.status(201).json({
      user: updatedUser
    });
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});

//change user password
router.put("/:userId/change-password", async function(req, res, next) {
  try {
    const id = req.params.userId;
    const email = req.body.email;
    const newPasswordFromUser = req.body.newPassword;

    const userFromDb = await User.findOne({
      email: email,
      _id: id
    }).exec();

    if (!userFromDb) {
      res.status(404).json({
        error: "User not found"
      });
    }

    if (await bcrypt.compare(req.body.password, userFromDb.password)) {
      const newPassword = await bcrypt.hash(newPasswordFromUser, 10);
      const updatedUser = await User.findByIdAndUpdate(
        id,
        {
          password: newPassword
        },
        {
          new: true
        }
      ).exec();
      res.status(200).json({
        user: updatedUser
      });
    } else {
      res.status(401).json({
        error: "Incorrect Password"
      });
    }
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});

module.exports = router;
