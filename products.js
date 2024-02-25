// product.js

document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");

  // Fetch data for the specific product using the product ID
  fetch(`https://api.noroff.dev/api/v1/rainy-days/${productId}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((product) => {
      // Update the product details on the page
      document.getElementById("product-title").textContent =
        product.title || "Product Name N/A";
      document.getElementById("product-price").textContent = `Price: $${
        product.price || "N/A"
      }`;
      document.getElementById("product-image").src =
        product.image || "placeholder-image.jpg";

      // Handle "Add to Cart" button click
      document
        .getElementById("add-to-cart")
        .addEventListener("click", function () {
          console.log(
            `Product added to cart: ${product.title || "Unnamed Product"}`
          );
        });
    })
    .catch((error) => {
      console.error("Error fetching product details:", error);
    });
});
