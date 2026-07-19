/* ======================================================
   TOFO MARKET - SIGN IN PAGE LOGIC (Amazon-style flow)
   Version: 2.1 (Create Account button ab direct kaam karta hai)
====================================================== */

document.addEventListener("DOMContentLoaded", function () {

    const stepEmail = document.getElementById("stepEmail");
    const stepPassword = document.getElementById("stepPassword");
    const stepNewAccount = document.getElementById("stepNewAccount");

    const emailInput = document.getElementById("emailInput");
    const continueBtn = document.getElementById("continueBtn");

    const identityEmail = document.getElementById("identityEmail");
    const identityEmail2 = document.getElementById("identityEmail2");

    let forceSignUp = false;

    function showStep(step) {
        stepEmail.style.display = step === "email" ? "block" : "none";
        stepPassword.style.display = step === "password" ? "block" : "none";
        stepNewAccount.style.display = step === "newAccount" ? "block" : "none";
    }

    continueBtn.addEventListener("click", function () {

        const email = emailInput.value.trim();
        if (!email) return;

        identityEmail.textContent = email;
        identityEmail2.textContent = email;

        // Agar user "Create Account" button se aaya hai, seedha sign-up form
        // Warna dummy detection: agar email mein "new" ho to naya user samjho
        const isNewUser = forceSignUp || email.toLowerCase().includes("new");

        showStep(isNewUser ? "newAccount" : "password");

    });

    document.getElementById("changeIdentity").addEventListener("click", function (e) {
        e.preventDefault();
        forceSignUp = false;
        showStep("email");
    });

    document.getElementById("changeIdentity2").addEventListener("click", function (e) {
        e.preventDefault();
        forceSignUp = false;
        showStep("email");
    });

    document.getElementById("signInSubmit").addEventListener("click", function () {
        const password = document.getElementById("passwordInput").value;
        if (!password) return;

        ToFoAuth.signIn(emailInput.value.trim(), password);
        window.location.href = "index.html";
    });

    document.getElementById("createAccountBtn").addEventListener("click", function () {
        const name = document.getElementById("nameInput").value.trim();
        const password = document.getElementById("newPasswordInput").value;
        if (!name || password.length < 6) return;

        ToFoAuth.signUp(name, emailInput.value.trim(), password);
        window.location.href = "index.html";
    });

    // "Create your ToFo Market account" button (neeche wala)
    document.getElementById("showCreateBtn").addEventListener("click", function () {
        forceSignUp = true;
        emailInput.value = "";
        showStep("email");
        emailInput.focus();
        emailInput.scrollIntoView({ behavior: "smooth", block: "center" });
    });

});
