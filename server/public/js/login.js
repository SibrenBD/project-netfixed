const loginButton = document.querySelector('.login-configuration');
const usernameField = document.querySelector(".login-username");
const passwordField = document.querySelector('.login-password');

loginButton.addEventListener('click', function () {
    usernameField.style.borderBottom = '2px solid var(--text-color)';
    passwordField.style.borderBottom = '2px solid var(--text-color)';
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
            alert(username, "welcome :)");
            window.open("http://localhost:3000/users");
        } else if(content.success == false){
            alert('Logging in failed');
            usernameField.style.borderBottom = '2px solid red'
            passwordField.style.borderBottom = '2px solid red'
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