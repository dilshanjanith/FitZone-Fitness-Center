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

// Handle login button click
if (loginBtn) {
  loginBtn.addEventListener("click", (event) => {
    event.preventDefault(); // stop the form from reloading page
    // Here you could also add login validation logic
    window.location.href = "index.html"; // redirect
  });
}
if (adminLoginBtn) {
  adminLoginBtn.addEventListener("click", (event) => {
    event.preventDefault(); // prevent form submission

    const enteredEmail = document.getElementById("admin-email").value.trim();
    const enteredPass = document.getElementById("admin-password").value;

    if (enteredEmail === adminEmail && enteredPass === adminPass) {
      // Success → redirect
      window.location.href = "admin.html";
    } else {
      // Fail → show error
      loginError.textContent = "Unknown Admin User. Try again!";
      loginError.style.display = "block";
    }
  });
}

document.getElementById("admin-email").addEventListener("input", () => {
  loginError.style.display = "none";
});
document.getElementById("admin-password").addEventListener("input", () => {
  loginError.style.display = "none";
});

// Active nav highlight on scroll
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 80;
    const sectionHeight = section.clientHeight;

    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});
