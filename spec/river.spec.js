'use strict'
const _mr = require('../src/morningriver');

describe('Morning River bot', function() {

    var mr;

    // create instance of mr
    beforeEach(function() {
        mr = new _mr();
    });

    // line break between each test for clarity
    beforeEach(function() {
        console.log('\n');
    });
    
    it('gives output indicating toggled on after reading "hey mr."', function(){
        expect(mr.mrHandler('hey mr.')).toBe('Only my dad calls me that');
    });

    it('gives output indicating toggled off after reading "goodnight mr."', function(){
        expect(mr.mrHandler('goodnight mr.')).toBe('But its not my bedtime yet ;-;');
    });

    it('sets message to lowercase before checking conditions', function() {
        expect(mr.mrHandler('HEy mR.')).toBe('Only my dad calls me that'); // pass mixed case message intentionally
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
        var reply = mr.mrHandler('hi');
        console.log(mr.lower);
        console.log('reply to "hi": ' + reply);
        expect(mr.greetings.messages.includes(reply)).toBe(true);
    });

    it('returns a yo mama joke after reading "yo mama" in message', function(){
        var reply = mr.mrHandler('tell a yo mama joke');
        console.log('reply to "tell a yo mama joke": ' + reply);
        expect(mr.mama.jokes.includes(reply)).toBe(true);
    });

    it('returns a pun after reading "dad joke" in sentence', function(){
        var reply = mr.mrHandler('tell a dad joke');
        console.log('reply to "tell a dad joke": ' + reply);
        expect(mr.dad.jokes.includes(reply)).toBe(true);
    });

    it('returns an Ellia quote after reading "sw" in sentence', function(){
        var reply = mr.mrHandler('i love sw');
        console.log('reply to "i love sw": ' + reply);
        expect(mr.ellia.quotes.includes(reply)).toBe(true);
    });

    it('returns lurk message after reading "lurk" in sentence', function(){
        var reply = mr.mrHandler('whos lurking?');
        console.log('reply to "whos lurking?": ' + reply);
        expect(mr.lurk.messages.includes(reply)).toBe(true);
    });

    it('returns chant of "Friday!" after reading "FRIDAY" in sentence', function(){
        var reply = mr.mrHandler('Im so glad its FRIDAY!!!');
        console.log('reply to "Im so glad its FRIDAY!!!": ' + reply);
        expect(reply).toBe('Friday! Friday! Friday! Friday! Whooooooooooooo!');
    });

    it('echoes message when told to say something', function(){
        var reply = mr.mrHandler('Mr. Say hello world');
        console.log('reply to "mr. say hello world": ' + reply);
        expect(reply).toBe('hello world');
    });

});

