const _mama = require('./lib/yomama');
const _dad = require('./lib/dadjoke');

module.exports = class MorningRiver {
    constructor(){
        this.mama = new _mama();
        this.dad = new _dad();

        this.greetings = [
            'Salutations, my little lamb',
            'A pleasure seeing you, my most delightful child',
            'Whats new in the zoo cutie-poo?',

        ]
    }

    setLower(text) {
        this.lower = text.toLowerCase();
    }

    greeting() {

    }

    yoMama() {
        var index = Math.ceil(Math.random() * (this.dad.jokes.length - 1));
        return this.mama.jokes[index];
    }

    puns() {
        var index = Math.ceil(Math.random() * (this.dad.jokes.length - 1));
        return this.dad.jokes[index];
    }

    mrHandler(text) {
        if(this.lower === 'hi' || this.lower === 'hello'){
            return this.greeting();
        }
        else if(this.lower.includes('yo mama') || this.lower.includes('yo momma') || this.lower.includes('yo mamma')){
            return this.yoMama();
        }
        else if(this.lower === 'pun' || this.lower === 'puns' || this.lower === 'dad joke'){
            return this.puns();
        }
    }
}