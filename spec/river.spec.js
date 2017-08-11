'use strict'
const _mr = require('../src/morningriver');

describe('Morning River bot', function(){

    var mr, message;

    // create instance of mr
    beforeEach(function(){
        mr = new _mr();
    });

    // turn on before tests
    beforeEach(function(){
        mr.on = true;
    })

    // line break between each test for clarity
    beforeEach(function(){
        console.log('\n');
    });

    // create message object
    beforeEach(function(){
        message = {
            type: ""
        };
    })
    
    it('gives output indicating toggled on after reading "hey mr."', function(){
        message.type = "text";
        message.text = "hey mr.";
        var reply = mr.mrHandler(message);
        expect(reply.text).toBe('Only my dad calls me that');
    });

    it('gives output indicating toggled off after reading "goodnight mr."', function(){
        message.type = "text";
        message.text = "goodnight mr.";
        console.log(message);
        var reply = mr.mrHandler(message);
        expect(reply.text).toBe('But its not my bedtime yet ;-;');
    });

    it('sets message to lowercase before checking conditions', function() {
        message.type = "text";
        message.text = "HEy mR."; // pass mixed case message intentionally
        var reply = mr.mrHandler(message);
        expect(reply.text).toBe('Only my dad calls me that'); 
    });

    it('detects if one of options is within message', function(){
        mr.setLower('the quick brown fox jumps');
        expect(mr.contains(['red', 'blue', 'hot pink', 'brown'])).toBe(true);
    });

    it('detects if message starts with one of options', function(){
        mr.setLower('green beans make my poo blue');
        expect(mr.startsWith(['red', 'green', 'neon yellow', 'orange'])).toBe(true);
    });

    it('returns a greeting after reading "hi"', function(){
        message.type = "text";
        message.text = "hi";
        var reply = mr.mrHandler(message);
        console.log('reply to "hi": ' + reply.text);
        expect(mr.greetings.messages.includes(reply.text)).toBe(true);
    });

    it('returns a yo mama joke after reading "yo mama" in message', function(){
        message.type = "text";
        message.text = "tell a yo mama joke";
        var reply = mr.mrHandler(message);
        console.log('reply to "tell a yo mama joke": ' + reply.text);
        expect(mr.mama.jokes.includes(reply.text)).toBe(true);
    });

    it('returns a pun after reading "dad joke" in sentence', function(){
        message.type = "text";
        message.text = "tell a dad joke";
        var reply = mr.mrHandler(message);
        console.log('reply to "tell a dad joke": ' + reply.text);
        expect(mr.dad.jokes.includes(reply.text)).toBe(true);
    });

    it('returns an Ellia quote after reading "sw" in sentence', function(){
        message.type = "text";
        message.text = "i love sw";
        var reply = mr.mrHandler(message);
        console.log('reply to "i love sw": ' + reply.text);
        expect(mr.ellia.quotes.includes(reply.text)).toBe(true);
    });

    it('returns lurk message after reading "lurk" in sentence', function(){
        message.type = "text";
        message.text = "whos lurking?";
        var reply = mr.mrHandler(message);
        console.log('reply to "whos lurking?": ' + reply.text);
        expect(mr.lurk.messages.includes(reply.text)).toBe(true);
    });

    it('returns chant of "Friday!" after reading "FRIDAY" in sentence', function(){
        message.type = "text";
        message.text = "Im so glad its FRIDAY!!!";
        var reply = mr.mrHandler(message);
        console.log('reply to "Im so glad its FRIDAY!!!": ' + reply.text);
        expect(reply.text).toBe('Friday! Friday! Friday! Friday! Whooooooooooooo!');
    });

    it('echoes message when told to say something', function(){
        message.type = "text";
        message.text = "Mr. Say hello world";
        console.log(message);
        var reply = mr.mrHandler(message);
        console.log('reply to "mr. say hello world": ' + reply.text);
        expect(reply.text).toBe('hello world');
    });

    it('returns high five sticker after reading (high five) emoji', function() {
        message = {
            "type": "sticker",
            "packageId": "2000014",
            "stickerId": "690879"
        }
        var reply = mr.mrStickerHandler(message);
        expect(reply).toEqual(mr.stickerPack.highFive);
    });

    it('returns high five sticker after reading high five sticker', function() {
        message = {
            "type": "sticker",
            "packageId": "2",
            "stickerId": "516"
        }
        var reply = mr.mrStickerHandler(message);
        expect(reply).toEqual(mr.stickerPack.highFive);
    });

    it('returns fight sticker after reading "fight" in sentence', function(){
        message.type = "text";
        message.text = "fight me kid";
        var reply = mr.mrHandler(message);
        expect(mr.stickerPack.fight.includes(reply)).toBe(true);
    });

    it('returns nafag sticker after reading "NAFAG" in sentence', function(){
        message.type = "text";
        message.text = "fight me kid";
        var reply = mr.mrHandler(message);
        expect(mr.stickerPack.fight.includes(reply)).toBe(true);
    });

    it('returns congratulatory sticker after reating "congrats"', function(){
        message.type = "text";
        message.text = "congrats dood";
        var reply = mr.mrHandler(message);
        expect(mr.stickerPack.congrats.includes(reply)).toBe(true);
    });

    it('returns happy birthday sticker after reading it is somebodys birthday', function(){
        message.type = "text";
        message.text = "happy birthday dood";
        var reply = mr.mrHandler(message);
        expect(reply).toBe(mr.stickerPack.hbd);
    });

});

