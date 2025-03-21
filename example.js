(() => {
    function addButtonsToMessages() {
        document.querySelectorAll("h3").forEach(username => {
            const messageContainer = username.closest("li");

            if (messageContainer && !messageContainer.dataset.buttonAdded) {
                // Create the 🗿 button
                const button = document.createElement("button");
                button.innerText = "🗿";
                button.className = "user-id-button";
                button.style.background = "none";
                button.style.border = "none";
                button.style.cursor = "pointer";
                button.style.fontSize = "16px";
                button.style.marginLeft = "5px";

                // Button click event
                button.onclick = () => {
                    alert("This person is skibidi");
                };

                // Append button next to the username
                username.appendChild(button);
                messageContainer.dataset.buttonAdded = "true"; // Mark as processed
            }
        });
    }

    setInterval(addButtonsToMessages, 2000); // Run every 2 seconds to handle new messages
})();
