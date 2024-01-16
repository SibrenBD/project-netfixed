    //   Login form


    let config = document.querySelector(".configuration")
    document.addEventListener('DOMContentLoaded', function () {
        document.querySelector('.login-form').addEventListener('submit', function (event) {
            event.preventDefault();
            
            let username = document.querySelector('.login-form input[type="text"]').value;
            let password = document.querySelector('.login-form input[type="password"]').value;
    
            if (username === 'Admin' && password === 'Admin') {
                config.textContent = "Loged in";
                setInterval(function() {
                   window.open("landing-page.html", "_self") 
                }, 3000)
            } else {
                config.textContent = "Invalid username or password";
            }
        });
    });