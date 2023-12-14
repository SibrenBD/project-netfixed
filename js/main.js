const itemHolder = document.querySelector("")
let counter = 20;

const anime = {
    items: {
        img: "https://gogocdn.net/cover/kage-no-jitsuryokusha-ni-naritakute-1664388804.png",
        title: "eminence in shadow",
        episodes: "24"
    }
}

// fetch data

fetch("json/animes.json")
    .then((response) => response.json())
    .then((myData) => {
        console.log(myData);
    })

// for loop for the cards 
for (let index = 0; index < array.length; index++) {
    
}