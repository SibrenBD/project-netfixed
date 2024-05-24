const registerButton = document.querySelector('.register-configuration');
const registerUsernameField = document.querySelector(".register-username");
const registerEmailField = document.querySelector('.register-email');
const registerPasswordField = document.querySelector('.register-password');

//switch system

function switchToLogin() {
    document.querySelector('.register-form').style.display = 'none';
    document.querySelector('.login-form').style.display = 'block';
}

registerButton.addEventListener('click', function () {
    registerUsernameField.style.borderBottom = 'none';
    registerEmailField.style.borderBottom = 'none';
    registerPasswordField.style.border = 'none';
    //post fetch to webservice 
    (async () => {
        const rawResponse = await fetch('/register', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: registerUsernameField.value, email: registerEmailField.value, password: registerPasswordField.value })
        });
        const content = await rawResponse.json();
        console.log(content);
        if (content.success) {
            switchToLogin();
        } else {
            for (let i = 0; i < content.details.body.length; i++) {

                if (content.details.body[i].context.label == 'username') {
                    registerUsernameField.style.borderBottom = '2px solid red';
                }
                if (content.details.body[i].context.label == 'email') {
                    registerEmailField.style.borderBottom = '2px solid red'
                }
                if (content.details.body[i].context.label == 'password') {
                    registerPasswordField.style.borderBottom = '2px solid red'
                }
            }
        }
    })();
});