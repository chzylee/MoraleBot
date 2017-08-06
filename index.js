'use strict';

const line = require('@line/bot-sdk');
const express = require('express');
const _mr = require('./src/morningriver');

// create LINE SDK config from env variables
const config = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET,
};

// create LINE SDK client
const client = new line.Client(config);

// create Express app
// about Express itself: https://expressjs.com/
const app = express();
const mr = new _mr();

// setup view
app.get('/', function(request, response) {
  response.sendfile('./views/main.html');
});

// register a webhook handler with middleware
// about the middleware, please refer to doc
app.post('/webhook', line.middleware(config), (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result));
});

// event handler
function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    // ignore non-text-message event
    return Promise.resolve(null);
  }

  // create a echoing text message
  var echo = { type: 'text', text: event.message.text };
  var username = getName(event.source.userId);
  console.log('username: ' + username);
  mr.setLower(event.message.text);
  echo.text = mr.mrHandler(event.message.text, username);
  if(echo.text === null){
    return;
  }

  // use reply API
  return client.replyMessage(event.replyToken, echo);
}

// get name function
function getName(userId) {
    console.log('User id: ' + userId);
    var name;
    client.getProfile(userId)
        .then((profile) => {
            console.log(profile.displayName);
            name = profile.displayName;
        })
        .catch((err) => {
            console.log('error getting name');
            name = 'Precious noodlehead';
        });
    return name;
}

// listen on port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});