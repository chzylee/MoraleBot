const _mama = require('../lib/yomama');
const _dad = require('../lib/dadjokes');

module.exports = class MorningRiver {
    constructor(){
        this.mama = new _mama();
        this.dad = new _dad();
    }

    setLower(text) {
        this.lower = text.toLowerCase();
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
        if(this.lower === 'yo mama' || this.lower === 'yo momma'){
            return this.yoMama();
        }
        else if(this.lower === 'pun' || this.lower === 'puns' || this.lower === 'dad joke'){
            return this.puns();
        }
    }
}