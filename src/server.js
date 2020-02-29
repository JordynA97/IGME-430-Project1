const http = require('http');
const url = require('url');
const query = require('querystring');
const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./jsonResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

//handle the post method
const handlePost = (request, response, parsedUrl) => {
  if (parsedUrl.pathname === '/addItem') {
    const res = response;
    const body = [];

    request.on('error', (err) => {
      console.dir(err);
      res.statusCode = 400;
      res.end();
    });

    request.on('data', (chunk) => {
      body.push(chunk);
    });

    request.on('end', () => {
      const bodyString = Buffer.concat(body).toString();
      const bodyParams = query.parse(bodyString);
      jsonHandler.addItem(request, res, bodyParams);
    });
  }
};

//handle the get method
const handleGet = (request, response, parsedUrl) => {
  if (parsedUrl.pathname === '/style.css') {
    htmlHandler.getCSS(request, response);
  } else if (parsedUrl.pathname === '/getItems') {
    jsonHandler.getItems(request, response);
  } else if (parsedUrl.pathname === '/') {
    htmlHandler.getIndex(request, response);
  } else if (parsedUrl.pathname === '/notReal') {
    jsonHandler.notFound(request, response);
  } else {
    jsonHandler.notFound(request, response);
  }
};

//handle head method
const handleHead = (request, response, parsedUrl) => {
  if (parsedUrl.pathname === '/getItems') {
    jsonHandler.getItemsMeta(request, response);
  } else {
    jsonHandler.notFoundMeta(request, response);
  }
};

//on request method
const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url);

  if (request.method === 'POST') {
    handlePost(request, response, parsedUrl);
  } else if (request.method === 'GET') {
    handleGet(request, response, parsedUrl);
  } else {
    handleHead(request, response, parsedUrl);
  }
};

//set up the server
http.createServer(onRequest).listen(port);

console.dir(`Listening on 127.0.0.1: ${port}`);
