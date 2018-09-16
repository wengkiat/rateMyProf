var express = require('express');
var app = express();

app.get('/', (req, res) => {
   res.send("Try localhost:3001/hello");
});

app.get('/hello', (req, res) => {
   res.send("Hello World!");
});

app.listen(3001);

