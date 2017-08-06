const _mama = require('../lib/yomama');

module.exports = class MorningRiver {
    constructor(){
        this.mama = new _mama();
    }

    setLower(text) {
        this.lower = text.toLowerCase();
    }

    yoMama() {
        var index = Math.ceil(Math.random() * (this.mama.jokes.length - 1));
        return this.mama.jokes[index];
    }

    mrHandler(text) {
        if(this.lower === 'yo mama' || this.lower === 'yo momma'){
            return this.yoMama();
        }
    }
}