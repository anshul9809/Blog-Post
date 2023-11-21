//for passwordfield toggle
const togglePassword = document.getElementById("togglePassword");

togglePassword.addEventListener("click", togglePasswordField);

function togglePasswordField(){
    const passwordField = document.getElementById("password");
    const eye = togglePassword.getElementsByTagName("svg");
    if(passwordField.type === "password"){
        passwordField.type = "text";
    }
    else{
        passwordField.type = "password";
    }
    eye[0].classList.toggle("active");
    eye[1].classList.toggle("active");
}

//for same username
const checkbox = document.getElementById("checkbox");
if(checkbox){
    checkbox.addEventListener("change", ()=>{
        const usernameField = document.getElementById("username");
        if(checkbox.checked){
            usernameField.value = document.getElementById("email").value;
            usernameField.disabled = true;
        }
        else{
            usernameField.value = "";
            usernameField.disabled = false;
        }
    });
}

function hasValidEmail(email){
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

//checking for password and confirm password mismatch
function matchPassword(pwd, confirmPwd){
    return (pwd === confirmPwd) ? true : false;
}

//for password length
function passwordLength(pwd){
    return pwd.length >= 8;
}

//for special characters in password
function hasSpecialCharacters(pwd){
    let regex = /^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).*$/ 
    return regex.test(pwd);
}
//for number in password
function hasNumber(pwd){
    let regex = /^(?=.*\d).*$/;
    return regex.test(pwd);
}
//for lowercase letters in password
function hasLowerCaseLetters(pwd){
    let regex = /^(?=.*[a-z]).*$/;
    return regex.test(pwd);
}
//for uppercase letters in password
function hasUpperCaseLetters(pwd){
    let regex = /^(?=.*[A-Z]).*$/;
    return regex.test(pwd);
}

const emailFieldOut = document.getElementById("email");
if(emailFieldOut){
    emailFieldOut.addEventListener("focusout", ()=>{
        //validating the email field
        const emailErrorField = document.getElementById("email-error-description");
        emailErrorField.innerHTML = "Invalid E-mail";
        if(!hasValidEmail(emailFieldOut.value)){
            emailFieldOut.classList.add("invalid");
            emailFieldOut.classList.remove("valid");
            emailErrorField.style.display = "block";
        }
        else{
            emailFieldOut.classList.remove("invalid");
            emailFieldOut.classList.add("valid");
            emailErrorField.style.display = "none";
        }
    });
}

//for form-validation
const form = document.getElementById("signup-form");
if(form){
    form.addEventListener('submit', function(e){
        //checking empty fields
        e.preventDefault();
        const passwordField = document.querySelector("#password");
        const emailField = document.querySelector("#email");
        const email = form.querySelector("#email").value;
        const username = form.querySelector("#username").value;
        const password = form.querySelector("#password").value;
        const confirmPassword = form.querySelector("#confirm-password").value;
        const errors = form.querySelector("#error-description");
        let message = "";
        if(!hasValidEmail(email)){
            message = "Invalid Email Address";
        }
        else if(!passwordLength(password)){
            message = "Password must be atleast 8 charcters long ";
        }
        else if (!hasSpecialCharacters(password)){
            message = "Password must contain a special character";
        } 
        else if (!hasLowerCaseLetters(password)){
            message = "Password must have a lowercase letter";
        }
        else if(!hasUpperCaseLetters(password)){
            message = "Password must a uppercase letter";
        }
        else if(!hasNumber(password)){
            message = "Password must contain a number";
        }
        else if (!matchPassword(password, confirmPassword)) {
            message = "Password and confirm password does not match";
        }

        if(message === ""){
            e.currentTarget.submit();
            errors.style.display = "none";
            passwordField.classList.add("valid");
            passwordField.classList.remove("invalid");
        }
        else{
            passwordField.classList.add("invalid");
            passwordField.classList.remove("valid");
            errors.style.display = "block";
            errors.innerHTML = message;
        }
    });
}