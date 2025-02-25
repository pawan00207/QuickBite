document.addEventListener("DOMContentLoaded", function () {
    // Cart functionality
    const cart = [];
    const prices = {
        "Food Catering": 100,
        "Food Ordering": 50,
        "Bulk Ordering": 200
    };

    // Add to cart
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const itemName = button.parentElement.getAttribute('data-name');
            const existingItem = cart.find(item => item.name === itemName);

            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push({ name: itemName, quantity: 1 });
            }

            alert(`${itemName} added to the cart`);
            updateCart();
        });
    });

    // Update cart display
    function updateCart() {
        const cartList = document.getElementById('cart');
        const totalPriceElement = document.getElementById('totalPrice');
        cartList.innerHTML = '';
        let total = 0;

        cart.forEach((item, index) => {
            const li = document.createElement('li');
            li.textContent = `${item.name} x${item.quantity} - $${prices[item.name] * item.quantity}`;

            const increaseBtn = document.createElement('button');
            increaseBtn.textContent = '+';
            increaseBtn.classList.add('btn', 'btn-increase');
            increaseBtn.addEventListener('click', () => {
                item.quantity++;
                updateCart();
            });

            const decreaseBtn = document.createElement('button');
            decreaseBtn.textContent = '-';
            decreaseBtn.classList.add('btn', 'btn-decrease');
            decreaseBtn.addEventListener('click', () => {
                if (item.quantity > 1) {
                    item.quantity--;
                } else {
                    cart.splice(index, 1);
                }
                updateCart();
            });

            const removeBtn = document.createElement('button');
            removeBtn.textContent = 'Remove';
            removeBtn.classList.add('btn', 'btn-remove');
            removeBtn.addEventListener('click', () => {
                cart.splice(index, 1);
                updateCart();
            });

            li.appendChild(increaseBtn);
            li.appendChild(decreaseBtn);
            li.appendChild(removeBtn);
            cartList.appendChild(li);
            total += prices[item.name] * item.quantity;
        });

        totalPriceElement.textContent = `$${total}`;
    }

    // Order Now button functionality
    const orderNowBtn = document.getElementById('orderNowBtn');
    if (orderNowBtn) {
        orderNowBtn.addEventListener('click', () => {
            if (cart.length === 0) {
                alert('Your cart is empty. Please add items before placing an order.');
            } else {
                alert('Item placed successfully');
                cart.length = 0;
                updateCart();
            }
        });
    }

    // Chatbot functionality
    const chatbox = document.getElementById("chatbox");
    const userInputElement = document.getElementById("userInput");
    const sendButton = document.getElementById("sendButton");

    if (!chatbox || !userInputElement || !sendButton) {
        console.error("Error: Required elements are missing from the HTML.");
        return;
    }

    // Bot responses
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
        userInput = userInput.toLowerCase().trim();
        return responses[userInput] || "Sorry, I don't understand that. 😕";
    }

    function sendMessage() {
        const userInput = userInputElement.value.trim();
        if (userInput === "") return;

        console.log("User input:", userInput); // Debugging log

        // Append user message
        const userMessage = document.createElement("p");
        userMessage.innerHTML = `<b>You:</b> ${userInput}`;
        chatbox.appendChild(userMessage);

        // Get bot response
        const response = getResponse(userInput);
        console.log("Bot response:", response); // Debugging log

        // Append bot message
        const botMessage = document.createElement("p");
        botMessage.innerHTML = `<b>Bot:</b> ${response}`;
        chatbox.appendChild(botMessage);

        // Scroll to bottom
        chatbox.scrollTop = chatbox.scrollHeight;

        // Clear input field
        userInputElement.value = "";
    }

    sendButton.addEventListener("click", sendMessage);
    userInputElement.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            sendMessage();
        }
    });

    console.log("Chatbot initialized successfully."); // Debugging log
});

// Swap functionality
function submitSwap() {
    const unwantedItem = document.getElementById('unwanted-item').value;
    const wantedItem = document.getElementById('wanted-item').value;
    const message = document.getElementById('swap-message');

    if (unwantedItem === wantedItem) {
        message.innerText = "❗ You cannot swap an item for the same item.";
        message.style.color = "red";
    } else {
        message.innerText = `✅ Swap request placed: "${unwantedItem}" for "${wantedItem}".`;
        message.style.color = "green";
    }
}