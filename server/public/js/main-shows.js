// recommandations_Container
let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function showSlides(n) {
    let i;
    const slides = document.querySelectorAll(".slide");
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex - 1].style.display = "block";
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
    if (myIndex > x.length) { myIndex = 1 }
    x[myIndex - 1].style.display = "block";
    setTimeout(carousel, 5000); 
}

// menu
document.addEventListener('DOMContentLoaded', function () {
    const menuIcon = document.querySelector('.gg-menu');
    const overlayMenu = document.querySelector('.overlay-menu');
  
    // Toggle overlay menu when menu icon is clicked
    menuIcon.addEventListener('click', function () {
      overlayMenu.classList.toggle('open');
    });
  
    // Close overlay menu when clicked outside of it
    overlayMenu.addEventListener('click', function (event) {
      if (!event.target.closest('ul')) {
        overlayMenu.classList.remove('open');
      }
    });
  });

// searchInput
function searchItems() {
    const searchInput = document.getElementById('keyword').value.toLowerCase();
    searchInSection('anime', searchInput);
}

function searchInSection(sectionId, searchInput) {
    const items = document.getElementById(sectionId).querySelectorAll('.poster');

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
fetch("http://localhost:3000/animeSerie")
    .then((response) => response.json())
    .then((myData) => {
        const test = myData[0]
        console.log(test);
        const animePosters = document.getElementById('anime');

        for (let i = 0; i < myData.length; i++) {
            const anime = myData[i];
            if (i >= 0) {

            animePosters.innerHTML += `
            <div class="poster" id="${anime.id}">
                <a href="${anime.page}">
                    <img src="${anime.img}">
                    <p class="name">${anime.dubtitle}</p>
                    <p class="episode">episodes: ${anime.episodes}</p>
                </a>
            </div>`;
            }

        }


    });


//   Login Display pop up

function on() {
    document.querySelector(".overlay").style.display = "block";
}

function off() {
    document.querySelector(".overlay").style.display = "none";
}

// Register
function switchToRegister() {
    document.querySelector('.login-form').style.display = 'none';
    document.querySelector('.register-form').style.display = 'block';
}

function switchToLogin() {
    document.querySelector('.register-form').style.display = 'none';
    document.querySelector('.login-form').style.display = 'block';
}
