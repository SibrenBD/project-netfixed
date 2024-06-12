// recommandations_Container
let slideIndex = 0;
showSlides(slideIndex);

function showSlides(n) {
    let slides = document.getElementsByClassName("slide");
    
    if (n >= slides.length) {
        slideIndex = 0;
    } else if (n < 0) {
        slideIndex = slides.length - 1;
    } else {
        slideIndex = n;
    }
    
    // Hide all slides
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    
    // Show the current slide
    slides[slideIndex].style.display = "block";
}

// Function to change slides
function plusSlides(n) {
    showSlides(slideIndex + n);
}

// Add event listeners to buttons
document.querySelector(".prev").addEventListener("click", function() {
    plusSlides(-1);
});

document.querySelector(".next").addEventListener("click", function() {
    plusSlides(1);
});

// Automatically change slides every 12 seconds
setInterval(function() {
    plusSlides(1);
}, 12000);


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
