$(document).ready(function () {

    var items = [];

    // Event listeners for submit button && enter key
    $("#submit-btn").on("click", function () {
        searchGiphy();
    });

    $(document).on('keypress',function(e) {
        if(e.which == 13) {
            // Prevent page from refreshing
            e.preventDefault();
            searchGiphy();
        }
    });

    // ajax call
    function searchGiphy() {
        var addItem = $('#add-item').val().trim();

        // GIPHY API key: jKzhnrJqtR9l5EHmGMzKHL22x5fbUIDA
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
            addItem + "&api_key=jKzhnrJqtR9l5EHmGMzKHL22x5fbUIDA";

        $('#gif-wrapper').empty();

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            var results = response.data;

            for (var i = 0; i < results.length; i++) {
                var result = results[i];
                var imgSrc = result.images.original.url;
                var rating = result.rating;

                $('#gif-wrapper').append(`
                    <div class="card w-25 m-3">
                        <img src="${imgSrc}" class="card-img-top" alt="...">
                        <div class="card-body">
                            <p class="card-text">Rating: ${rating}</p>
                        </div>
                    </div>
                `);




            }
        });
    }

});
