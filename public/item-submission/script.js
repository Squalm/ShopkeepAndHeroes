// eslint-disable-next-line no-unused-vars
function onSubmitItem() {

    // Submit the item to the database
    

}

// Get some items in onload
async function browseItems(page) {

    const response = await fetch('https://shopkeep-and-heroes.hasura.app/api/rest/items/createJourney/' + page);
    const parsed_json = await response.json(); //extract JSON from the http response
    console.log(parsed_json);

    for (let i=0; i < parsed_json.length; i++) {
        continue;
    }

}

// function to interpret the timestamps into something readable
function parseTimeStamp(time) {
    return time.slice(8, 10) + "/" + time.slice(5, 7) + "/" + time.slice(0, 4) + " @ " + time.slice(11, 16);
}

window.onload = function() {
    
    browseItems(0);

}

// Check the text for swears and stuff we don't want
function include(file) {
  
    var script  = document.createElement('script');
    script.src  = file;
    script.type = 'text/javascript';
    script.defer = true;
    
    document.getElementsByTagName('head').item(0).appendChild(script);
    
}
include("../text-checks-live.js");

window.setInterval( () => {

    // eslint-disable-next-line no-undef
    let result = checktext(document.getElementById("itemInput").value);
    document.getElementById("itemTitle").innerText = result;

}, 1000)