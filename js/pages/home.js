/* ======================================================
   TOFO MARKET - HOME PAGE LOGIC
   Version: 1.1

   Handles:
   - Product loading
   - Product rendering
   - Rating display
   - Seller information
   - Future API connection ready
====================================================== */


document.addEventListener(
    "DOMContentLoaded",
    function () {

        loadProducts();

    }
);





function loadProducts() {


    const productGrid = "product-grid";


    try {


        // Show loading

        if (window.ToFoLoading) {

            ToFoLoading.show(
                productGrid,
                "Loading products..."
            );

        }





        setTimeout(function () {



            const products =
                window.ToFoProducts || [];




            if (!products.length) {


                if (window.ToFoError) {


                    ToFoError.show(
                        productGrid,
                        "No products available."
                    );


                }


                return;


            }





            renderProducts(products);





        }, 500);






    } catch(error) {



        console.error(
            "Product loading error:",
            error
        );



        if(window.ToFoError){


            ToFoError.show(
                productGrid,
                error.message
            );


        }



    }


}









function renderProducts(products) {



    const grid =
        document.getElementById(
            "product-grid"
        );



    const count =
        document.getElementById(
            "product-count"
        );




    if(!grid){

        return;

    }






    if(count){


        count.innerHTML =
        `${products.length} Products`;


    }






    grid.innerHTML = "";







    products.forEach(function(product){



        const card = `



        <div class="tf-product-card">



            <img 
            src="${product.image}"
            alt="${product.name}"
            class="tf-product-card__image"
            >






            <div class="tf-product-card__body">





                <h3>

                    ${product.name}

                </h3>





                <p>

                    ${product.category}

                </p>





                <div class="tf-rating">


                    ⭐ ${product.productRating.stars}


                    <span>

                    (${product.productRating.reviews} reviews)

                    </span>


                </div>






                <strong class="tf-price">


                    ${product.price.toLocaleString()}

                    ${product.currency}


                </strong>







                <span class="tf-location">


                    📍 ${product.location}


                </span>







                <div class="tf-seller">



                    ${product.seller.verified ? "✅" : ""}


                    ${product.seller.name}



                    <small>

                    (${product.seller.rating}% Seller)

                    </small>



                </div>








                <button 
                class="tf-btn tf-btn--primary">


                    View Product


                </button>






            </div>




        </div>





        `;




        grid.innerHTML += card;



    });





               }
