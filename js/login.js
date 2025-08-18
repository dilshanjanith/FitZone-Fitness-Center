// Elements
const loginBtn = document.getElementById("login-btn");
const emailInput = document.querySelector('input[type="email"]');
const passwordInput = document.querySelector('input[type="password"]');

// Optional: show errors
function showError(message) {
  let errorLabel = document.getElementById("login-error");
  if (!errorLabel) {
    errorLabel = document.createElement("div");
    errorLabel.id = "login-error";
    errorLabel.className = "error";
    loginBtn.parentElement.insertBefore(errorLabel, loginBtn);
  }
  errorLabel.textContent = message;
}

// Handle login
loginBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const enteredEmail = emailInput.value.trim();
  const enteredPassword = passwordInput.value;

  if (!enteredEmail || !enteredPassword) {
    showError("Please enter both email and password.");
    return;
  }

  // Get user from localStorage
  const savedUser = JSON.parse(localStorage.getItem("fitZone_user"));

  if (!savedUser) {
    showError("No account found. Please sign up first.");
    return;
  }

  // Validate credentials
  if (
    enteredEmail === savedUser.email &&
    enteredPassword === savedUser.password
  ) {
    // Successful login → redirect to index
    // Toast
    const toast = document.createElement("div");
    toast.textContent = "log in successful!";
    toast.className = "toast";
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.remove();
      window.location.href = "index.html";
    }, 1500);
  } else {
    showError("Incorrect email or password.");
  }
});

// Remove error message when typing
emailInput.addEventListener("input", () => {
  const errorLabel = document.getElementById("login-error");
  if (errorLabel) errorLabel.textContent = "";
});

passwordInput.addEventListener("input", () => {
  const errorLabel = document.getElementById("login-error");
  if (errorLabel) errorLabel.textContent = "";
});
