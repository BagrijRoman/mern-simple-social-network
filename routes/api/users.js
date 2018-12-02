const express = require('express');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const User = require('../../models/User');
const secretOrKey = require('../../config/keys').secretOrKey;
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

const router = express.Router();

router.post('/register', (req, res) => {
  const { body } = req;
  const { errors, isValid } = validateRegisterInput(body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const { email, name, password } = body;

  User.findOne({ email })
    .then((user) => {
      if (user) {
        errors.email = 'Email already exists';
        return res.status(400).json(errors);
      } else {
        const avatar = gravatar.url(email, {
          s: '200',
          r: 'pg',
          d: 'mm',
        });

        const newUser = new User({
          name,
          email,
          avatar,
          password,
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) {
              throw err;
            } else {
              newUser.password = hash;
              newUser
                .save()
                .then(user => res.json(user))
                .catch(err => console.log('err ' + err));
            }
          });
        });
      }
    });
});

router.post('/login', (req, res) => {
  const { body } = req;
  const { errors, isValid } = validateLoginInput(body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const { email, password } = body;

  User.findOne({ email })
    .then(user => {
      if (!user) {
        errors.email = 'User not found';
        return res.status(404).json(errors)
      }

      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if (isMatch) {
            const { _id: id, name, avatar } = user;
            const payload = { id, name, avatar };
            jwt.sign(
              payload,
              secretOrKey,
              { expiresIn: 3600 },
              (err, tocken) => {
                res.json({
                  success: true,
                  token: `Bearer ${tocken}`,
                });
              },
            );
          } else {
            errors.password = 'Password incorrect';
            return res.status(400).json(errors);
          }
        });
    });
});

router.get(
  '/current',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { id, name, email } = req.user;

    res.json({ id, name, email });
  });

module.exports = router;
