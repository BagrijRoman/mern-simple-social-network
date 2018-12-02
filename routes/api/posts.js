const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const Post = require('../../models/Post');
const validatePostInput = require('../../validation/post');

const router = express.Router();

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { text, name, avatar, id } = req.body;
    const { errors, isValid } = validatePostInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const newPost = new Post({
      text,
      name,
      avatar,
      user: id,
    });

    newPost.save().then(post => res.json(post));
  },
);


module.exports = router;
