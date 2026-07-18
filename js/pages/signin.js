/* ======================================================
   TOFO MARKET - SIGN IN PAGE LOGIC (Amazon-style flow)
   Version: 2.0
====================================================== */

document.addEventListener("DOMContentLoaded", function () {

    const stepEmail = document.getElementById("stepEmail");
    const stepPassword = document.getElementById("stepPassword");
    const stepNewAccount = document.getElementById("stepNewAccount");

    const emailInput = document.getElementById("emailInput");
    const continueBtn = document.getElementById("continueBtn");

    const identityEmail = document.getElementById("identityEmail");
    const identityEmail2 = document.getElementById("identityEmail2");

    // Dummy check: agar email mein "new" ho to naya user samjho, warna existing
    // (Real backend aane pe: yahan API check hoga ke email exist karti hai ya nahi)
    continueBtn.addEventListener("click", function () {

        const email = emailInput.value.trim();
        if (!email) return;

        const isExistingUser = !email.toLowerCase().includes("new");

        identityEmail.textContent = email;
        identityEmail2.textContent = email;

        stepEmail.style.display = "none";

        if (isExistingUser) {
            stepPassword.style.display = "block";
        } else {
            stepNewAccount.style.display = "block";
        }

    });

    // Change link — wapas email step pe
    function backToEmail() {
        stepPassword.style.display = "none";
        stepNewAccount.style.display = "none";
        stepEmail.style.display = "block";
    }

    document.getElementById("changeIdentity").addEventListener("click", function (e) {
        e.preventDefault();
        backToEmail();
    });

    document.getElementById("changeIdentity2").addEventListener("click", function (e) {
        e.preventDefault();
        backToEmail();
    });

    // Sign in submit
    document.getElementById("signInSubmit").addEventListener("click", function () {
        const password = document.getElementById("passwordInput").value;
        if (!password) return;

        ToFoAuth.signIn(emailInput.value.trim(), password);
        window.location.href = "index.html";
    });

    // Create account submit
    document.getElementById("createAccountBtn").addEventListener("click", function () {
        const name = document.getElementById("nameInput").value.trim();
        const password = document.getElementById("newPasswordInput").value;
        if (!name || password.length < 6) return;

        ToFoAuth.signUp(name, emailInput.value.trim(), password);
        window.location.href = "index.html";
    });

    // "Create your ToFo Market account" button at bottom
    document.getElementById("showCreateBtn").addEventListener("click", function () {
        emailInput.value = "";
        stepEmail.style.display = "block";
        stepPassword.style.display = "none";
        stepNewAccount.style.display = "none";
        emailInput.focus();
    });

});
