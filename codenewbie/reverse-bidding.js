document.addEventListener("DOMContentLoaded", function () {
    const bidButtons = document.querySelectorAll('.bid-button');

    bidButtons.forEach(button => {
        button.addEventListener('click', function () {
            const item = this.getAttribute('data-item');
            const input = document.querySelector(`.bid-input[data-item="${item}"]`);
            const currentBidElement = document.querySelector(`.current-bid[data-item="${item}"]`);
            const currentBid = parseInt(currentBidElement.textContent.replace('₹', ''));

            const newBid = parseInt(input.value);

            if (isNaN(newBid) || newBid <= currentBid) {
                alert("Your bid must be higher than the current best bid.");
                return;
            }

            // Update the current bid
            currentBidElement.textContent = `₹${newBid}`;
            input.value = ''; // Clear the input
            document.getElementById("message").textContent = `✅ Your bid of ₹${newBid} for ${item} has been placed!`;
        });
    });
});