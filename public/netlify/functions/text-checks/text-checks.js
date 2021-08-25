// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
const handler = async (event) => {
    try {

        let check = true;
        let item_name = document.getElementById("itemInput").value;

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

        return {
            statusCode: 202,
            body: JSON.stringify({ message: "Submitted" }),
        }

    } catch (error) {
        return { statusCode: 500, body: error.toString() }
    }
}

// eslint-disable-next-line no-undef
module.exports = { handler }
