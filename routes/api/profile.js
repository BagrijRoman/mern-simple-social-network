const express = require('express');
const passport = require('passport');

const Profile = require('../../models/Profile');
const validateProfileInput = require('../../validation/profile');

const router = express.Router();

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { id } = req.user;
    const errors = {};

    Profile.findOne({ user: id })
      .populate('user', ['name', 'avatar'])
      .then(profile => {
        if (!profile) {
          errors.noProfile = 'There is no profile for user';
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { user: { id }, body } = req;
    const {
      handle,
      company,
      website,
      location,
      bio,
      status,
      githubUserName,
      skills,
      youtube,
      twitter,
      facebook,
      linkedin,
      instagram,
    } = body;
    const { errors, isValid } = validateProfileInput(body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const profileFields = { social: {} };
    profileFields.user = id;
    if (handle) { profileFields.handle = handle; }
    if (company) { profileFields.company = company; }
    if (website) { profileFields.website = website; }
    if (location) { profileFields.location = location; }
    if (bio) { profileFields.bio = bio; }
    if (status) { profileFields.status = status; }
    if (githubUserName) { profileFields.githubUserName = githubUserName; }
    if (typeof skills !== 'undefined') { profileFields.skills = skills.split(','); }
    if (youtube) { profileFields.social.youtube = youtube; }
    if (twitter) { profileFields.social.twitter = twitter; }
    if (facebook) { profileFields.social.facebook = facebook; }
    if (linkedin) { profileFields.social.linkedin = linkedin; }
    if (instagram) { profileFields.social.instagram = instagram; }

    Profile.findOne({ user: id })
      .then(profile => {
        if (profile) {
          Profile.findOneAndUpdate(
            { user: id },
            { $set: profileFields },
            { new: true }
          ).then(profile => res.json(profile));
        } else {
          Profile.findOne({ handle: profileFields.handle })
            .then(profile => {
              if (profile) {
                errors.handle = 'That handle already exists';
                res.status(400).json(errors);
              }
              new Profile(profileFields).save().then(profile => res.json(profile));
            });
        }
      });
  },
);


module.exports = router;
