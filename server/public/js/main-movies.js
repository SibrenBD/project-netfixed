// recommandationsContainer
let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function showSlides(n) {
  let i;
  const slides = document.getElementsByClassName("slide");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  slides[slideIndex-1].style.display = "block";
}

function searchItems() {
    const searchInput = document.getElementById('keyword').value.toLowerCase();
    searchInSection('animeItems', searchInput);
  }
  
  function searchInSection(sectionId, searchInput) {
    const items = document.getElementById(sectionId).querySelectorAll('.item');

    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const itemName = item.querySelector('.name');
        const itemNameText = itemName.textContent.toLowerCase();

        if (searchInput === "") {
            item.style.display = '';
        } else {
            if (itemNameText.includes(searchInput)) {
                itemName.classList.add('uppercase');
                item.style.display = '';
            } else {
                itemName.classList.remove('uppercase');
                item.style.display = 'none';
            }
        }
    }
}

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

        const keys = Object.keys(myData);

        for (let i = 0; i < keys.length; i++) {
            const movieKey = keys[i];
            const movie = myData[movieKey];

            items.innerHTML += `
                <div class="item">
                    <a href="${movie.page}">
                        <img src="${movie.img}">
                        <p class="name">${movie.title}</a></p>
                        <p class="episode">episodes: ${movie.episodes}</p>
                    </div>`;
        }
    });

        //   login authenticator
        let config = document.querySelector(".configuration")
        document.addEventListener('DOMContentLoaded', function () {
            document.querySelector('.login-form').addEventListener('submit', function (event) {
                event.preventDefault();
                
                let username = document.querySelector('.login-form input[type="text"]').value;
                let password = document.querySelector('.login-form input[type="password"]').value;
        
                if (username === 'Admin' && password === 'Admin') {
                    config.textContent = "Loged in";
                    setInterval(function() {
                        executed = true;
                       off()
                       return; 
                    }, 2000)
                    window.open("Modernize-1.0.0/src/html/index.html");
                } else {
                    config.textContent = "Invalid username or password";
                }
            });
        });

    // login form
    function on() {
        document.querySelector(".overlay").style.display = "block";
      }
      
      function off() {
        document.querySelector(".overlay").style.display = "none";
      }