module.exports = {

    // checks if lowercase string includes one of options
    contains(lower, options) {
        for(var i = 0; i < options.length; i++) {        // for all options
            if(lower.includes(options[i])) {   // if lower contains one of options
                return true; // does contain one of options
            }
        }
        return false; // if none of the options returned true
    },

    // checks if lowercase string starts with one of options
    startsWith(lower, options) {
        for(var i = 0; i < options.length; i++) {        // for all options
            if(lower.startsWith(options[i])) {   // if lower starts with one of options
                return true; // does start with one of options
            }
        }
        return false; // if none of the options returned true
    },

    // returns random element from given array
    randomFrom(arr) {
        var index = Math.ceil(Math.random() * (arr.length - 1));
        return arr[index];
    },
    
    // forms json content with text as reply
    formTextReply(content){
        return {
            "type": "text",
            "text": content
        };
    }
}