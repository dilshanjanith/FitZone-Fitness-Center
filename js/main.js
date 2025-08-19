const toggleBtn = document.getElementById("toggle-mode");
const loginBtn = document.getElementById("login-btn");
const adminLoginBtn = document.getElementById("admin-login-btn");

const loginError = document.getElementById("login-error");

const adminEmail = "admin12345@gmail.com";
const adminPass = "Admin2001@#";

// Apply saved theme on page load
window.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
  }
});

// Toggle dark mode and save preference
if (toggleBtn) {
  toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    const isDark = document.body.classList.contains("dark-mode");
    localStorage.setItem("theme", isDark ? "dark" : "light");
  });
}

// Handle admin login
if (adminLoginBtn) {
  adminLoginBtn.addEventListener("click", (event) => {
    event.preventDefault(); // prevent form submission

    const enteredEmail = document.getElementById("admin-email").value.trim();
    const enteredPass = document.getElementById("admin-password").value;

    if (enteredEmail === adminEmail && enteredPass === adminPass) {
      // Success → redirect
      const toast = document.createElement("div");
      toast.textContent = "log in successful As Admin!";
      toast.className = "toast";
      document.body.appendChild(toast);
      setTimeout(() => {
        toast.remove();
        window.location.href = "admin.html";
      }, 2000);
    } else {
      // Fail → show error
      loginError.textContent = "Unknown Admin User. Try again!";
      loginError.style.display = "block";
    }
  });
}

if (document.getElementById("admin-email")) {
  document.getElementById("admin-email").addEventListener("input", () => {
    loginError.style.display = "none";
  });

  document.getElementById("admin-password").addEventListener("input", () => {
    loginError.style.display = "none";
  });
}

// ===============================
// Active nav highlight on scroll
// ===============================
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links a");

function highlightNav() {
  let current = "";
  const scrollPos = window.scrollY + 100; // adjust for navbar height

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;

    if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
}

window.addEventListener("scroll", highlightNav);

// Run once on load so correct section is active when refreshing mid-page
window.addEventListener("load", highlightNav);

const form = document.getElementById("client-form");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  let isValid = true;

  // Clear previous errors
  document.querySelectorAll(".error").forEach((el) => (el.textContent = ""));

  // First Name
  const firstName = document.getElementById("first-name");
  if (firstName.value.trim() === "") {
    document.getElementById("first-name-error").textContent =
      "First name is required";
    isValid = false;
  }

  // Last Name
  const lastName = document.getElementById("last-name");
  if (lastName.value.trim() === "") {
    document.getElementById("last-name-error").textContent =
      "Last name is required";
    isValid = false;
  }

  // Email
  const email = document.getElementById("email");
  const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  if (email.value.trim() === "") {
    document.getElementById("email-error").textContent = "Email is required";
    isValid = false;
  } else if (!email.value.match(emailPattern)) {
    document.getElementById("email-error").textContent = "Invalid email";
    isValid = false;
  }

  // Phone
  const phone = document.getElementById("phone");
  if (phone.value.trim() === "") {
    document.getElementById("phone-error").textContent = "Phone is required";
    isValid = false;
  }

  // DOB
  const dob = document.getElementById("dob");
  if (dob.value.trim() === "") {
    document.getElementById("dob-error").textContent =
      "Date of birth is required";
    isValid = false;
  }

  // Inquiry
  const inquiry = document.getElementById("inquiry");
  if (inquiry.value.trim() === "") {
    document.getElementById("inquiry-error").textContent =
      "Please enter your inquiry";
    isValid = false;
  }

  if (isValid) {
    alert("Form submitted successfully!");
    form.reset();
  }
});

// disable submit button
const submitBtn = document.getElementById("submit-btn");

const fields = [
  { id: "first-name", type: "text", error: "First name is required" },
  { id: "last-name", type: "text", error: "Last name is required" },
  { id: "email", type: "email", error: "Valid email is required" },
  { id: "phone", type: "tel", error: "Phone is required" },
  { id: "dob", type: "date", error: "Date of birth is required" },
  {
    id: "inquiry-details",
    type: "text",
    error: "Inquiry details are required",
  },
];

// Disable submit initially
submitBtn.disabled = true;

// Validate function
function validateForm() {
  let isValid = true;

  fields.forEach((field) => {
    const input = document.getElementById(field.id);
    const errorLabel = document.getElementById(field.id + "-error");
    errorLabel.textContent = "";

    if (input.value.trim() === "") {
      errorLabel.textContent = field.error;
      isValid = false;
    } else if (field.type === "email") {
      const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
      if (!input.value.match(emailPattern)) {
        errorLabel.textContent = "Invalid email";
        isValid = false;
      }
    }
  });

  submitBtn.disabled = !isValid;
  return isValid;
}

// Add input event listener for real-time validation
fields.forEach((field) => {
  const input = document.getElementById(field.id);
  input.addEventListener("input", validateForm);
});

// Toast function
function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => toast.classList.add("show"), 100);
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 500);
  }, 3000);
}

// Handle form submit
form.addEventListener("submit", function (e) {
  e.preventDefault();

  if (validateForm()) {
    form.reset();
    submitBtn.disabled = true;
    showToast("Form submitted successfully!");
  }
});
