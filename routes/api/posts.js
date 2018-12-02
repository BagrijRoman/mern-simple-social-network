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

router.get('/', (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({ noPostsFound: 'No posts found' }));
});

router.get('/:post_id', (req, res) => {
  const { post_id } = req.params;

  Post.findById(post_id)
    .then(post => res.json(post))
    .catch(err => {
      res.status(404).json({ noPostFound: `No post found with id ${post_id}` })
    });
});


module.exports = router;
