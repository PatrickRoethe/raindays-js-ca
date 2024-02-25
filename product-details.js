// product-details.js
// This script fetches and displays detailed information for a specific product based on the product ID provided in the URL.

document.addEventListener("DOMContentLoaded", function () {
  // Select the container where product details will be displayed
  const productDetailsContainer = document.querySelector(
    ".product-details-container"
  );

  // Extract product ID from the URL
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");

  // Fetch detailed information for the specific product from the API endpoint
  fetch(`https://api.noroff.dev/api/v1/rainy-days/${productId}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((product) => {
      // Display product details in the container
      const productDetails = createProductDetails(product);
      productDetailsContainer.appendChild(productDetails);
    })
    .catch((error) => {
      console.error("Error fetching product details:", error);
    });

  // Function to create HTML elements for product details
  function createProductDetails(product) {
    const detailsContainer = document.createElement("div");

    const image = document.createElement("img");
    image.src = product.image || "placeholder-image.jpg";
    image.alt = product.title;

    const title = document.createElement("h2");
    title.textContent = product.title || "Product Name N/A";

    const description = document.createElement("p");
    description.textContent = product.description || "No description available";

    const price = document.createElement("p");
    price.textContent = `Price: $${product.price || "N/A"}`;

    const addToCartButton = document.createElement("button");
    addToCartButton.textContent = "Add to Cart";

    addToCartButton.addEventListener("click", function () {
      console.log(
        `Product added to cart: ${product.title || "Unnamed Product"}`
      );
      // You can add the product to the cart locally or perform other actions
    });

    detailsContainer.appendChild(image);
    detailsContainer.appendChild(title);
    detailsContainer.appendChild(description); // Include description here
    detailsContainer.appendChild(price);
    detailsContainer.appendChild(addToCartButton);

    return detailsContainer;
  }
});
