const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const Post = require('../../models/Post');
const Profile = require('../../models/Profile');
const validatePostInput = require('../../validation/post');

const router = express.Router();

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { body, user: { id } } = req;
    const { text, name, avatar } = body;
    const { errors, isValid } = validatePostInput(body);

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

router.delete(
  '/:post_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const {
      user: { id: userId },
      params: { post_id: postId }
    } = req;

    Profile.findOne({ user: userId })
      .then(profile => {
        Post.findById(postId)
          .then(post => {
            if (post.user.toString() !== userId) {
              return res.status(401).json({ notAuthorized: 'User not authorized' })
            }

            post.remove()
              .then(() => res.json({ success: true }))
              .catch(err => res.status(404).json({ post: 'Remove post error', err }));
          })
          .catch(err => res.status(404).json({ postNotFound: 'No post found' }));
      })
      .catch(err => res.status(404).json({ profileNotFound: 'No profile found' }));
  }
);

router.post(
  '/like/:post_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const {
      user: { id: userId },
      params: { post_id: postId }
    } = req;

    Profile.findOne({ user: userId })
      .then(profile => {
        Post.findById(postId)
          .then(post => {
            if (post.likes.filter(({ user }) => user.toString() === userId).length) {
              return res.status(400).json({ alreadyLiked: 'User already liked this post' });
            }

            post.likes.unshift({ user: userId });
            post.save().then(post => res.json(post));
          })
          .catch(err => res.status(404).json({ postNotFound: 'No post found' }));
      })
      .catch(err => res.status(404).json({ profileNotFound: 'No profile found' }));
  }
);

router.post(
  '/unlike/:post_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const {
      user: { id: userId },
      params: { post_id: postId }
    } = req;

    Profile.findOne({ user: userId })
      .then(profile => {
        Post.findById(postId)
          .then(post => {
            if (!post.likes.filter(({ user }) => user.toString() === userId).length) {
              return res.status(400).json({ notLiked: 'You have not yet like this post' });
            }

            const removeIndex = post.likes
              .map(({ user }) => user.toString())
              .indexOf(userId);
            post.likes.splice(removeIndex, 1);
            post.save().then(post => res.json(post));
          })
          .catch(err => res.status(404).json({ postNotFound: 'No post found' }));
      })
      .catch(err => res.status(404).json({ profileNotFound: 'No profile found' }));
  }
);

module.exports = router;
