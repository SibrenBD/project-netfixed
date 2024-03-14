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
  fetch("json/new.json")
      .then((response) => response.json())
      .then((myData) => {
          const animeItems = document.getElementById('animeItems');

          Object.keys(myData).forEach((animeKey) => {
              const anime = myData[animeKey];

              animeItems.innerHTML += `
                  <div class="item">
                    <a href="${anime.page}">
                      <img src="${anime.img}" alt="${anime.title}">
                      <p class="name">${anime.dubtitle}</p></a>
                      <p class="episode">episodes: ${anime.episodes}</p>
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
                window.open("Modernize-1.0.0/src/html/index.html");
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

// fetch
      fetch("")
  .then((response) => response.json())
  .then((animelist) => console.log(animelist));