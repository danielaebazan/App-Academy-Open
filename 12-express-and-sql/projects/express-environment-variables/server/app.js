require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const app = express();
// Your code here

//NODE_ENV=production node index.js

//PORT=5000 SECRET_MESSAGE="Hello from command-line" node app.js


app.get('/', (req, res) => {
    res.send(process.env.SECRET_MESSAGE);
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is listening on port ${port}`));