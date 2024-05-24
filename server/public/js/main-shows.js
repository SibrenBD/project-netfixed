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
    setTimeout(carousel, 5000); // Change image every 5 seconds
}

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

        // Loop through object properties
        // Object.keys(myData).forEach((animeKey) => {
        //     const anime = myData[animeKey];

        for (let i = 0; i < myData.length; i++) {
            const anime = myData[i];
            if (i > 0) {

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
// });


//   login authenticator
let config = document.querySelector(".configuration")
document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('.login-form').addEventListener('submit', function (event) {
        event.preventDefault();

        let username = document.querySelector('.login-form input[type="text"]').value;
        let password = document.querySelector('.login-form input[type="password"]').value;

        if (username === 'Admin' && password === 'Admin') {
            config.textContent = "Loged in";
            setInterval(function () {
                executed = true;
                off()
                return;
            }, 2000)
            window.open("./Modernize-1.0.0/src/html/index.html");
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

// Register
function switchToRegister() {
    document.querySelector('.login-form').style.display = 'none';
    document.querySelector('.register-form').style.display = 'block';
}

function switchToLogin() {
    document.querySelector('.register-form').style.display = 'none';
    document.querySelector('.login-form').style.display = 'block';
}

console.log('register loaded');

const registerButton = document.querySelector('.register-configuration');
const usernameField = document.querySelector('.register-username')
const emailField = document.querySelector('.register-email');
const passwordField = document.querySelector('.register-password');

registerButton.addEventListener('click', function () {
    emailField.classList.remove('red');
    passwordField.classList.remove('red');
    //post fetch to webservice 
    (async () => {
        const rawResponse = await fetch('/register', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: emailField.value, password: passwordField.value })
        });
        const content = await rawResponse.json();
        console.log(content);
        if (content.success) {
            switchToLogin();
        } else {
            for (let i = 0; i < content.details.body.length; i++) {
                if (content.details.body[i].context.label == 'username') {
                    usernameField.style.borderBottom =  '2px solid red'
                }
                
                if (content.details.body[i].context.label == 'email') {
                    emailField.style.borderBottom =  '2px solid red'
                }
                if (content.details.body[i].context.label == 'password') {
                    passwordField.style.borderBottom =  '2px solid red'
                }
            }
        }
    })();
});


