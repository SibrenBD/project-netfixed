
fetch("json/animes.json")
    .then((response) => response.json())
    .then((json) => {
        console.log(json);
    })