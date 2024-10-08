const emailError = document.getElementById('email-error');
let users = JSON.parse(window.localStorage.getItem("formData")) || [];
if (!Array.isArray(users)) {
    users = [];
}
console.log("Users from local storage:", users);

let login1 = document.getElementById("login1");
login1.addEventListener("submit", (event) => {
    event.preventDefault();

    let Email = event.target.email.value;
    let Password = event.target.password.value;

    console.log("Entered Email:", Email);
    console.log("Entered Password:", Password);

    // Find the user with the matching email and password
    let user = users.find(user => {
        let decryptedPassword = CryptoJS.AES.decrypt(user.password, 'secret-key').toString(CryptoJS.enc.Utf8);
        console.log("Decrypted Password for user:", user.email, decryptedPassword);
        return user.email === Email && decryptedPassword === Password;
    });

    if (user) {
        console.log("User found:", user);
        // Store user info in session storage
        window.sessionStorage.setItem("info", JSON.stringify(user));

        // Redirect based on the user's position
        if (user.position === "company") {
            window.location.href = "../html/companyPage.html";
        } else if (user.position === "Market") {
            window.location.href = "../html/marketPage.html";
        }
    } else {
        console.log("No matching user found");
        emailError.style.color = 'red';
        emailError.style.fontSize = '10px';
        emailError.style.padding = '5px 10px';
        emailError.textContent = 'We could not find an account matching the login info you entered';
        event.target.email.style.borderColor = 'red';
    }

    login1.reset();
});

// Check session storage for user data and redirect accordingly
window.onload = function() {
    let userInfo = JSON.parse(window.sessionStorage.getItem("info"));
    if (userInfo) {
        console.log("User info from session storage:", userInfo);
        if (userInfo.position === "company") {
            window.location.href = "../html/companyPage.html";
        } else if (userInfo.position === "Market") {
            window.location.href = "../html/marketPage.html";
        }
    }
};
