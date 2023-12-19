const items = document.querySelector(".items");

// fetch data animes
fetch("json/animes.json")
    .then((response) => response.json())
    .then((myData) => {
        console.log(myData);
        // Search Input
        const input = document.getElementById('keyword');
        const searchBox = document.querySelector(".items")
        const searchItem = document.querySelectorAll(".item")
        const filter = document.querySelector(".name")

        // Loop through object properties
        Object.keys(myData).forEach((animeKey) => {
            const anime = myData[animeKey];

            items.innerHTML += `
                <div class="item">
                <a href="${anime.page}">
                    <img src="${anime.img}">
                    <p class="name">${anime.title}</a></p>
                    <p class="episode">episodes: ${anime.episodes}</p>
                </div>`;
        });
    });

// fetch data movies

fetch("json/movies.json")
    .then((response) => response.json())
    .then((myData) => {
        console.log(myData);
    })