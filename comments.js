// Create web server
var express = require('express');
var fs = require('fs');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
var cors = require('cors');
app.use(cors());
app.use(express.static('public'));
var port = 3000;
app.listen(port, function () {
  console.log('Server is running on port ' + port);
});
// Create route for comments
app.get('/comments', function (req, res) {
  fs.readFile('comments.json', 'utf8', function (err, data) {
    if (err) {
      console.log(err);
    }
    res.send(data);
  });
});
// Create route to post comments
app.post('/comments', function (req, res) {
  fs.readFile('comments.json', 'utf8', function (err, data) {
    if (err) {
      console.log(err);
    }
    var comments = JSON.parse(data);
    comments.push(req.body);
    fs.writeFile('comments.json', JSON.stringify(comments), function (err) {
      if (err) {
        console.log(err);
      }
      res.send('Comment added');
    });
  });
});
// Create route to delete comments
app.delete('/comments/:id', function (req, res) {
  fs.readFile('comments.json', 'utf8', function (err, data) {
    if (err) {
      console.log(err);
    }
    var comments = JSON.parse(data);
    var comment = comments.find(function (comment) {
      return comment.id === req.params.id;
    });
    if (comment) {
      comments.splice(comments.indexOf(comment), 1);
      fs.writeFile('comments.json', JSON.stringify(comments), function (err) {
        if (err) {
          console.log(err);
        }
        res.send('Comment deleted');
      });
    } else {
      res.send('Comment not found');
    }
  });
});
// Create route to edit comments
app.put('/comments/:id', function (req, res) {
  fs.readFile('comments.json', 'utf8', function (err, data) {
    if (err) {
      console.log(err);
    }
    var comments = JSON.parse(data);
    var comment = comments.find(function (comment) {
      return comment.id === req.params.id;
    });
    if (comment) {
      comment.message = req.body.message;
      fs.writeFile('comments.json', JSON.stringify(comments), function (err) {
        if (err) {
          console.log(err);
        }
        res.send('Comment edited');
      }
        );
    }
    else {
      res.send('Comment not found');
    }
    });
}
);