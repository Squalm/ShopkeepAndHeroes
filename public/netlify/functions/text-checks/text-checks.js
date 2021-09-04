/* eslint-disable no-undef */
// eslint-disable-next-line no-unused-vars

// eslint-disable-next-line no-unused-vars
const { json } = require("express");

exports.handler = async (event) => {
    try {

        let check = true;
        const {item_name, token} = JSON.parse(event.body);

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
        
        const captcha_succeeded = await captcha.success

        if (captcha_succeeded == false) {
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

        let query = "";

        const submit_item = fetch("https://shopkeep-and-heroes.hasura.app/v1/graphql", {
            body: JSON.stringify({ query: query }),
            method: "POST",
            headers: {
                X_HASURA_ADMIN_SECRET: process.env.HASURA_SECRET
            }
        }).then( (response) => {return response.json()} );

        const hasura_response = await submit_item

        return {
            statusCode: 200,
            body: JSON.stringify({ message: hasura_response })
        };


    } catch (error) {
        return { statusCode: 400, body: JSON.stringify( {message: error.toString()} ) }
    }
}