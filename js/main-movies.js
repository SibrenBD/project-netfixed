const items = document.querySelector(".items");

let pageMovie = true;

// fetch data animes
fetch("json/animes.json")
    .then((response) => response.json())
    .then((myData) => {
        console.log(myData);
    });

// fetch data movies

fetch("json/movies.json")
    .then((response) => response.json())
    .then((myData) => {
        console.log(myData);

        // Loop through object properties
        Object.keys(myData).forEach((movieKey) => {
            const movie = myData[movieKey];

            items.innerHTML += `
                <div class="item">
                <a href="${movie.page}">
                    <img src="${movie.img}">
                    <p class="name">${movie.title}</a></p>
                    <p class="episode">episodes: ${movie.episodes}</p>
                </div>`;
        });
    })