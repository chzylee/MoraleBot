const line = require('@line/bot-sdk');
const _mama = require('./lib/yomama');
const _dad = require('./lib/dadjoke');
const _greetings = require('./lib/greeting');
const _ellia = require('./lib/ellia');

module.exports = class MorningRiver {
    constructor(){
        this.on = true;

        this.mama = new _mama();
        this.dad = new _dad();
        this.greetings = new _greetings();
        this.ellia = new _ellia();
        // this.client = new line.Client({
        //     channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
        // });
    }

    setLower(text) {
        this.lower = text.toLowerCase();
    }

    greet(userId) {
        console.log('greeting user');
        var index = Math.ceil(Math.random() * (this.greetings.messages.length - 1));
        return this.greetings.messages[index];
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

    swEllia() {
        console.log('telling Ellia quote');
        var index = Math.ceil(Math.random() * (this.ellia.quotes.length - 1));
        return this.ellia.quotes[index];
    }

    mrHandler(text, userId) {
        if(this.lower === 'hey mr.'){
            this.on = true;
            return 'Only my dad calls me that';
        }
        else if(this.lower === 'goodnight mr.'){
            this.on = false;
            return 'But its not my bedtime yet ;-;';
        }
        else if(this.lower === 'see ya mr.'){
            return 'Peace out ma doods';
        }

        if(this.on){
            if(this.lower.startsWith('hi') || this.lower.startsWith('hello') || this.lower.startsWith('what\'s up') || this.lower.startsWith('whats up')){
                return this.greet();
            }
            else if(this.lower.includes('yo mama') || this.lower.includes('yo momma') || this.lower.includes('yo mamma')){
                return this.yoMama();
            }
            else if(this.lower.includes('pun') || this.lower.includes('puns') || this.lower.includes('dad joke')){
                return this.puns();
            }
            else if(this.lower.includes('sw') || this.lower.includes('summoners war')){
                return this.swEllia();
            }
        }
    }
}

// getDisplayName(userId, client) {
    //     return new Promise((resolve, reject) => {
    //         var name = client.getProfile(userId)
    //             .then((profile) => {
    //                 return profile.displayName.toString();
    //             });

    //         Promise.all([name])
    //             .then((name) => {
    //                 console.log('got username: ' + name[0]);
    //                 resolve(name[0]);
    //             })
    //             .catch((err) => {
    //                 console.log('error getting name: ' + err);
    //                 reject(err);
    //             });   
    //     });
    // }