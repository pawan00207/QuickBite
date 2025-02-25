// chatbot.js
document.addEventListener("DOMContentLoaded", function () {
    // Bot Responses
    const responses = {
        "hello": "Hi! How can I help you with food orders? 😊",
        "how are you": "I'm just a bot, but I'm doing great! How about you?",
        "pizza": "We have Pepperoni, Margherita, and BBQ Chicken pizza! 🍕",
        "burger": "Try our delicious Cheeseburger or Veggie Burger! 🍔",
        "pasta": "We serve Alfredo, Bolognese, and Pesto pasta! 🍝",
        "thank you": "You're welcome! Enjoy your meal! 🍽",
        "bye": "Goodbye! Have a great day! 👋"
    };

    function getResponse(userInput) {
        userInput = userInput.toLowerCase();
        return responses[userInput] || "Sorry, I don't understand that. 😕";
    }

    function sendMessage() {
        let chatbox = document.getElementById("chatbox");
        let userInput = document.getElementById("userInput").value;

        if (userInput.trim() === "") return;

        let response = getResponse(userInput);

        // Append user and bot messages to the chatbox
        chatbox.innerHTML += `<p><b>You:</b> ${userInput}</p>`;
        chatbox.innerHTML += `<p><b>Bot:</b> ${response}</p>`;

        // Clear input field
        document.getElementById("userInput").value = "";

        // Auto-scroll to latest message
        chatbox.scrollTop = chatbox.scrollHeight;
    }

    // Attach event listener to the Send button
    document.getElementById("sendButton").addEventListener("click", sendMessage);

    // Allow pressing Enter to send message
    document.getElementById("userInput").addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            sendMessage();
        }
    });
});
