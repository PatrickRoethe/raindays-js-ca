document.addEventListener("DOMContentLoaded", function () {
  const productContainer = document.querySelector(".product-list");
  let allProducts = []; // Keep track of all products

  // Fetch all products initially
  fetchProducts();

  // Fetch data from the API endpoint
  function fetchProducts() {
    const apiUrl =
      "https://api.noroff.dev/api/v1/rainy-days?fbclid=IwAR1PS1asZ9KDVImz6AJ0AiLYAyvqOwMHb7RcLdFEd-rIoIrMuhdwON1d7-k";

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((products) => {
        allProducts = products; // Store all products
        displayProducts(allProducts); // Display all products initially
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }

  // Handle search button click
  const searchButton = document.getElementById("searchButton");
  searchButton.addEventListener("click", function () {
    const searchInput = document.getElementById("searchInput");
    const gender = searchInput.value.trim().toLowerCase();
    const filteredProducts = filterProductsByGender(allProducts, gender);
    displayProducts(filteredProducts);
  });

  function filterProductsByGender(products, gender) {
    return products.filter((product) => {
      // Check if the product's gender matches the entered gender
      if (gender === "male" || gender === "female") {
        return product.gender && product.gender.toLowerCase() === gender;
      } else {
        return true; // Show all products for other gender inputs
      }
    });
  }

  function displayProducts(products) {
    // Clear existing products
    productContainer.innerHTML = "";

    // Iterate through the products and create product cards
    products.forEach((product) => {
      const productCard = createProductCard(product);
      productContainer.appendChild(productCard);
    });
  }

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
