document.addEventListener("DOMContentLoaded", function () {
  const checkoutContainer = document.getElementById("checkout-container");
  const totalContainer = document.getElementById("total-container");
  const buyNowButton = document.createElement("button");

  // Retrieve cart data from local storage
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Display each item in the cart
  cart.forEach((item) => {
    const itemElement = createCartItemElement(item);
    checkoutContainer.appendChild(itemElement);
  });

  // Display summary
  displaySummary(cart);

  // Create Buy Now button
  buyNowButton.textContent = "Buy Now";
  buyNowButton.addEventListener("click", function () {
    // Redirect to the checkout form page (confirmation.html)
    window.location.href = "confirmation.html";

    // Save purchased items in local storage
    localStorage.setItem("purchasedItems", JSON.stringify(cart));
  });

  // Append Buy Now button
  totalContainer.appendChild(buyNowButton);

  function createCartItemElement(item) {
    const itemContainer = document.createElement("div");
    itemContainer.classList.add("checkout-item");

    const image = document.createElement("img");
    image.src = item.image || "placeholder-image.jpg";
    image.alt = item.title;

    const title = document.createElement("h3");
    title.textContent = item.title || "Product Name N/A";

    const price = document.createElement("p");
    price.textContent = `Price: $${(item.price || 0).toFixed(2)}`;

    const quantity = document.createElement("input");
    quantity.type = "number";
    quantity.value = item.quantity || 1; // Default quantity, set dynamically
    quantity.addEventListener("input", function () {
      // Update quantity in cart
      item.quantity = parseInt(quantity.value, 10);
      updateCart(cart);
      // Update summary
      displaySummary(cart);
    });

    const size = document.createElement("p");
    size.textContent = `Size: ${item.size || "N/A"}`;

    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.addEventListener("click", function () {
      // Remove the item from the cart array
      const itemIndex = cart.findIndex((cartItem) => cartItem === item);
      if (itemIndex !== -1) {
        cart.splice(itemIndex, 1);
        updateCart(cart);
        displaySummary(cart);
        // Remove the item element from the DOM
        checkoutContainer.removeChild(itemContainer);
      }
    });

    itemContainer.appendChild(image);
    itemContainer.appendChild(title);
    itemContainer.appendChild(price);
    itemContainer.appendChild(quantity);
    itemContainer.appendChild(size);
    itemContainer.appendChild(removeButton);

    return itemContainer;
  }

  function updateCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  function displaySummary(cart) {
    let totalPrice = 0;

    // Display each item's price in the summary
    cart.forEach((item) => {
      const itemTotal = item.price * (item.quantity || 1);
      totalPrice += itemTotal;
    });

    // Check if totalContainer is not null before manipulation
    if (totalContainer) {
      // Clear previous summary
      totalContainer.innerHTML = "";

      const summaryTitle = document.createElement("h2");
      summaryTitle.textContent = "Order Summary";

      const summaryText = document.createElement("p");
      summaryText.textContent = `Total Price: $${totalPrice.toFixed(2)}`;

      totalContainer.appendChild(summaryTitle);
      totalContainer.appendChild(summaryText);
    } else {
      console.error("totalContainer is null or undefined");
    }
  }
});
