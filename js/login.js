    //   Login form



    document.addEventListener('DOMContentLoaded', function () {
        document.querySelector('.login-form').addEventListener('submit', function (event) {
            event.preventDefault();
            
            let username = document.querySelector('.login-form input[type="text"]').value;
            let password = document.querySelector('.login-form input[type="password"]').value;
    
            if (username === 'Admin' && password === 'Admin') {
                alert("Welcome Admin");
                window.location.href = 'landing-page.html';
            } else {
                alert('Invalid username or password');
            }
        });
    });