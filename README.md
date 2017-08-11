# Morning-River Bot

Peaceful as a morning river, and graceful as a Big Mac cruising thru yo mama's intestines, Morning-River bestows joy upon its companions through morale-boosting humour.

## How to use

Install deps:

```bash
$ npm install
```

Configuration for Heroku Deployment:

``` bash
$ heroku config:set CHANNEL_SECRET=YOUR_CHANNEL_SECRET
$ heroku config:set CHANNEL_ACCESS_TOKEN=YOUR_CHANNEL_ACCESS_TOKEN
$ heroku config:set PORT=1234
```

Run:

``` bash
$ node .
```

## Commands

### Greetings

Say hi, and Mr. Morning River will respond even if you're not greeting him.

### Yo Mama

Talk about yo mama jokes to hear one from the great Morning River himself

### Dad Jokes

Morning River loves puns. His good friend Shallow Brook loved them, but passed away... Morning River loves telling puns to those who discuss them in memory of his lost friend.

### SW

Morning River used to play Summoners War until he spent too much money buying Rune packs and ended up on the streets. As a devout mentee of Ellia, he memorized all her words of wisdom and shares them with his fellow Summoners.

### Toggle

Although he may look old, Morning River is still a child at heart. Greet him with a 'Hey Mr.' or put him to sleep with a 'Goodnight Mr.' and he'll wake and sleep as you command. If you ever get sick of him, just say 'see ya Mr.' and he'll politely leave.

## Testing

Jasmine tests are setup and placed in the spec folder. [river.spec.js](./spec/river.spec.js) has the tests for the bot. Run `jasmine` in base directory to run tests.