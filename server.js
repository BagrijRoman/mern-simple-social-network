const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const mongoURI = require('./config/keys').mongoURI;

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

const app = express();
const port = process.env.PORT || 5000;


mongoose
  .connect(mongoURI, { useNewUrlParser: true })
  .then(() => console.log('Mongodb connected'))
  .catch((err) => console.log(`Db connection error ${err}`));

app.get('/', (req, res) => res.send('Hello world'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);


app.listen(port, () => console.log(`Listening on port ${port}`));

