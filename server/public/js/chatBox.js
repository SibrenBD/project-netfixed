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
            messageDiv.textContent = message;

            // Toggle message alignment
            if (chatBox.querySelectorAll('.message').length % 2 === 0) {
                messageDiv.classList.add("message__bubble");
            } else {
                messageDiv.classList.add("message__bubble_alt");
            }

            const messageContainer = document.createElement("div");
            messageContainer.classList.add("message");
            messageContainer.appendChild(messageDiv);
            chatBox.appendChild(messageContainer);
            chatBox.scrollTop = chatBox.scrollHeight;
            userInput.value = "";
        }
    }

    userInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            sendMessage();
        }
    });
});
