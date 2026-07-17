/* ======================================================
   TOFO MARKET - PRODUCTS DATA
   Version: 1.0

   NOTE:
   This is temporary dummy data.
   Later API data will replace this file.
====================================================== */


const ToFoProducts = [

    {
        id: 1,

        name: "Wireless Headphones",

        category: "Electronics",

        price: 4999,

        currency: "PKR",

        image: "assets/images/headphones.jpg",

        location: "Karachi",

        seller: "Tech Store",

        rating: 4.5,

        stock: true

    },


    {
        id: 2,

        name: "Smart Watch",

        category: "Electronics",

        price: 2999,

        currency: "PKR",

        image: "assets/images/watch.jpg",

        location: "Lahore",

        seller: "Digital Hub",

        rating: 4.2,

        stock: true

    },


    {
        id: 3,

        name: "Men Casual Shirt",

        category: "Fashion",

        price: 1999,

        currency: "PKR",

        image: "assets/images/shirt.jpg",

        location: "Karachi",

        seller: "Fashion Point",

        rating: 4.7,

        stock: true

    },


    {
        id: 4,

        name: "Laptop",

        category: "Computers",

        price: 85000,

        currency: "PKR",

        image: "assets/images/laptop.jpg",

        location: "Lahore",

        seller: "Computer Zone",

        rating: 4.8,

        stock: true

    }


];




// Global Access

window.ToFoProducts = ToFoProducts;
