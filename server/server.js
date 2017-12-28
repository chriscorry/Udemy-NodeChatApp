const express = require('express');
const path = require('path');

const port = process.env.PORT || 3000;
var publicPath = path.join(__dirname, '/../public');

var app = express();


//
// Middleware: Serve static content from the 'public' dir
//
app.use(express.static(publicPath));


app.listen(port, () => {
  console.log(`Server is up on port ${port}.`);
});
