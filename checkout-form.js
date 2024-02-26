// checkout-form.js

function nextSection(nextSectionId) {
  document.getElementById(nextSectionId).style.display = "block";
  document.getElementById("shipping-section").style.display = "none";
  document.getElementById("payment-section").style.display = "none";
  document.getElementById("order-review-section").style.display = "none";
}

function prevSection(prevSectionId) {
  document.getElementById(prevSectionId).style.display = "block";
  document.getElementById("shipping-section").style.display = "none";
  document.getElementById("payment-section").style.display = "none";
  document.getElementById("order-review-section").style.display = "none";
}

function submitForm() {
  // Perform form submission logic here
  alert("Form submitted successfully!");
}

// checkout-form-styles.css

/* Add your styles here */
