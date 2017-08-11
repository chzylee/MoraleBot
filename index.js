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
  if (event.type !== 'message' || (event.message.type !== 'text' && event.message.type !== 'sticker')) {
    // ignore non-text-message event
    if(event.type === 'message'){
      // console.log('message object: ' + event.message);
      console.log('message type: ' + event.message.type);
    }
    return Promise.resolve(null);
  }

  if(event.message.type === 'sticker'){
    console.log('package id: ' + event.message.packageId);
    console.log('sticker id: ' + event.message.stickerId);

    var sticker = mr.mrStickerHandler(event.message);
    if(sticker !== undefined){
      return client.replyMessage(event.replyToken, sticker);
    }
  }

  // create a echoing text message
  var echo = { type: 'text', text: event.message.text };
  echo.text = mr.mrHandler(echo.text, event.source.userId);
  console.log('message object: ' + event.message);
  if(echo.text === 'Peace out ma doods'){
      client.replyMessage(event.replyToken, echo)
      return client.leaveGroup(event.source.groupId);
  }

  // use reply API
  return client.replyMessage(event.replyToken, echo);
}

// listen on port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});