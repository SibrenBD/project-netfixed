let counter = 20;

const items = document.querySelector(".items");

// fetch data

fetch("json/animes.json")
    .then((response) => response.json())
    .then((myData) => {
        items.innerHTML += `
        <div class="item">
            <img src="${myData.shows[0].img}">
            <p class="name">${myData.shows[0].title}</p>
            <p class="episode">${myData.shows[0].episodes}</p>
        </div>`
    })

// for loop for the cards 
// for (let index = 0; index < array.length; index++) {
    
// }