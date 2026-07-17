/* ======================================================
   TOFO MARKET - ERROR COMPONENT
   Version: 1.0
====================================================== */


const ToFoError = {


    show: function(targetId, message = "Something went wrong. Please try again.") {


        const target = document.getElementById(targetId);


        if (!target) {

            console.error(
                "Error target not found:",
                targetId
            );

            return;

        }




        target.innerHTML = `

            <div class="tf-error">

                <div class="tf-error__icon">
                    ⚠️
                </div>


                <h3>
                    Oops!
                </h3>


                <p>
                    ${message}
                </p>



                <button 
                class="tf-btn tf-btn--primary"
                onclick="location.reload()">

                    Try Again

                </button>


            </div>

        `;


    }

};





// Global access

window.ToFoError = ToFoError;
