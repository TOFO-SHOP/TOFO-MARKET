/* ======================================================
   TOFO MARKET - LOADING COMPONENT
   Version: 1.0
====================================================== */


const ToFoLoading = {


    show: function(targetId, message = "Loading...") {


        const target = document.getElementById(targetId);


        if (!target) {
            console.error(
                "Loading target not found:",
                targetId
            );
            return;
        }



        target.innerHTML = `

            <div class="tf-loading">

                <div class="tf-loading__spinner"></div>

                <p>
                    ${message}
                </p>

            </div>

        `;

    },





    hide: function(targetId) {


        const target = document.getElementById(targetId);


        if (!target) {
            return;
        }


        target.innerHTML = "";

    }



};


// Global access

window.ToFoLoading = ToFoLoading;
