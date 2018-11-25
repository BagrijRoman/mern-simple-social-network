const express = require('express');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const jwtSecretKey = require('../../config/keys').jwtSecretKey;

const router = express.Router();

router.post('/register', (req, res) => {
  const { email, name, password } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (user) {
        return res.status(400).json({ email: 'Email already exists' });
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
  const { email, password } = req.body;


  User.findOne({ email })
    .then(user => {
      if (!user) {
        return res.status(404).json({ email: 'User not found '})
      }

      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if (isMatch) {
            const { _id: id, name, avatar } = user;
            const payload = { id, name, avatar };
            jwt.sign(
              payload,
              jwtSecretKey,
              { expiresIn: 3600 },
              (err, tocken) => {
                res.json({
                  success: true,
                  token: `Bearer ${tocken}`,
                });
              },
            );
          } else {
            return res.status(400).json({ password: 'Password incorrect' });
          }
        });
    });
});

module.exports = router;
