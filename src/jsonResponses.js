// start with empty bucket list
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

  for(let i = 0; i < bucketList.items.length; i++){
    if(body.bucketListItem === bucketList.items[i]){
      console.dir("Already Exists in the List");
      responseJSON.id = 'alreadyExists';
      return respondJSON(request, response, 400, responseJSON);
    }
  }

  //push new item from text field into the array
  bucketList.items.push(body.bucketListItem);

  if (responseCode === 201) {
    responseJSON.message = 'Created Successfully';
    return respondJSON(request, response, responseCode, responseJSON);
  }
  return respondJSONMeta(request, response, responseCode);
};

const deleteItem = (request, response, body) => {
  const responseJSON = {
    message: 'Must select an already created bucket list item to delete',
  };

  let responseCode = 201;

  if(body.bucketListItem){
    for(var i = 0; i < bucketList.items.length; i++){
      if(body.bucketListItem === bucketList.item[i]){
        //delete the item from the object
        bucketList.item[i].splice(bucketList.item[i], 1);
        
        //1 do we want to put each item on a button with an 'x' button to delete and when its pressed this method triggers?
        //2 add delete button next to add button
      }
    }
  }

  //check for errors then set response code
  if (body.bucketListItem) {
    responseCode = 204;
  } else {
    responseCode = 400;
  }

  if(responseCode === 201){
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
  deleteItem,
  notFound,
  getItemsMeta,
  notFoundMeta,
};
