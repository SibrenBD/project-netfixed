const loginButton = document.querySelector('.login-configuration');
const usernameField = document.querySelector(".login-username");
const passwordField = document.querySelector('.login-password');

loginButton.addEventListener('click', function () {
    usernameField.style.borderBottom = 'none';
    passwordField.style.borderBottom = 'none';
    //post fetch to webservice 
    (async () => {
        const rawResponse = await fetch('/authenticate', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: usernameField.value, password: passwordField.value })
        });
        const content = await rawResponse.json();
        console.log(content);
        if (content.success) {
            alert("you've logged in :)");
            window.open("http://localhost:3000/#");
        } else if(content.success == false){
            passwordField.classList.add('red');
            alert('Logging in failed');
        }
        
        else {
            for (let i = 0; i < content.details.body.length; i++) {

                if (content.details.body[i].context.label == 'username') {
                    usernameField.style.borderBottom = '2px solid red'
                }
                
                if (content.details.body[i].context.label == 'password') {
                    passwordField.style.borderBottom = '2px solid red'
                }
            }
        }
    })();
});