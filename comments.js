const express = require('express');
const fs = require('fs');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.json());
app.use(cors());
app.use(express.static(__dirname)); // Serwowanie plików statycznych

// Trasa do pobierania komentarzy
app.get('/comments', function (req, res) {
  fs.readFile('comments.json', 'utf8', function (err, data) {
    if (err) {
      console.log(err);
      res.status(500).send('Internal Server Error');
      return;
    }
    try {
      var comments = JSON.parse(data);
      res.send(comments);
    } catch (e) {
      res.status(500).send('Error parsing JSON');
    }
  });
});

// Trasa do dodawania komentarzy
app.post('/comments', function (req, res) {
    fs.readFile('comments.json', 'utf8', function (err, data) {
        if (err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
            return;
        }
        var comments;
        try {
            comments = JSON.parse(data);
        } catch (e) {
            comments = [];
        }
        var newComment = {
            id: Date.now().toString(),
            message: req.body.message
        };
        comments.push(newComment);
        fs.writeFile('comments.json', JSON.stringify(comments), function (err) {
            if (err) {
                console.log(err);
                res.status(500).send('Internal Server Error');
                return;
            }
            res.send('Comment added');
        });
    });
});

// Trasa do usuwania komentarzy
app.delete('/comments/:id', function (req, res) {
  fs.readFile('comments.json', 'utf8', function (err, data) {
    if (err) {
      console.log(err);
      res.status(500).send('Internal Server Error');
      return;
    }
    var comments;
    try {
      comments = JSON.parse(data);
    } catch (e) {
      comments = [];
    }
    var comment = comments.find(function (comment) {
      return comment.id === req.params.id;
    });
    if (comment) {
      comments.splice(comments.indexOf(comment), 1);
      fs.writeFile('comments.json', JSON.stringify(comments), function (err) {
        if (err) {
          console.log(err);
          res.status(500).send('Internal Server Error');
          return;
        }
        res.send('Comment deleted');
      });
    } else {
      res.send('Comment not found');
    }
  });
});

// Trasa do edytowania komentarzy
app.put('/comments/:id', function (req, res) {
    fs.readFile('comments.json', 'utf8', function (err, data) {
        if (err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
            return;
        }
        var comments;
        try {
            comments = JSON.parse(data);
        } catch (e) {
            comments = [];
        }
        var comment = comments.find(function (comment) {
            return comment.id === req.params.id;
        });
        if (comment) {
            comment.message = req.body.message;
            fs.writeFile('comments.json', JSON.stringify(comments), function (err) {
                if (err) {
                    console.log(err);
                    res.status(500).send('Internal Server Error');
                    return;
                }
                res.send('Comment edited');
            });
        } else {
            res.send('Comment not found');
        }
    });
});

// Serwowanie pliku HTML
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.listen(3000, function () {
    console.log('Server is running on port 3000');
});