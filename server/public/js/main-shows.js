// recommandationsContainer
let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function showSlides(n) {
  let i;
  const slides = document.querySelectorAll(".slide");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  slides[slideIndex-1].style.display = "block";
}

var myIndex = 0;
carousel();

function carousel() {
  var i;
  var x = document.querySelectorAll(".slide");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";  
  }
  myIndex++;
  if (myIndex > x.length) {myIndex = 1}    
  x[myIndex-1].style.display = "block";  
  setTimeout(carousel, 5000); // Change image every 5 seconds
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

// fetch data animes
fetch("json/animes.json")
    .then((response) => response.json())
    .then((myData) => {
        console.log(myData);
        const animeItems = document.getElementById('animeItems');
        
        // Loop through object properties
        Object.keys(myData).forEach((animeKey) => {
            const anime = myData[animeKey];

            animeItems.innerHTML += `
            <div class="item" id="${anime.id}">
                <a href="${anime.page}">
                    <img src="${anime.img}">
                    <p class="name">${anime.dubtitle}</p>
                    <p class="episode">episodes: ${anime.episodes}</p>
                </a>
            </div>`;
        });
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
                window.open("./Modernize-1.0.0/src/html/index.html");
            } else {
                config.textContent = "Invalid username or password";
            }
        });
    });

    //   Login Display pop up

    function on() {
        document.querySelector(".overlay").style.display = "block";
      }
      
      function off() {
        document.querySelector(".overlay").style.display = "none";
      }