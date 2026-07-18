/* ======================================================
   TOFO MARKET - AUTH LOGIC (Shared across all pages)
   Version: 1.0
   Abhi localStorage use ho raha hai (dummy).
   Baad mein isi file ke andar real backend (Firebase)
   se connect hoga — baaki pages mein kuch change
   nahi karna padega.
====================================================== */

const ToFoAuth = {

    STORAGE_KEY: "tofo_user",

    getCurrentUser: function () {
        const raw = localStorage.getItem(this.STORAGE_KEY);
        return raw ? JSON.parse(raw) : null;
    },

    isLoggedIn: function () {
        return this.getCurrentUser() !== null;
    },

    signUp: function (name, email, password) {
        // Real backend aane pe: yahan API call hogi
        const user = {
            name: name,
            email: email,
            role: "buyer",
            joinedAt: new Date().toISOString()
        };
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));
        this.updateHeaderUI();
        return user;
    },

    signIn: function (email, password) {
        // Real backend aane pe: yahan email/password verify hoga
        const user = {
            name: email.split("@")[0],
            email: email,
            role: "buyer",
            joinedAt: new Date().toISOString()
        };
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));
        this.updateHeaderUI();
        return user;
    },

    signOut: function () {
        localStorage.removeItem(this.STORAGE_KEY);
        this.updateHeaderUI();
    },

    updateHeaderUI: function () {
        const links = document.querySelectorAll(".tf-signin-link");
        const user = this.getCurrentUser();

        links.forEach(function (link) {
            if (user) {
                link.textContent = "Hi, " + user.name;
                link.href = "account.html";
            } else {
                link.textContent = "Sign in ›";
                link.href = "signin.html";
            }
        });
    }

};

document.addEventListener("DOMContentLoaded", function () {
    ToFoAuth.updateHeaderUI();
});

window.ToFoAuth = ToFoAuth;
