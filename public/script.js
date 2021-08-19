document.addEventListener("click", async () => {

    const response = await fetch("/.netlify/functions/login").then(response => response.json)

});