// product-details.js
document.addEventListener("DOMContentLoaded", function () {
  const productDetailsContainer = document.querySelector(
    ".product-details-container"
  );

  // Extract product ID from the URL
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");

  // Fetch detailed information for the specific product
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

  function createProductDetails(product) {
    const detailsContainer = document.createElement("div");

    const image = document.createElement("img");
    image.src = product.image || "placeholder-image.jpg";
    image.alt = product.title;

    const title = document.createElement("h2");
    title.textContent = product.title || "Product Name N/A";

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
    detailsContainer.appendChild(price);
    detailsContainer.appendChild(addToCartButton);

    return detailsContainer;
  }
});
