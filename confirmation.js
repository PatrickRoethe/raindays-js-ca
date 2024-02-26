// confirmation.js

document.addEventListener("DOMContentLoaded", function () {
  // Retrieve cart data from local storage
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Display purchased items
  const orderSummarySection = document.getElementById("order-summary");
  displayPurchasedItems(orderSummarySection, cart);

  // Add user information form
  const userInformationSection = document.getElementById("user-information");
  addUserInformationForm(userInformationSection);
});

function displayPurchasedItems(container, cart) {
  if (!container) {
    console.error("Container not found for displaying purchased items");
    return;
  }

  container.innerHTML = "<h2>Purchased Items</h2>";

  // Loop through the cart and display each item
  cart.forEach((item) => {
    const itemElement = createPurchasedItemElement(item);
    container.appendChild(itemElement);
  });
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

function addUserInformationForm(container) {
  if (!container) {
    console.error("Container not found for adding user information form");
    return;
  }

  container.innerHTML = "<h2>User Information</h2>";

  // Create and append your user information form elements here
  // Example: input fields for name, address, etc.
  // You can use the same approach as in your checkout form

  // Example:
  const nameLabel = document.createElement("label");
  nameLabel.textContent = "Name:";
  const nameInput = document.createElement("input");
  nameInput.type = "text";
  nameInput.id = "name";
  nameInput.name = "name";
  nameInput.required = true;

  // Append the input fields to the container
  container.appendChild(nameLabel);
  container.appendChild(nameInput);

  // Add more form elements as needed

  // Add a submit button
  const submitButton = document.createElement("button");
  submitButton.textContent = "Submit";
  submitButton.addEventListener("click", function () {
    // Handle form submission logic here
    alert("Form submitted successfully!");
  });

  container.appendChild(submitButton);
}
