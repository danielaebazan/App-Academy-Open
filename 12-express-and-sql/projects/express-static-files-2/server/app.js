const express = require('express');
const path = require('path');
const app = express();

// Your code here

// Serve files from the 'assets/images' folder under the 'stickers' resource
app.use('/stickers', express.static(path.join(__dirname, 'assets', 'images')));

const port = 5000;
app.listen(port, () => console.log('Server is listening on port', port));