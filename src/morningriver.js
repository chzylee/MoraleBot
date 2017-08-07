const line = require('@line/bot-sdk');
const _mama = require('./lib/yomama');
const _dad = require('./lib/dadjoke');

module.exports = class MorningRiver {
    constructor(){
        this.mama = new _mama();
        this.dad = new _dad();
        this.client = new line.Client({
            channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
        });

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

    getDisplayName(userId, client) {
        return new Promise((resolve, reject) => {
            var name = client.getProfile(userId)
                .then((profile) => {
                    return profile.displayName.toString();
                });

            Promise.all([name])
                .then((name) => {
                    console.log('got username: ' + name[0]);
                    resolve(name[0]);
                })
                .catch((err) => {
                    console.log('error getting name: ' + err);
                    reject(err);
                });   
        });
    }

    greet(userId, greetings, client, nameFunc) {
        console.log('greeting user');
        var index = Math.ceil(Math.random() * (greetings.length - 1));
        return new Promise((resolve, reject) => {
            nameFunc(userId, client)
                .then((name) => {
                    console.log('greeting user ' + name);
                    resolve(name + ', ' + greetings[index]);
                })
                .catch((err) => {
                    console.log('error getting greeting: ' + err);
                    reject(err);
                });
        });
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

    mrHandler(echo, userId) {
        if(this.lower.startsWith('hi') || this.lower.startsWith('hello') || this.lower.startsWith('what\'s up') || this.lower.startsWith('whats up')){
            var greeting = this.greet(userId, this.greetings, this.client, this.getDisplayName)
                .then((result) => {
                    console.log('got greeting: ' + result);
                    return result;
                })
                .catch((err) => {
                    console.log('error occurred: ' + err);  
                });

            Promise.all([greeting])
                .then((greeting) => {
                    console.log('greeting returned: ' + greeting[0]);
                    echo.text = greeting[0];
                })
        }
        else if(this.lower.includes('yo mama') || this.lower.includes('yo momma') || this.lower.includes('yo mamma')){
            echo.text = this.yoMama();
        }
        else if(this.lower === 'pun' || this.lower === 'puns' || this.lower === 'dad joke'){
            echo.text = this.puns();
        }
    }
}