/* ======================================================
   TOFO MARKET - HOME PAGE LOGIC
   Version: 1.0

   Handles:
   - Product loading
   - Product rendering
   - Data connection
====================================================== */


document.addEventListener(
    "DOMContentLoaded",
    function () {

        loadProducts();

    }
);





function loadProducts() {


    const productGrid =
        "product-grid";


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




        },500);





    }

    catch(error) {


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




                <strong>

                    ${product.price}
                    ${product.currency}

                </strong>




                <span>

                    📍 ${product.location}

                </span>




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
