const signupForm = document.getElementById("signup-form");

// Token generator
function generateToken(length = 16) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let token = "";
  for (let i = 0; i < length; i++) {
    token += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return token;
}

// Validation helper
function validateField(input, errorLabel, rules) {
  errorLabel.textContent = "";
  for (let rule of rules) {
    if (!rule.test(input.value.trim())) {
      errorLabel.textContent = rule.message;
      return false;
    }
  }
  return true;
}

// Validation rules
const validationRules = {
  "first-name": [
    { test: (v) => v !== "", message: "First Name is required" },
    {
      test: (v) => /^[a-zA-Z0-9]+$/.test(v),
      message: "Only alphanumeric allowed",
    },
  ],
  "last-name": [
    { test: (v) => v !== "", message: "Last Name is required" },
    {
      test: (v) => /^[a-zA-Z0-9]+$/.test(v),
      message: "Only alphanumeric allowed",
    },
  ],
  email: [
    { test: (v) => v !== "", message: "Email is required" },
    {
      test: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
      message: "Invalid email format",
    },
  ],
  password: [
    { test: (v) => v !== "", message: "Password is required" },
    {
      test: (v) => v.length > 8,
      message: "Password must be more than 8 characters",
    },
    {
      test: (v) => /[!@#$%^&*(),.?":{}|<>]/.test(v),
      message: "Must contain special character",
    },
  ],
};

// Attach live validation
Object.keys(validationRules).forEach((id) => {
  const input = document.getElementById(id);
  const errorLabel = document.getElementById(`${id}-error`);
  input.addEventListener("input", () =>
    validateField(input, errorLabel, validationRules[id])
  );
});

// Submit handler
signupForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let formIsValid = true;

  Object.keys(validationRules).forEach((id) => {
    const input = document.getElementById(id);
    const errorLabel = document.getElementById(`${id}-error`);
    const isValid = validateField(input, errorLabel, validationRules[id]);
    if (!isValid) formIsValid = false;
  });

  if (!formIsValid) return;

  // Save user
  const user = {
    firstName: document.getElementById("first-name").value.trim(),
    lastName: document.getElementById("last-name").value.trim(),
    email: document.getElementById("email").value.trim(),
    password: document.getElementById("password").value,
    token: generateToken(),
  };
  localStorage.setItem("fitZone_user", JSON.stringify(user));

  // Toast
  const toast = document.createElement("div");
  toast.textContent = "Signup successful! Redirecting to login...";
  toast.className = "toast";
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.remove();
    window.location.href = "login.html";
  }, 3000);
});
