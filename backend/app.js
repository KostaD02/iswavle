require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require("body-parser");

const { mongoose } = require("./db/mongoose");
const { Error, Subject, CodeExample } = require("./db/models");

const PORT = process.env.PORT || 3000;
const corsOption = {
  origin: [
    'http://localhost:4200', //! remove it later
    'http://iswavle.com',
    'https://iswavle.com',
    'https://iswavle.web.app',
    'https://iswavle.firebaseapp.com'
  ]
}

const corsMiddleware = (req, res, next) => {
  const origin = req.headers.origin;
  if (corsOption.origin.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  }
  next();
};

app.use(bodyParser.json());
app.use(corsMiddleware);

app.get("/", (req, res) => {
  res.send('Welcome to education BE');
});

app.get('/code/:id', (req, res) => {
  CodeExample.findOne({
    _id: req.params.id
  }).then((result) => {
    res.send(result);
  }).catch(() => {
    res.status(404);
  });
});

app.post('/code', (req, res) => {
  const codeExample = new CodeExample({
    code: req.body.code,
    description: req.body.description
  });

  codeExample.save().then((result) => {
    res.send({ result });
  }).catch((err) => {
    res.status(400).json(err);
  });
});

app.get('/subjects', (req, res) => {
  Subject.find({}).then((subject) => {
    res.send(subject);
  }).catch(() => {
    res.sendStatus(404);
  });
});

app.post('/subject', (req, res) => {
  const subject = new Subject({
    index: req.body.index,
    name: req.body.name,
    isSelectable: req.body.isSelectable,
    subject: req.body.subject,
    route: req.body.route,
    prefix: req.body.prefix,
    translate: req.body.translate,
    data: req.body.data,
    tags: req.body.tags,
    createdAt: new Date(),
    description: req.body.description
  });

  subject.save().then((result) => {
    res.status(201).json({ result });
  }).catch((error) => {
    res.send(error);
  })
});

app.patch("/subject/:id", (req, res) => {
  Subject.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: req.body,
    }
  ).then(() => {
    res.sendStatus(200);
  }).catch(() => {
    res.sendStatus(404);
  })
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

process.on("uncaughtException", function (err) {
  logError(err);
});

/*
 * Functions
 */

function logError(err) {
  let error_description = err;
  let today = new Date();
  let date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  let time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  let error_date = date + " " + time;
  let newError = new Error({
    error_description,
    error_date,
  });
  newError.save();
  console.log("========================================");
  console.log("Some error appeared , while using server");
  console.log(`Error date : ${error_date}`);
  console.log(`Check error log`);
  console.log("========================================");
}