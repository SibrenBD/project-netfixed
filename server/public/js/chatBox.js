document.addEventListener("DOMContentLoaded", function () {
    const chatBox = document.getElementById("chat-box");
    const userInput = document.getElementById("user-input");
    const sendBtn = document.getElementById("send-btn");

    sendBtn.addEventListener("click", function () {
        sendMessage();
    });

    function sendMessage() {
        const message = userInput.value.trim();
        if (message !== "") {
            const messageDiv = document.createElement("div");
            messageDiv.classList.add("message");
            messageDiv.textContent = message;
            chatBox.appendChild(messageDiv);
            chatBox.scrollTop = chatBox.scrollHeight;
            userInput.value = "";

            // Toggle message alignment
            if (chatBox.querySelectorAll('.message').length % 2 === 0) {
                messageDiv.classList.add("right-text");
            } else {
                messageDiv.classList.add("left-text");
            }
        }
    }

    userInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            sendMessage();
        }
    });
});