'use strict';

// Element toggle function
const elementToggleFunc = function (elem) {
  elem.classList.toggle("active");
};

// Sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// Sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () {
  elementToggleFunc(sidebar);
});

// Testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// Modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// Modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
};

// Add click event to all modal items
testimonialsItem.forEach(item => {
  item.addEventListener("click", function () {
    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();
  });
});

// Add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);

// Contact form variables
const form = document.querySelector(".form[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector(".form-btn[data-form-btn]");

let isSubmitting = false; // Prevent multiple submissions

// Add event to all form input fields to enable button when all inputs are valid
formInputs.forEach(input => {
  input.addEventListener("input", function () {
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }
  });
});

// Form submission with EmailJS
form.addEventListener("submit", function (event) {
  event.preventDefault();

  // Prevent multiple submissions
  if (isSubmitting) {
    alert("Please wait... Your message is being sent.");
    return;
  }

  isSubmitting = true; // Lock submission
  formBtn.innerText = "Sending..."; // Change button text

  const name = document.querySelector("#name").value;
  const email = document.querySelector("#email").value;
  const message = document.querySelector("#message").value;

  // EmailJS configuration with correct service and template IDs
  const data = {
    service_id: "service_j1zh2f8", // Correct service ID
    template_id: "template_a9phfeb", // Correct template ID
    user_id: "cKkIbhvCLcBm01AyM", // Correct public key (user ID)
    template_params: {
      from_name: name,
      from_email: email,
      message: message,
    },
  };

  // Sending email using EmailJS API
  fetch("https://api.emailjs.com/api/v1.0/email/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.ok) {
        alert("Message sent successfully!");
        form.reset();
        formBtn.setAttribute("disabled", ""); // Disable button after submission
        formBtn.innerText = "Send Message"; // Reset button text
      } else {
        alert("Failed to send message. Please try again.");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    })
    .finally(() => {
      isSubmitting = false; // Unlock submission
      formBtn.innerText = "Send Message"; // Reset button text
    });
});

// Page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// Add event to all nav links for page switching
navigationLinks.forEach((link, index) => {
  link.addEventListener("click", function () {
    pages.forEach((page, pageIndex) => {
      if (link.innerHTML.toLowerCase() === page.dataset.page) {
        page.classList.add("active");
        navigationLinks[pageIndex].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        page.classList.remove("active");
        navigationLinks[pageIndex].classList.remove("active");
      }
    });
  });
});

// Fix: Prevent disabling other buttons
const allButtons = document.querySelectorAll("button");
allButtons.forEach((btn) => {
  if (!btn.classList.contains("form-btn")) {
    btn.removeAttribute("disabled");
  }
});
