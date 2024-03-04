document.addEventListener("DOMContentLoaded", function () {
  const productDetailsContainer = document.querySelector(
    ".product-details-container"
  );

  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");

  fetch(`https://api.noroff.dev/api/v1/rainy-days/${productId}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((product) => {
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

    const description = document.createElement("p");
    description.textContent = product.description || "No description available";

    const price = document.createElement("p");
    price.textContent = `Price: $${product.price || "N/A"}`;

    const addToCartButton = document.createElement("button");
    addToCartButton.textContent = "Add to Cart";

    const sizeSelector = document.createElement("div");
    sizeSelector.className = "size-selector";

    if (product.sizes && product.sizes.length > 0) {
      product.sizes.forEach((size) => {
        const sizeButton = document.createElement("button");
        sizeButton.textContent = size;
        sizeButton.addEventListener("click", function () {
          clearSelectedSizes();
          sizeButton.classList.add("selected");
          // Save selected size to local storage
          localStorage.setItem("selectedSize", size);
        });

        sizeSelector.appendChild(sizeButton);
      });
    }

    addToCartButton.addEventListener("click", function () {
      const selectedSize = localStorage.getItem("selectedSize");

      // Get or initialize the cart from local storage
      const cart = JSON.parse(localStorage.getItem("cart")) || [];

      // Add the current product to the cart
      cart.push({
        productId,
        title: product.title,
        size: selectedSize,
        price: product.price || 0,
        image: product.image || "placeholder-image.jpg",
      });

      // Save the updated cart back to local storage
      localStorage.setItem("cart", JSON.stringify(cart));

      // Display a message about item(s) being added to the cart
      //alert("Item(s) added to cart");
      showToast("item added to cart", detailsContainer);
    });

    detailsContainer.appendChild(image);
    detailsContainer.appendChild(title);
    detailsContainer.appendChild(description);
    detailsContainer.appendChild(price);
    detailsContainer.appendChild(addToCartButton);
    detailsContainer.appendChild(sizeSelector);

    return detailsContainer;
  }

  function clearSelectedSizes() {
    const sizeButtons = document.querySelectorAll(".size-selector button");
    sizeButtons.forEach((button) => {
      button.classList.remove("selected");
    });
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
});
