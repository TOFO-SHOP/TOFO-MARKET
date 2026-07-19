/* ======================================================
   TOFO MARKET - AUTH LOGIC (Shared across all pages)
   Version: 2.0 (role: buyer/seller add kiya)
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

    saveUser: function (user) {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));
        this.updateHeaderUI();
    },

    signUp: function (name, email, password) {
        const user = {
            name: name,
            email: email,
            role: null,   // role baad mein set hoga (buyer/seller choose karne pe)
            joinedAt: new Date().toISOString()
        };
        this.saveUser(user);
        return user;
    },

    signIn: function (email, password) {
        const existing = this.getCurrentUser();
        const user = (existing && existing.email === email) ? existing : {
            name: email.split("@")[0],
            email: email,
            role: "buyer",
            joinedAt: new Date().toISOString()
        };
        this.saveUser(user);
        return user;
    },

    setRole: function (role) {
        const user = this.getCurrentUser();
        if (!user) return;
        user.role = role;
        this.saveUser(user);
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
