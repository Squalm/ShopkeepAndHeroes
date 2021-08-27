// eslint-disable-next-line no-unused-vars
async function onSubmitItem() {

    // Submit the item to the database by invoking the function
    const request_url = "../.netlify/functions/text_checks/text_checks?iname=" + document.getElementById("itemInput").value;
    document.getElementById("itemTitle").value = fetch(request_url).then((response) => {
        return response.json()
    });

}

// Get some items in onload
// Move this to heros-journey soon
async function browseItems(page) {

    const response = await fetch('https://shopkeep-and-heroes.hasura.app/api/rest/items/createJourney/' + page);
    const parsed_json = await response.json(); //extract JSON from the http response
    console.log(parsed_json);

    for (let i=0; i < parsed_json.length; i++) {
        continue;
    }

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