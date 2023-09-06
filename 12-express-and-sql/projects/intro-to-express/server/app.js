const express = require('express');

const app = express();

const port = 5000

app.get('/status', (req, res) => {
    res.send('The server is alive')
});

app.listen(port, () => console.log(`Server is listening on port ${port}`))

