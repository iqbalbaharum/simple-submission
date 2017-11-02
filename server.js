var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    ejs = require('ejs'),
    auth = require('http-auth');

var Submission = require('./app/model/submission');

var port = 3000;

var app = express();

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/challenge#1', {
  useMongoClient: true
});

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(__dirname + "/public"));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('submission');
});

app.post('/', (req, res) => {
  var newSubmission = new Submission(req.body);
  newSubmission.save(function(err, submission) {
    if (err)
      res.send(err);

    res.render('success');
  });
});

// authentication
var basic = auth.basic({
      realm: "Authentication Area"
  }, function (username, password, callback) {
      callback(username === "challenge" && password === "123jaya");
  }
);

app.get('/admin', auth.connect(basic), (req, res) => {
  Submission.find({}, function(err, submissions) {
    if(err)
      res.send(err);

    //console.log(attendees);

    res.render('admin', {
      submissions: submissions,
      count: submissions.length
    });
  });
});

app.listen(port);
