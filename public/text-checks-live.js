/* eslint-disable no-useless-escape */
// eslint-disable-next-line no-unused-vars
function checktext(item_name) {

    // A note to slightly malicious/curious users editing this js:
    // The checks performed here are only to give live and more useful feedback to the user, proper checks are performed after hitting submit.

    let default_prompt = "Fill in the prompt below with the name of your item!"
    item_name = item_name.trim()

    if (item_name == "") {
        return default_prompt;
    }

    let banned_words = [ " anal " , " anus " , " arse " , " ass " , " ballsack " , " balls " , " bastard " , " bitch " , " biatch " , " bloody " , " blowjob " , " blow job " , " bollock " , " bollok " , " boner " , " boob " , " bugger " , " bum " , " butt " , " buttplug " , " clitoris " , " cock " , " coon " , " crap " , " cunt " , " damn " , " dick " , " dildo " , " dyke " , " fag " , " feck " , " fellate " , " fellatio " , " felching " , " fuck " , " f u c k " , " fudgepacker " , " fudge packer " , " flange " , " Goddamn " , " God damn " , " jerk " , " jizz " , " knobend " , " knob end " , " labia " , " lmao " , " lmfao " , " muff " , " nigger " , " nigga " , " omg " , " penis " , " piss " , " poop " , " prick " , " pube " , " pussy " , " scrotum " , " shit " , " s hit " , " sh1t " , " slut " , " smegma " , " spunk " , " tit " , " tosser " , " turd " , " twat " , " vagina " , " wank " , " whore " , " wtf " ];
    for (let i = 0; i < banned_words.length; i++) {
        if (item_name.includes(banned_words[i])) {
            return "Your item contains banned words (" + banned_words[i] + ") ";
        }
    } 

    // allowed characters
    if (!(new RegExp("[a-z,A-Z,0-9,\?,\!,\.,\-,\*,\+,', ]+$").test(item_name))) {
        return "Your item contains disallowed characters!";
    }

    return default_prompt;
}