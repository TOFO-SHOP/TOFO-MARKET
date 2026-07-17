/* ======================================================
   TOFO MARKET - PRODUCTS DATA
   Version: 1.1

   NOTE:
   Temporary dummy data.
   Later API response will replace this structure.
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


        // Seller Information

        seller: {
            name: "Tech Store",
            rating: 98,
            verified: true
        },


        // Product Rating

        productRating: {
            stars: 4.5,
            reviews: 234
        },


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


        seller: {
            name: "Digital Hub",
            rating: 96,
            verified: true
        },


        productRating: {
            stars: 4.2,
            reviews: 180
        },


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


        seller: {
            name: "Fashion Point",
            rating: 99,
            verified: true
        },


        productRating: {
            stars: 4.7,
            reviews: 560
        },


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


        seller: {
            name: "Computer Zone",
            rating: 97,
            verified: true
        },


        productRating: {
            stars: 4.8,
            reviews: 890
        },


        stock: true

    }


];




// Global Access

window.ToFoProducts = ToFoProducts;
