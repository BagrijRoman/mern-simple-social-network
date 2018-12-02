const express = require('express');
const passport = require('passport');

const Profile = require('../../models/Profile');
const validateProfileInput = require('../../validation/profile');
const validateExperienceInput = require('../../validation/experience');
const validateEducationInput = require('../../validation/education');

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


router.get(
  '/user/:user_id',
  (req, res) => {
    const { handle } = req.params;
    const errors = {};

    Profile.findOne({ user: req.params.user_id })
      .populate('user', ['name', 'avatar'])
      .then(profile => {
        if (!profile) {
          errors.noProfile = 'There is no profile for this user';
          res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => {
        errors.profile = 'There is no profile for this user';
        res.status(404).json(errors)
      });
  }
);

router.get(
  '/handle/:handle',
  (req, res) => {
    const errors = {};

    Profile.findOne({ handle: req.params.handle })
      .populate('user', ['name', 'avatar'])
      .then(profile => {
        if (!profile) {
          errors.noProfile = 'There is no profile for this user';
          res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => {
        errors.profile = 'There is no profile for this user';
        res.status(404).json(errors)
      });
  }
);

router.get(
  '/all',
  (req, res) => {
    const errors = {};

    Profile.find()
      .populate('user', ['name', 'avatar'])
      .then(profiles => {
        if (!profiles) {
          errors.noProfile = 'There are no profiles';
          return res.status(404).json(errors);
        }
        res.json(profiles);
      })
      .catch(err => {
        errors.profile = 'There is no profiles';
        res.status(404).json(errors)
      });
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

router.post(
  '/experience',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { user: { id }, body } = req;
    const {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    } = body;
    const { errors, isValid } = validateExperienceInput(body);

    if (!isValid) {
      return res.status(400).json(errors);
    }
    
    Profile.findOne({ user: id })
      .then(profile => {
        const newExp = {
          title,
          company,
          location,
          from,
          to,
          current,
          description,
        };

        profile.experience.unshift(newExp);
        profile
          .save()
          .then(profile => res.json(profile))
          .catch(err => res.json({ err }));
      });
  }
);

router.post(
  '/education',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { user: { id }, body } = req;
    const {
      school,
      degree,
      fieldOfStudy,
      from,
      to,
      current,
      description,
    } = body;
    const { errors, isValid } = validateEducationInput(body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    Profile.findOne({ user: id })
      .then(profile => {
        const newEdu = {
          school,
          degree,
          fieldOfStudy,
          from,
          to,
          current,
          description,
        };

        profile.education.unshift(newEdu);
        profile
          .save()
          .then(profile => res.json(profile))
          .catch(err => res.json({ err }));
      });
  }
);


module.exports = router;
