var express = require('express');
var app = express();
app.use("/", express.static(__dirname));
app.get('/', function (req, res) {
  res.send('Hello World!');
});
console.log(__dirname);
app.listen(8188, function () {
  console.log('Example app listening on port 8188!');
});