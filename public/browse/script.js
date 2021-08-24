// When we load this page, get the first page of items
async function getBrowsePage() {
    const response = await fetch('https://shopkeep-and-heroes.hasura.app/api/rest/items/bytime/desc/wjourneys/wusers/0');
    const parsed_json = await response.json(); //extract JSON from the http response
    console.log(parsed_json);
    return parsed_json;
}

window.onload = function() {
    
    getBrowsePage();

}