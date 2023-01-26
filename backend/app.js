require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require("body-parser");

const { mongoose } = require("./db/mongoose");
const { Error, Subject, CodeExample } = require("./db/models");

const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());

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
    createdAt: new Date(),
    description: req.body.description
  });

  subject.save().then((result) => {
    res.status(201).json({ result });
  }).catch((error) => {
    res.send(error);
  })
});

app.listen(PORT, () => {
  console.log(`Sever is listening on port ${PORT}`);
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