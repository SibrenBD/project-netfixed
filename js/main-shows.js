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

const dub = document.querySelector(".dub");
const sub = document.querySelector(".sub");

// fetch data animes
fetch("json/animes.json")
  .then((response) => response.json())
  .then((myData) => {
    const animeItems = document.getElementById('animeItems');

    // Function to render anime items based on type (sub or dub)
    function renderAnimeItems(animeType) {
      // Clear existing items
      animeItems.innerHTML = "";

      // Render items based on the selected type
      Object.keys(myData).forEach((animeKey) => {
        const anime = myData[animeKey];
        const title = animeType === 'sub' ? anime.subtitle : anime.dubtitle;

        if (title) {
          animeItems.innerHTML += `
            <div class="item">
              <a href="${anime.page}">
                <img src="${anime.img}" alt="${anime.title}">
                <p class="name">${title}</p></a>
                <p class="episode">episodes: ${anime.episodes}</p>
            </div>`;
        }
      });
    }

    // Initial rendering (both dub and sub)
    renderAnimeItems('sub');

    // Event listener for sub button
    sub.addEventListener("click", function() {
      renderAnimeItems('sub');
    });

    // Event listener for dub button
    dub.addEventListener("click", function() {
      renderAnimeItems('dub');
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