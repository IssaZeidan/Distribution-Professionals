const form = document.getElementById("regForm");
const position = document.getElementById("spain");
const submitButton = document.querySelector("button[type='submit']");
const checkbox = document.querySelector("input[type='checkbox']");
const usernameInput = document.querySelector("input[name='name']");
const passwordInput = document.querySelector("input[name='password']");
const emailInput = document.querySelector("input[name='email']");
const usernameRegex = /^\S+$/;
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const userNameError = document.getElementById("username-error");
const emailError = document.getElementById("email-error");
const passError = document.getElementById("pass-error");
const checkError = document.getElementById("check-error");
const inputError = document.querySelector(".input-error");
// Set a flag to keep track of whether an option has been selected from the dropdown menu
//let dropdownSelected = false;
console.log("before form");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  // Validate form fields
  if (!isFormValid()) {
    return;
  }
  // Save form data to local storage
  const formData = {
    username: usernameInput.value,
    password: passwordInput.value,
    email: emailInput.value,
    position: position.value,
  };
  localStorage.setItem("formData", JSON.stringify(formData));
  sessionStorage.setItem("info", JSON.stringify(formData));

  if (position.value === "Market") {
    window.location.pathname = "/HTML/marketPage.html";
  } else window.location.pathname = "/HTML/companyPage.html";

  // Reset form
  form.reset();
});
console.log("after form");

function isFormValid() {
  if (!usernameInput.value.trim()) {
    usernameInput.classList.toggle("input-error");
    userNameError.textContent = "Please enter your username.";
    // alert("Please enter your username.");
    return false;
  } else {
    usernameInput.classList.remove("input-error");
    userNameError.textContent = "";
  }

  // if (!usernameRegex.test(usernameInput.value)) {
  //   usernameInput.classList.toggle("input-error");
  //   userNameError.textContent = "Username should not contain spaces.";
  //   // alert("Username should not contain spaces.");
  //   return false;
  // } else {
  //   usernameInput.classList.remove("input-error");
  //   userNameError.textContent = "";
  // }

  if (!passwordInput.value.trim()) {
    passwordInput.classList.toggle("input-error");

    passError.textContent = "Please enter your password.";
    // alert("Please enter your password.");
    return false;
  } else {
    passwordInput.classList.remove("input-error");
    passError.textContent = "";
  }

  if (!passwordRegex.test(passwordInput.value)) {
    passwordInput.classList.toggle("input-error");

    passError.textContent =
      "Password should have at least 8 characters with at least 1 number, uppercase, and special characters.";
    // alert("Password should have at least 8 characters with at least 1 number, uppercase, and special characters.");
    return false;
  } else {
    passwordInput.classList.remove("input-error");
    passError.textContent = "";
  }

  if (!emailInput.value.trim()) {
    emailInput.classList.toggle("input-error");

    emailError.textContent = "Please enter your email address.";
    // alert("Please enter your email address.");
    return false;
  } else {
    emailInput.classList.remove("input-error");
    emailError.textContent = "";
  }

  if (!emailRegex.test(emailInput.value)) {
    emailInput.classList.toggle("input-error");

    emailError.textContent = "Please enter a valid email address.";
    // alert("Please enter a valid email address.");
    return false;
  } else {
    emailInput.classList.remove("input-error");
    emailError.textContent = "";
  }

  if (!checkbox.checked) {
    checkbox.classList.toggle("input-error");

    checkError.textContent = "Please agree to the license terms.";
    // alert("Please agree to the license terms.");
    return false;
  } else {
    checkbox.classList.remove("input-error");
    checkError.textContent = "";
  }

  return true;
}
