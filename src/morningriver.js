const line = require('@line/bot-sdk');
const _mama = require('./lib/yomama');
const _dad = require('./lib/dadjoke');

module.exports = class MorningRiver {
    constructor(){
        this.mama = new _mama();
        this.dad = new _dad();

        this.greetings = [
            'salutations my little lamb.',
            'tis a pleasure seeing you, my delightful potato.',
            'whats new in the zoo cutie-poo?',
            'my dearest baby possum, to what do I owe this honour?',
            'how dost thou?',
            'how fares thee mutton-muncher?',
            'you are well met.',
            'hail to your grace.',
            'good morrow sweet kitten.',
            'whats poppin ma dood??'
        ]
    }

    setLower(text) {
        this.lower = text.toLowerCase();
    }

    greeting(username) {
        console.log('greeting ' + username);
        var index = Math.ceil(Math.random() * (this.greetings.length - 1));
        return username + ', ' + this.greetings[index];
    }

    yoMama() {
        console.log('telling yo mama joke');
        var index = Math.ceil(Math.random() * (this.dad.jokes.length - 1));
        return this.mama.jokes[index];
    }

    puns() {
        console.log('telling dad joke');
        var index = Math.ceil(Math.random() * (this.dad.jokes.length - 1));
        return this.dad.jokes[index];
    }

    mrHandler(text, username) {
        if(this.lower.includes('hi') || this.lower.includes('hello') || this.lower.includes('what\'s up')){
            return this.greeting(username);
        }
        else if(this.lower.includes('yo mama') || this.lower.includes('yo momma') || this.lower.includes('yo mamma')){
            return this.yoMama();
        }
        else if(this.lower === 'pun' || this.lower === 'puns' || this.lower === 'dad joke'){
            return this.puns();
        }
    }
}