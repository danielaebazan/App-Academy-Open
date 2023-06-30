const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  const { method, url } = req;

  if (method === 'GET' && url.startsWith('/static')) {
    const filePath = path.join(__dirname, 'assets', url.replace('/static', ''));
    const fileExtension = path.extname(filePath);
    let contentType = '';

    switch (fileExtension) {
      case '.jpg':
        contentType = 'image/jpeg';
        break;
      case '.css':
        contentType = 'text/css';
        break;
      // Add more cases for other file extensions if needed

      default:
        contentType = 'application/octet-stream';
        break;
    }

    fs.readFile(filePath, (err, fileContents) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', contentType);
      res.end(fileContents);
    });
  } else {
    fs.readFile('index.html', 'utf8', (err, fileContents) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/html');
      res.end(fileContents);
    });
  }
});

const port = 5000;

server.listen(port, () => console.log('Server is listening on port', port));
