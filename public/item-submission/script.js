// eslint-disable-next-line no-unused-vars
async function onSubmitItem(token) {

    // Submit the item to the database by invoking the function
    const request_url = "https://shopkeepandheroes.netlify.app/.netlify/functions/text-checks";
    let item_name = document.getElementById("itemInput").value;
    console.log(item_name)
    const submit_item =  fetch(request_url, {
            body: JSON.stringify([item_name, token]),
            method: "POST"
        }).then((response) => {
        return response.json()
    });
    document.getElementById("itemTitle").value = submit_item;

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

window.onload = () => {

    const cors_request = fetch("https://shopkeepandheroes.netlify.app/.netlify/functions/text-checks", {body: JSON.stringify(["cors_request", "abc"]), method: "POST"});
    console.log(cors_request);

}