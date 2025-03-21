(() => {
    // A helper function to create and manage the loading/unloading of scripts
    function manageScript(url, action) {
        let scriptTag = document.querySelector(`script[data-src="${url}"]`);
        
        if (action === 'load') {
            // If the script is not already added, create and append it
            if (!scriptTag) {
                scriptTag = document.createElement("script");
                scriptTag.src = url;
                scriptTag.dataset.src = url; // Track this specific script by its URL
                scriptTag.onload = () => {
                    console.log(`Script loaded from: ${url}`);
                };
                scriptTag.onerror = () => {
                    console.error(`Failed to load script from: ${url}`);
                };
                document.body.appendChild(scriptTag); // Append the script tag to the document body
            }
        } else if (action === 'remove' && scriptTag) {
            // If the script is already in the DOM, remove it
            scriptTag.remove();
            console.log(`Script removed from: ${url}`);
        }
    }

    function createJsAddonsScreen() {
        let existingScreen = document.getElementById("jsaddons-screen");
        if (existingScreen) {
            existingScreen.style.display = "flex";
            return;
        }

        // Create the overlay screen with Discord-like styling
        const screen = document.createElement("div");
        screen.id = "jsaddons-screen";
        screen.style.position = "fixed";
        screen.style.top = "0";
        screen.style.left = "0";
        screen.style.width = "100vw";
        screen.style.height = "100vh";
        screen.style.background = "rgba(30, 30, 30, 0.9)";
        screen.style.color = "#DCDDDE";
        screen.style.display = "flex";
        screen.style.flexDirection = "column";
        screen.style.alignItems = "center";
        screen.style.justifyContent = "center";
        screen.style.zIndex = "1000";
        screen.style.fontFamily = "'Whitney', sans-serif";

        // Create close button with Discord-style
        const closeButton = document.createElement("button");
        closeButton.innerText = "Close";
        closeButton.style.background = "#7289da";
        closeButton.style.color = "white";
        closeButton.style.marginBottom = "20px";
        closeButton.style.padding = "10px 20px";
        closeButton.style.border = "none";
        closeButton.style.borderRadius = "5px";
        closeButton.style.cursor = "pointer";
        closeButton.style.fontSize = "16px";
        closeButton.addEventListener("click", () => {
            const addonItems = document.querySelectorAll("#addons-list li");
            addonItems.forEach((li) => {
                const checkbox = li.querySelector("input[type='checkbox']");
                const scriptUrl = li.getAttribute('data-script-url'); // Store script URL for dynamic loading

                if (checkbox && checkbox.checked) {
                    // Load the script if checkbox is checked
                    manageScript(scriptUrl, 'load');
                } else {
                    // Remove the script if checkbox is unchecked
                    manageScript(scriptUrl, 'remove');
                }
            });
            screen.style.display = "none";
        });
        screen.appendChild(closeButton);

        // Create file input
        const fileInput = document.createElement("input");
        fileInput.type = "file";
        fileInput.accept = ".js";
        fileInput.style.marginBottom = "20px";
        fileInput.style.background = "#2f3136";
        fileInput.style.border = "1px solid #7289da";
        fileInput.style.padding = "10px";
        fileInput.style.borderRadius = "5px";
        fileInput.style.color = "#DCDDDE";
        screen.appendChild(fileInput);

        // Create addon list
        const addonsList = document.createElement("ul");
        addonsList.id = "addons-list";
        screen.appendChild(addonsList);

        // Handle file upload
        fileInput.addEventListener("change", (event) => {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const scriptUrl = URL.createObjectURL(new Blob([e.target.result], { type: "application/javascript" }));

                    // Add to list
                    const li = document.createElement("li");
                    li.style.marginBottom = "10px";
                    li.textContent = file.name;
                    li.setAttribute('data-script-url', scriptUrl); // Store the script URL for future use
                    const toggle = document.createElement("input");
                    toggle.type = "checkbox";
                    toggle.checked = true;
                    toggle.style.marginLeft = "10px";
                    toggle.addEventListener("change", () => {
                        if (toggle.checked) {
                            manageScript(scriptUrl, 'load');
                        } else {
                            manageScript(scriptUrl, 'remove');
                        }
                    });
                    li.appendChild(toggle);
                    addonsList.appendChild(li);

                    // If the checkbox is checked, load the script immediately
                    if (toggle.checked) {
                        manageScript(scriptUrl, 'load');
                    }
                };
                reader.readAsText(file);
            }
        });

        document.body.appendChild(screen);
    }

    // Create floating button with Discord-like style
    function createFloatingButton() {
        let existingButton = document.getElementById("jsaddons-button");
        if (existingButton) return;

        const button = document.createElement("button");
        button.id = "jsaddons-button";
        button.innerText = "JS Addons";
        button.style.position = "fixed";
        button.style.right = "20px";
        button.style.bottom = "20px";
        button.style.padding = "10px 20px";
        button.style.background = "#7289da";
        button.style.color = "white";
        button.style.border = "none";
        button.style.borderRadius = "5px";
        button.style.cursor = "pointer";
        button.style.fontSize = "16px";
        button.style.zIndex = "1001";
        button.addEventListener("click", createJsAddonsScreen);
        document.body.appendChild(button);
    }

    // Create the floating button on script load
    createFloatingButton();
})();
