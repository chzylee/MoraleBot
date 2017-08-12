const line = require('@line/bot-sdk');
const _mama = require('./lib/yomama');
const _dad = require('./lib/dadjoke');
const _greetings = require('./lib/greeting');
const _ellia = require('./lib/ellia');
const _lurk = require('./lib/lurk');
const _stickerPack = require('./lib/stickers');

module.exports = class MorningRiver {
    constructor(){
        this.on = true;

        this.mama = new _mama();
        this.dad = new _dad();
        this.greetings = new _greetings();
        this.ellia = new _ellia();
        this.lurk = new _lurk();
        this.stickerPack = new _stickerPack();
        // this.client = new line.Client({
        //     channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
        // });
    }

    // UTILS

    setLower(text){
        this.lower = text.toLowerCase();
    }

    contains(options){
        for(var i = 0; i < options.length; i++){        // for all options
            if(this.lower.includes(options[i])) {   // if lower contains one of options
                return true; // does contain one of options
            }
        }
        return false; // if none of the options returned true
    }

    startsWith(options){
        for(var i = 0; i < options.length; i++){        // for all options
            if(this.lower.startsWith(options[i])) {   // if lower starts with one of options
                return true; // does start with one of options
            }
        }
        return false; // if none of the options returned true
    }

    formTextReply(content){
        return {
            "type": "text",
            "text": content
        };
    }

    mrHandler(message){
        if(message.type === 'text'){
            this.setLower(message.text);
            return this.mrTextHandler(message.text);
        }
        else if(message.type === 'sticker'){
            return this.mrStickerHandler(message);
        }
    }

    // MESSAGES

    greet(userId){
        console.log('greeting user');
        var index = Math.ceil(Math.random() * (this.greetings.messages.length - 1));
        return this.formTextReply(this.greetings.messages[index]);
    }

    yoMama(){
        console.log('telling yo mama joke');
        var index = Math.ceil(Math.random() * (this.dad.jokes.length - 1));
        return this.formTextReply(this.mama.jokes[index]);
    }

    puns(){
        console.log('telling dad joke');
        var index = Math.ceil(Math.random() * (this.dad.jokes.length - 1));
        return this.formTextReply(this.dad.jokes[index]);
    }

    swEllia(){
        console.log('telling Ellia quote');
        var index = Math.ceil(Math.random() * (this.ellia.quotes.length - 1));
        return this.formTextReply(this.ellia.quotes[index]);
    }

    lurkers(){
        console.log('coming out of lurking');
        var index = Math.ceil(Math.random() * (this.lurk.messages.length - 1));
        return this.formTextReply(this.lurk.messages[index]);
    }

    mrTextHandler(text){
        if(this.lower === 'hey mr.'){
            this.on = true;
            return this.formTextReply('Only my dad calls me that');
        }
        else if(this.lower === 'goodnight mr.'){
            this.on = false;
            return this.formTextReply('But its not my bedtime yet ;-;');
        }
        else if(this.lower === 'see ya mr.'){
            return this.formTextReply('Peace out ma doods');
        }
        else if(this.startsWith(['mr. say'])){
            console.log('echoing');
            var echo = text.replace(/[Mm]r. [Ss]ay /g, '');
            return this.formTextReply(echo);
        }

        if(this.on){
            if(this.startsWith(['hi', 'what\'s up', 'whats up', 'good morning']) || this.contains(['hello'])){
                return this.greet();
            }
            else if(this.contains(['yo mama', 'yo mamma', 'yo momma'])){
                return this.yoMama();
            }
            else if(this.contains(['pun', 'puns', 'dad joke'])){
                return this.puns();
            }
            else if(this.contains(['sw', 'summoners war'])){
                return this.swEllia();
            }
            else if(this.contains(['lurk'])){
                return this.lurkers();
            }
            else if(this.contains(['saltcity'])){
                return this.formTextReply('SALTCITY');
            }
            else if(this.contains(['let\'s get down to business', 'lets get down to business'])){
                return this.formTextReply('To defeat the huns');
            }
            else if(this.contains(['fight', 'rumble'])){
                return this.mrFightSticker();
            }
            else if(this.contains(['nafag', 'inappropriate', 'lewd', 'nsfw'])){
                return this.mrNAFAG();
            }
            else if(this.contains(['congratz', 'congrats', 'gz', 'jee zee', 'grats', 'gratz'])){
                return this.mrCongratulations();
            }
            else if(this.contains(['happy birthday', 'hbd', 'my birthday', '\'s birthday'])){
                return this.mrBirthday();
            }
            else if(text.includes('FRIDAY')){ // must be in all caps
                return this.formTextReply('Friday! Friday! Friday! Friday! Whooooooooooooo!');
            }
        }
        else{
            return undefined;
        }
    }

    // STICKER FUNCTIONS

    mrHighFive(message){
        console.log('sending high five');
        return this.stickerPack.highFive;
    }

    mrFightSticker(){
        console.log('fighting');
        var index = Math.ceil(Math.random() * (this.stickerPack.fight.length - 1));
        return this.stickerPack.fight[index];
    }

    mrNAFAG(){
        console.log('reporting NAFAG content');
        var index = Math.ceil(Math.random() * (this.stickerPack.nafag.length - 1));
        return this.stickerPack.nafag[index];
    }

    mrCongratulations(){
        console.log('congratulating');
        var index = Math.ceil(Math.random() * (this.stickerPack.congrats.length - 1));
        return this.stickerPack.congrats[index];
    }

    mrBirthday(){
        console.log('birthday happying');
        return this.stickerPack.hbd;
    }

    mrStickerHandler(message){
        console.log('handling sticker');
        if(this.on){
            if((message.packageId === "2000014" && message.stickerId === "690879") 
            || (message.packageId === "2" && message.stickerId === "516")){
                return this.mrHighFive(message);
            }
        }
        else{
            return undefined;
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