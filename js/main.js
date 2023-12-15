const items = document.querySelector(".items");

// fetch data
fetch("json/animes.json")
    .then((response) => response.json())
    .then((myData) => {
        console.log(myData);

        // Loop through object properties
        Object.keys(myData.shows).forEach((animeKey) => {
            const anime = myData.shows[animeKey];

            items.innerHTML += `
                <div class="item">
                <a href="${anime.page}">
                    <img src="${anime.img}">
                    <p class="name">${anime.title}</a></p>
                    <p class="episode">episodes: ${anime.episodes}</p>
                </div>`;
        });
    });
