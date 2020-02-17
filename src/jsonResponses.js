// empty object
const bucketList = {
  items: []
};

const respondJSON = (request, response, status, object) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify(object));
  response.end();
};

const respondJSONMeta = (request, response, status) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.end();
};

const getItems = (request, response) => {
  const responseJSON = {
    bucketList,
  };

  respondJSON(request, response, 200, responseJSON);
};

const getItemsMeta = (request, response) => respondJSONMeta(request, response, 200);

const notFoundMeta = (request, response) => respondJSONMeta(request, response, 404);

const addItem = (request, response, body) => {
  const responseJSON = {
    message: 'Must enter a bucket list item.',
  };

  if (!body.bucketListItem) {
    responseJSON.id = 'missingParams';
    return respondJSON(request, response, 400, responseJSON);
  }

  let responseCode = 201;

  if (body.bucketListItem) {
    responseCode = 204;
  } else {
    responseCode = 400;
  }


  bucketList.items.push(body.bucketListItem);

  if (responseCode === 201) {
    responseJSON.message = 'Created Successfully';
    return respondJSON(request, response, responseCode, responseJSON);
  }
  return respondJSONMeta(request, response, responseCode);
};

const notFound = (request, response) => {
  const responseJSON = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };

  respondJSON(request, response, 404, responseJSON);
};

// export methods
module.exports = {
  getItems,
  addItem,
  notFound,
  getItemsMeta,
  notFoundMeta,
};
