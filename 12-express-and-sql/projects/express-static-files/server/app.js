const express = require('express');
const path = require('path');
const app = express();
// Your code here

//File paths appended to root URL
//app.use(express.static('assets'));

// Serve files from the 'assets/scripts' folder at the root URL
app.use('/', express.static(path.join(__dirname, 'assets', 'scripts')));

// Serve files from the 'assets/css' folder under the 'stylesheets' resource
app.use('/stylesheets', express.static(path.join(__dirname, 'assets', 'css')));

const port = 5000;
app.listen(port, () => console.log('Server is listening on port', port));