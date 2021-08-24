// When we load this page, get the first page of items
async function browsePage() {

    document.getElementById("browseContainer").innerHTML = "Getting results, this can take a sec..."

    const response = await fetch('https://shopkeep-and-heroes.hasura.app/api/rest/items/bytime/desc/wjourneys/wusers/0');
    const parsed_json = await response.json(); //extract JSON from the http response
    console.log(parsed_json);

    let graphical_results_html = "";

    for (let item = 0; item < parsed_json.items.length; item++) {
        graphical_results_html += 
        '<div class="result_container"><span class="result name">' + parsed_json.items[item].name + '</span>' +
        '<span class="result author">- ' + parsed_json.items[item].user.name + '</span>';

        for (let journey = 0; journey < parsed_json.items[item].journeys.length; journey++) {
            graphical_results_html +=
            '<div class="journey_container"><span class="result journey description">' + parsed_json.items[item].journeys[journey].description + '</span>' +
            '<span class="result journey author">- ' + parsed_json.items[item].journeys[journey].user.name + '</span>' +
            '<span class="result journey likes">Likes: ' + parsed_json.items[item].journeys[journey].likes + '</span>' +
            '<span class="result journey created_at">' + parseTimeStamp(parsed_json.items[item].journeys[journey].created_at) + '</span><br></div>';
        }

        if (parsed_json.items[item].journeys.length == 0) {
            graphical_results_html += '<div class="journey_container"><span class="result journey description placeholder">This item doesn\'t have any journeys yet; <a href="../heros-journey/index.html">make one</a>!</span></div>'
        }

        graphical_results_html +=
        '<span class="result likes">Likes: ' + parsed_json.items[item].likes + '</span>' +
        '<span class="result created_at">' + parseTimeStamp(parsed_json.items[item].created_at) + '</span>';

        graphical_results_html += '</div>'

        // console.log(graphical_results_html)
    }

    const element = document.getElementById("browseContainer");
    element.innerHTML = graphical_results_html

}

// function to interpret the timestamps into something readable
function parseTimeStamp(time) {
    return time.slice(8, 10) + "/" + time.slice(5, 7) + "/" + time.slice(0, 4) + " @ " + time.slice(11, 16);
}

window.onload = function() {
    
    browsePage();

}