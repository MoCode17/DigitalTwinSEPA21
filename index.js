const express = require('express');
const app = express();
const path = require('path');

app.listen(process.env.PORT || 3000);

app.use(express.static('public'))

//index.js
app.get('/', (req, res) => {
    res.sendFile('index.html', {root: path.join(__dirname, 'public')});
  })

app.get("/index", function (req, res) {
    res.sendFile('index.html', {root: path.join(__dirname, 'public')});
});

app.get("/history", function (req, res) {
  res.sendFile('history.html', {root: path.join(__dirname, 'public')});
});

app.get("/register", function (req, res) {
  res.sendFile('register.html', {root: path.join(__dirname, 'public')});
});

// index.js
module.exports = app