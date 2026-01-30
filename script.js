const form = document.getElementById("regForm");
const submitBtn = document.getElementById("submitBtn");

const fname = document.getElementById("fname");
const lname = document.getElementById("lname");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const password = document.getElementById("password");
const confirmPass = document.getElementById("confirm");
const terms = document.getElementById("terms");
const strength = document.getElementById("strength");

const country = document.getElementById("country");
const state = document.getElementById("state");
const city = document.getElementById("city");

const disposableDomains = ["tempmail.com", "10minutemail.com"];

// ---------- Helper ----------
function showError(input, message, id) {
    input.style.border = "2px solid red";
    document.getElementById(id).textContent = message;
}

function clearError(input, id) {
    input.style.border = "1px solid #ccc";
    document.getElementById(id).textContent = "";
}

// ---------- Validations ----------
function validateName() {
    if (fname.value.trim() === "") {
        showError(fname, "First Name required", "fnameError");
        return false;
    }
    clearError(fname, "fnameError");

    if (lname.value.trim() === "") {
        showError(lname, "Last Name required", "lnameError");
        return false;
    }
    clearError(lname, "lnameError");
    return true;
}

function validateEmail() {
    const domain = email.value.split("@")[1];
    if (!email.value.includes("@") || disposableDomains.includes(domain)) {
        showError(email, "Invalid or disposable email not allowed", "emailError");
        return false;
    }
    clearError(email, "emailError");
    return true;
}

function validatePhone() {
    if (!phone.value.startsWith("+91")) {
        showError(phone, "Phone must start with country code +91", "phoneError");
        return false;
    }
    clearError(phone, "phoneError");
    return true;
}

function validateGender() {
    const genders = document.getElementsByName("gender");
    for (let g of genders) {
        if (g.checked) return true;
    }
    document.getElementById("genderError").textContent = "Gender required";
    return false;
}

function validatePassword() {
    if (password.value.length < 6) {
        strength.textContent = "Weak";
        strength.style.color = "red";
    } else if (/[A-Z]/.test(password.value) && /[0-9]/.test(password.value)) {
        strength.textContent = "Strong";
        strength.style.color = "green";
    } else {
        strength.textContent = "Medium";
        strength.style.color = "orange";
    }

    if (confirmPass.value !== password.value) {
        document.getElementById("passError").textContent = "Passwords do not match";
        confirmPass.style.border = "2px solid red";
        return false;
    } else {
        document.getElementById("passError").textContent = "";
        confirmPass.style.border = "1px solid #ccc";
        return true;
    }
}

// ---------- Enable Submit ----------
form.addEventListener("input", () => {
    if (
        validateName() &&
        validateEmail() &&
        validatePhone() &&
        validateGender() &&
        validatePassword() &&
        terms.checked
    ) {
        submitBtn.disabled = false;
    } else {
        submitBtn.disabled = true;
    }
});

// ---------- Submit ----------
form.addEventListener("submit", (e) => {
    e.preventDefault();
    document.getElementById("successMsg").textContent =
        "Registration Successful! Your profile has been submitted successfully.";
    form.reset();
    submitBtn.disabled = true;
    strength.textContent = "";
});
