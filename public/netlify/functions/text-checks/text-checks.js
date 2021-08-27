const { response } = require("express");

const handler = async (event, context) => {
    try {

        let check = true;
        let item_name = document.getElementById("itemInput").value.trim();

        // eslint-disable-next-line no-unused-vars
        const { identity, user } = context.clientContext;

        let userID = ""
        if (user) {userID = user.sub;}
        else {
            return {
                statusCode: 401,
                body: JSON.stringify( { message: "Not a user" } )
            }
        }

        if (item_name == "") {
            check = false;
        }

        let banned_words = ["anal","anus","arse","ass","ballsack","balls","bastard","bitch","biatch","bloody","blowjob","blow job","bollock","bollok","boner","boob","bugger","bum","butt","buttplug","clitoris","cock","coon","crap","cunt","damn","dick","dildo","dyke","fag","feck","fellate","fellatio","felching","fuck","f u c k","fudgepacker","fudge packer","flange","Goddamn","God damn","jerk","jizz","knobend","knob end","labia","lmao","lmfao","muff","nigger","nigga","omg","penis","piss","poop","prick","pube","pussy","scrotum","shit","s hit","sh1t","slut","smegma","spunk","tit","tosser","turd","twat","vagina","wank","whore","wtf"];
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

        const request_url = "https://shopkeep-and-heroes.hasura.app/api/rest/items/insert/:name/:created_by";
        var xhr = new XMLHttpRequest();
        let response;
        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                console.log(xhr.response);
                response = xhr.response;
            }
        }
        xhr.open("POST", request_url, true, userID);

        return {
            statusCode: 200,
            body: JSON.stringify({ message: response })
        };


    } catch (error) {
        return { statusCode: 500, body: error.toString() }
    }
}

// eslint-disable-next-line no-undef
module.exports = { handler }
