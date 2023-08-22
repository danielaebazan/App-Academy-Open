document.addEventListener("DOMContentLoaded", function () {
    const addButton = document.getElementById("add");
    const shoppingList = document.getElementById("shopping-list");
    const nameInput = document.getElementById("name");
    const typeSelect = document.getElementById("type");

    addButton.addEventListener("click", function (event) {
        event.preventDefault();

        const itemName = nameInput.value;
        const itemType = typeSelect.value;

        if (itemName.trim() !== "") {
            const listItem = document.createElement("li");
            listItem.textContent = itemName;
            listItem.setAttribute("data-type", itemType);

            shoppingList.appendChild(listItem);
            nameInput.value = ""; // Clear input field
        }
    });
});
