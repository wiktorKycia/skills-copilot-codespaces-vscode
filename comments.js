// Importowanie wymaganych modułów
var express = require('express');
var fs = require('fs');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');

// Konfiguracja middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public'));

// Ustawienie portu serwera
var port = 3000;
app.listen(port, function () {
  console.log('Server is running on port ' + port);
});

// Trasa do pobierania komentarzy
app.get('/comments', function (req, res) {
  fs.readFile('comments.json', 'utf8', function (err, data) {
    if (err) {
      console.log(err);
    }
    res.send(data);
  });
});

// Trasa do dodawania komentarzy
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

// Trasa do usuwania komentarzy
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

// Trasa do edytowania komentarzy
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
      });
    } else {
      res.send('Comment not found');
    }
  });
});