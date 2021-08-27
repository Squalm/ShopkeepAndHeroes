// eslint-disable-next-line no-unused-vars
async function onSubmitItem() {

    // Submit the item to the database by invoking the function
    const request_url = "../.netlify/functions/text_checks/text_checks";
    document.getElementById("itemTitle").value = fetch(request_url, {
            body: JSON.stringify(document.getElementById("itemInput").value),
            method: "PSOT"
        }).then((response) => {
        return response.json()
    });

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