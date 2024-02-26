document.addEventListener("DOMContentLoaded", function () {
  const checkoutContainer = document.getElementById("checkout-container");
  const totalContainer = document.getElementById("total-container");

  // Retrieve cart data from local storage
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Display each item in the cart
  cart.forEach((item) => {
    const itemElement = createCartItemElement(item);
    checkoutContainer.appendChild(itemElement);
  });

  // Display summary
  displaySummary(cart);

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
    quantity.value = item.quantity || 1;
    quantity.addEventListener("input", function () {
      item.quantity = parseInt(quantity.value, 10);
      updateCart(cart);
      displaySummary(cart);
    });

    const size = document.createElement("p");
    size.textContent = `Size: ${item.size || "N/A"}`;

    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.addEventListener("click", function () {
      const itemIndex = cart.findIndex((cartItem) => cartItem === item);
      if (itemIndex !== -1) {
        cart.splice(itemIndex, 1);
        updateCart(cart);
        displaySummary(cart);
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

    cart.forEach((item) => {
      const itemTotal = item.price * (item.quantity || 1);
      totalPrice += itemTotal;
    });

    if (totalContainer) {
      totalContainer.innerHTML = "";

      const summaryTitle = document.createElement("h2");
      summaryTitle.textContent = "Order Summary";

      const summaryText = document.createElement("p");
      summaryText.textContent = `Total Price: $${totalPrice.toFixed(2)}`;

      totalContainer.appendChild(summaryTitle);
      totalContainer.appendChild(summaryText);

      // Check if the cart is empty for redirection
      if (cart.length === 0) {
        const emptyCartMessage = document.createElement("p");
        emptyCartMessage.textContent = "Your cart is empty.";
        totalContainer.appendChild(emptyCartMessage);
      } else {
        // Add "Buy Now" button with click event
        const buyNowButton = createBuyNowButton();
        buyNowButton.addEventListener("click", function () {
          if (cart.length > 0) {
            window.location.href = "confirmation.html";
            localStorage.setItem("purchasedItems", JSON.stringify(cart));
          } else {
            console.log("Cart is empty. No redirection.");
          }
        });
        totalContainer.appendChild(buyNowButton);
      }
    } else {
      console.error("totalContainer is null or undefined");
    }
  }

  function createBuyNowButton() {
    const button = document.createElement("button");
    button.textContent = "Buy Now";
    return button;
  }
});
