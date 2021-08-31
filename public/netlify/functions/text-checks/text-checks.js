/* eslint-disable no-undef */
// eslint-disable-next-line no-unused-vars
const { response } = require("express");

exports.handler = async (event) => {
    try {

        let check = true;
        let item_name = JSON.parse(event.body);

        if (item_name == "") {
            check = false;
        }

        const captcha = fetch("https://www.google.com/recaptcha/api/siteverify", {
            secret: process.env.GRECAPTCHA_SECRET,
            response: token,
            method: "POST"
        }).then((response) => {
            return response.json()
        })
        
        if (captcha.success == false) {
            check = false;
        }

        let banned_words = ["anal","anus","arse","ass","ballsack","balls","bastard","bitch","biatch","bloody","blowjob","blow job","bollock","bollok","boner","boob","bugger","bum","butt","buttplug","clitoris","cock","coon","crap","cunt","damn","dick","dildo","dyke","fag","feck","fellate","fellatio","felching","fuck","f u c k","fudgepacker","fudge packer","flange","Goddamn","God damn","jerk","jizz","knobend","knob end","labia","lmfao","muff","nigger","nigga","omg","penis","piss","poop","prick","pube","pussy","scrotum","shit","s hit","sh1t","slut","smegma","spunk","tit","tosser","turd","twat","vagina","wank","whore","wtf"];
        for (let i = 0; i < banned_words.length; i++) {
            if (item_name.includes(banned_words[i])) {
                check = false;
            }
        } 

        // allowed characters
        // eslint-disable-next-line no-useless-escape
        if (!(new RegExp("[a-z,A-Z,0-9,\?,\!,\.,\-,\*,\+,', ]+$").test(item_name))) {
            check = false;
        }

        if (check == false) {
            return {
                statusCode: 401,
                body: JSON.stringify( { message: "The item failed one or more checks" } )
            }
        }

        // If all checks passed:

        const request_url = "https://shopkeep-and-heroes.hasura.app/api/rest/items/insert/"+ item_name;
        var xhr = new XMLHttpRequest();
        let response;
        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                console.log(xhr.response);
                response = xhr.response;
            }
        }
        xhr.open("POST", request_url, true);

        return {
            statusCode: 200,
            body: JSON.stringify({ message: response })
        };


    } catch (error) {
        return { statusCode: 400, body: error.toString() }
    }
}