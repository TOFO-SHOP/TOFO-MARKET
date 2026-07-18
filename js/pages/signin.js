/* ======================================================
   TOFO MARKET - SIGN IN / SIGN UP PAGE LOGIC
   Version: 1.0
====================================================== */

document.addEventListener("DOMContentLoaded", function () {

    const tabSignIn = document.getElementById("tabSignIn");
    const tabSignUp = document.getElementById("tabSignUp");
    const signInForm = document.getElementById("signInForm");
    const signUpForm = document.getElementById("signUpForm");

    tabSignIn.addEventListener("click", function () {
        tabSignIn.classList.add("is-active");
        tabSignUp.classList.remove("is-active");
        signInForm.style.display = "flex";
        signUpForm.style.display = "none";
    });

    tabSignUp.addEventListener("click", function () {
        tabSignUp.classList.add("is-active");
        tabSignIn.classList.remove("is-active");
        signUpForm.style.display = "flex";
        signInForm.style.display = "none";
    });

    signInForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const email = document.getElementById("signInEmail").value.trim();
        const password = document.getElementById("signInPassword").value;

        ToFoAuth.signIn(email, password);
        alert("Sign in ho gaye! Welcome back.");
        window.location.href = "index.html";
    });

    signUpForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const name = document.getElementById("signUpName").value.trim();
        const email = document.getElementById("signUpEmail").value.trim();
        const password = document.getElementById("signUpPassword").value;

        ToFoAuth.signUp(name, email, password);
        alert("Account ban gaya! Welcome to ToFo, " + name + ".");
        window.location.href = "index.html";
    });

});
