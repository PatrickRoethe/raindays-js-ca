document.addEventListener("DOMContentLoaded", function () {
  const productContainer = document.querySelector(".product-list");

  // Fetch data from the API endpoint
  fetch(
    "https://api.noroff.dev/api/v1/rainy-days?fbclid=IwAR1PS1asZ9KDVImz6AJ0AiLYAyvqOwMHb7RcLdFEd-rIoIrMuhdwON1d7-k"
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((products) => {
      // Iterate through the products and create product cards
      products.forEach((product) => {
        const productCard = createProductCard(product);
        productContainer.appendChild(productCard);
      });
    })
    .catch((error) => {
      console.error("Error fetching products:", error);
    });

  function createProductCard(product) {
    const card = document.createElement("div");
    card.classList.add("product-card");

    const image = document.createElement("img");
    image.src = product.image || "placeholder-image.jpg";
    image.alt = product.title;

    const title = document.createElement("h2");
    title.textContent = product.title || "Product Name N/A";

    const price = document.createElement("p");
    price.textContent = `Price: $${product.price || "N/A"}`;

    const detailsButton = document.createElement("button");
    detailsButton.textContent = "View Details";

    detailsButton.addEventListener("click", function () {
      // Navigate to product details page
      window.location.href = `./product-details.html?id=${product.id}`;
    });

    card.appendChild(image);
    card.appendChild(title);
    card.appendChild(price);
    card.appendChild(detailsButton);

    return card;
  }
});
