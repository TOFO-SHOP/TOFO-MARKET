/* ======================================================
   TOFO MARKET - SIGN IN PAGE LOGIC
   Version: 3.0 (OTP + Buyer/Seller role selection added)

   NOTE: OTP abhi DUMMY hai — real SMS backend nahi hai.
   Code screen pe hi dikha dete hain testing ke liye.
   Real backend (Firebase + SMS API) aane pe sirf yahan
   ka logic replace hoga, baaki UI wahi rahega.
====================================================== */

document.addEventListener("DOMContentLoaded", function () {

    const steps = {
        email: document.getElementById("stepEmail"),
        password: document.getElementById("stepPassword"),
        newAccount: document.getElementById("stepNewAccount"),
        otp: document.getElementById("stepOtp"),
        role: document.getElementById("stepRole")
    };

    const createAccountDivider = document.getElementById("createAccountDivider");
    const showCreateBtn = document.getElementById("showCreateBtn");

    const emailInput = document.getElementById("emailInput");
    const continueBtn = document.getElementById("continueBtn");
    const identityEmail = document.getElementById("identityEmail");
    const identityEmail2 = document.getElementById("identityEmail2");

    let forceSignUp = false;
    let pendingUser = null;   // naam/email/password jo OTP verify hone tak hold hoga
    let generatedOtp = null;

    function showStep(name) {
        Object.keys(steps).forEach(function (key) {
            steps[key].style.display = key === name ? "block" : "none";
        });

        // "New to ToFo Market" wala bottom section sirf email/password step pe dikhega
        const hideBottom = (name === "otp" || name === "role" || name === "newAccount");
        createAccountDivider.style.display = hideBottom ? "none" : "flex";
        showCreateBtn.style.display = hideBottom ? "none" : "block";
    }

    // ---- STEP 1: Continue (email) ----
    continueBtn.addEventListener("click", function () {

        const email = emailInput.value.trim();
        if (!email) return;

        identityEmail.textContent = email;
        identityEmail2.textContent = email;

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

    // ---- STEP 2: Existing user sign in ----
    document.getElementById("signInSubmit").addEventListener("click", function () {
        const password = document.getElementById("passwordInput").value;
        if (!password) return;

        ToFoAuth.signIn(emailInput.value.trim(), password);
        window.location.href = "index.html";
    });

    // ---- STEP 3: New account -> send OTP ----
    document.getElementById("createAccountBtn").addEventListener("click", function () {

        const name = document.getElementById("nameInput").value.trim();
        const password = document.getElementById("newPasswordInput").value;
        if (!name || password.length < 6) return;

        pendingUser = { name: name, email: emailInput.value.trim(), password: password };

        sendOtp();

    });

    // ---- STEP 4: OTP ----
    function sendOtp() {
        generatedOtp = String(Math.floor(1000 + Math.random() * 9000));

        document.getElementById("otpTargetEmail").textContent = pendingUser.email;
        document.getElementById("otpDemoHint").textContent =
            " (Demo mode — aapka OTP hai: " + generatedOtp + ")";

        document.getElementById("otpInput").value = "";
        showStep("otp");
    }

    document.getElementById("verifyOtpBtn").addEventListener("click", function () {

        const entered = document.getElementById("otpInput").value.trim();

        if (entered !== generatedOtp) {
            alert("Galat OTP. Dobara koshish karein.");
            return;
        }

        // OTP sahi -> account create karo, ab role choose karwao
        ToFoAuth.signUp(pendingUser.name, pendingUser.email, pendingUser.password);
        showStep("role");

    });

    document.getElementById("resendOtpBtn").addEventListener("click", function () {
        sendOtp();
        alert("Naya OTP bheja gaya.");
    });

    // ---- STEP 5: Role selection ----
    document.getElementById("chooseBuyer").addEventListener("click", function () {
        ToFoAuth.setRole("buyer");
        window.location.href = "account.html";
    });

    document.getElementById("chooseSeller").addEventListener("click", function () {
        ToFoAuth.setRole("seller");
        window.location.href = "seller-dashboard.html";
    });

    // ---- Bottom "Create your ToFo Market account" button ----
    showCreateBtn.addEventListener("click", function () {
        forceSignUp = true;
        emailInput.value = "";
        showStep("email");
        emailInput.focus();
        emailInput.scrollIntoView({ behavior: "smooth", block: "center" });
    });

});
