// confirmation.js

document.addEventListener("DOMContentLoaded", function () {
  // Retrieve cart data from local storage
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Display purchased items and total amount
  const orderSummarySection = document.getElementById("order-summary");
  const totalAmount = displayPurchasedItems(orderSummarySection, cart);

  // Add user information form
  const userInformationSection = document.getElementById("user-information");
  addUserInformationForm(userInformationSection, totalAmount);
});

function displayPurchasedItems(container, cart) {
  if (!container) {
    console.error("Container not found for displaying purchased items");
    return;
  }

  container.innerHTML = "<h2>Purchased Items</h2>";

  let totalPrice = 0;

  // Loop through the cart and display each item
  cart.forEach((item) => {
    const itemElement = createPurchasedItemElement(item);
    container.appendChild(itemElement);

    // Calculate total price
    const itemTotal = item.price * (item.quantity || 1);
    totalPrice += itemTotal;
  });

  // Display total amount (summary)
  const totalAmountElement = document.createElement("p");
  totalAmountElement.textContent = `Total Amount: $${totalPrice.toFixed(2)}`;
  container.appendChild(totalAmountElement);

  return totalPrice;
}

function createPurchasedItemElement(item) {
  const itemElement = document.createElement("div");
  itemElement.classList.add("purchased-item");

  const title = createConfirmationTitle(item);
  const price = createPriceElement(item.price);
  const image = createImageElement(item.image, item.title);

  itemElement.appendChild(title);
  itemElement.appendChild(price);
  itemElement.appendChild(image);

  // Add more details as needed (size, quantity, etc.)

  return itemElement;
}

function createConfirmationTitle(item) {
  const title = document.createElement("h3");
  title.textContent = item.title || "Product Name N/A";
  return title;
}

function createPriceElement(itemPrice) {
  const price = document.createElement("p");
  price.textContent = `Price: $${(itemPrice || 0).toFixed(2)}`;
  return price;
}

function createImageElement(imageSource, altText) {
  const image = document.createElement("img");
  image.src = imageSource || "placeholder-image.jpg";
  image.alt = altText;
  image.style.width = "70px";
  return image;
}

function addUserInformationForm(container, totalAmount) {
  if (!container) {
    console.error("Container not found for adding user information form");
    return;
  }

  container.innerHTML = "<h2>User Information</h2>";

  // Example: Add more form fields for address, city, credit card, expiry, and cvv
  const nameLabel = createFormElement("Name", "text", "name", true);
  const addressLabel = createFormElement("Address", "text", "address", true);
  const cityLabel = createFormElement("City", "text", "city", true);
  const creditCardLabel = createFormElement(
    "Credit Card",
    "text",
    "creditCard",
    true
  );
  const expiryLabel = createFormElement("Expiry Date", "text", "expiry", true);
  const cvvLabel = createFormElement("CVV", "text", "cvv", true);

  // Append the input fields to the container
  container.appendChild(nameLabel);
  container.appendChild(addressLabel);
  container.appendChild(cityLabel);
  container.appendChild(creditCardLabel);
  container.appendChild(expiryLabel);
  container.appendChild(cvvLabel);

  // Add a submit button
  const submitButton = document.createElement("button");
  submitButton.textContent = "Submit";
  submitButton.addEventListener("click", function () {
    // Handle form submission logic here
    // For demonstration purposes, use a toast for confirmation
    showToast(
      "Order placed successfully! Thank you for shopping with us.",
      container
    );
  });

  container.appendChild(submitButton);
}

function createFormElement(labelText, inputType, inputId, isRequired) {
  const label = document.createElement("label");
  label.textContent = labelText + ":";

  const input = document.createElement("input");
  input.type = inputType;
  input.id = inputId;
  input.name = inputId;
  input.required = isRequired;

  const container = document.createElement("div");
  container.appendChild(label);
  container.appendChild(input);

  return container;
}

function showToast(message, detailsContainer) {
  const toast = document.createElement("div");
  toast.classList.add("toast");
  toast.textContent = message;
  detailsContainer.appendChild(toast);

  setTimeout(function () {
    toast.classList.add("show");
    setTimeout(function () {
      toast.classList.remove("show");
      setTimeout(function () {
        detailsContainer.removeChild(toast);
      }, 300); // Fade out duration
    }, 3000); // Toast display duration
  }, 10); // Delay for adding transition class
}
