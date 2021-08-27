// Get some items in onload
async function browseItems(page) {

    const response = await fetch('https://shopkeep-and-heroes.hasura.app/api/rest/items/createJourney/' + page);
    const parsed_json = await response.json(); //extract JSON from the http response
    console.log(parsed_json);

    for (let i=0; i < parsed_json.length; i++) {
        continue;
    }

}

window.onload = function() {
    browseItems(0);
};