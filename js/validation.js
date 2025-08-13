function validateSignup() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  if (password.length < 6) {
    alert("Password should be at least 6 characters.");
    return false;
  }

  if (password !== confirmPassword) {
    alert("Passwords do not match.");
    return false;
  }

  alert("Sign-up successful!");
  return true;
}

function validateLogin() {
  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value;

  if (!email || !password) {
    alert("Please fill in all fields.");
    return false;
  }

  alert("Login successful!");
  return true;
}
