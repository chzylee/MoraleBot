const line = require('@line/bot-sdk');
const utils = require('./utils');
const mama = require('./lib/yomama');
const dad = require('./lib/dadjoke');
const greetings = require('./lib/greeting');
const ellia = require('./lib/ellia');
const lurk = require('./lib/lurk');
const _stickerPack = require('./lib/stickers');

module.exports = class MorningRiver {
    constructor(){
        this.on = false;
        this.lower = "";

        this.mama = mama;
        this.dad = dad;
        this.greetings = greetings;
        this.ellia = ellia;
        this.lurk = lurk;
        this.stickerPack = new _stickerPack();
        // this.client = new line.Client({
        //     channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
        // });
    }

    // UTILS

    setLower(text){
        this.lower = text.toLowerCase();
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
        return utils.formTextReply(utils.randomFrom(this.greetings));
    }

    yoMama(){
        console.log('telling yo mama joke');
        return utils.formTextReply(utils.randomFrom(this.mama));
    }

    puns(){
        console.log('telling dad joke');
        return utils.formTextReply(utils.randomFrom(this.dad));
    }

    swEllia(){
        console.log('telling Ellia quote');
        return utils.formTextReply(utils.randomFrom(this.ellia));
    }

    lurkers(){
        console.log('coming out of lurking');
        return utils.formTextReply(utils.randomFrom(this.lurk));
    }

    mrTextHandler(text){
        if(this.lower === 'hey mr.' || this.lower === 'hey mr. '){
            this.on = true;
            return utils.formTextReply('Only my dad calls me that');
        }
        else if(this.lower === 'goodnight mr.' || this.lower === 'goodnight mr. '){
            this.on = false;
            return utils.formTextReply('But its not my bedtime yet ;-;');
        }
        else if(this.lower === 'see ya mr.'){
            return utils.formTextReply('Peace out ma doods');
        }
        else if(utils.startsWith(this.lower, ['mr. say'])){
            console.log('echoing');
            var echo = text.replace(/[Mm]r. [Ss]ay /g, '');
            return utils.formTextReply(echo);
        }

        if(this.on){
            if(utils.startsWith(this.lower, ['hi', 'what\'s up', 'whats up', 'good morning']) || utils.contains(this.lower, ['hello'])){
                return this.greet();
            }
            else if(utils.contains(this.lower, ['yo mama', 'yo mamma', 'yo momma'])){
                return this.yoMama();
            }
            else if(utils.contains(this.lower, ['pun', 'puns', 'dad joke'])){
                return this.puns();
            }
            else if(utils.contains(this.lower, ['sw', 'summoners war'])){
                return this.swEllia();
            }
            else if(utils.contains(this.lower, ['lurk'])){
                return this.lurkers();
            }
            else if(utils.contains(this.lower, ['saltcity'])){
                return utils.formTextReply('SALTCITY');
            }
            else if(utils.contains(this.lower, ['let\'s get down to business', 'lets get down to business'])){
                return utils.formTextReply('To defeat the huns');
            }
            else if(utils.contains(this.lower, ['fight', 'rumble'])){
                return this.mrFightSticker();
            }
            else if(utils.contains(this.lower, ['nafag', 'inappropriate', 'lewd', 'nsfw'])){
                return this.mrNAFAG();
            }
            else if(utils.contains(this.lower, ['congratz', 'congrats', 'gz', 'jee zee', 'grats', 'gratz'])){
                return this.mrCongratulations();
            }
            else if(utils.contains(this.lower, ['happy birthday', 'hbd', 'my birthday', '\'s birthday'])){
                return this.mrBirthday();
            }
            else if(text.includes('FRIDAY')){ // must be in all caps
                return utils.formTextReply('Friday! Friday! Friday! Friday! Whooooooooooooo!');
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
        return utils.randomFrom(this.stickerPack.fight);
    }

    mrNAFAG(){
        console.log('reporting NAFAG content');
        return utils.randomFrom(this.stickerPack.nafag);
    }

    mrCongratulations(){
        console.log('congratulating');
        return utils.randomFrom(this.stickerPack.congrats);
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