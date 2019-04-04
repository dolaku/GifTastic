$(document).ready(function () {

    var items = ['apple', 'banana', 'pie', 'sandwich', 'pizza', 'cake', 'donut', 'steak', 'cheese', 'broccoli', 'avocado', 'ice cream', 'cabbage', '', '', '', '', '', '', '', '', '', '', '', '', '', '',];

    // Event listeners for submit button && enter key
    $("#submit-btn").on("click", function () {
        searchGiphy();
    });

    $(document).on('keypress', function (e) {
        if (e.which == 13) {
            // Prevent page from refreshing
            e.preventDefault();
            searchGiphy();
        }
    });


    // change state of gif - static or active
    $(document).on('click', '.gif', function () {
        var state = $(this).attr("data-state");
        console.log(`Clicked: ${state}`);

        if (state === 'static') {
            $(this)
            .attr('src', $(this).attr("data-animate"))
            .attr('data-state', 'animate');
            console.log(`Clicked change to ${state}`);
        } else {
            $(this)
            .attr('src', $(this).attr("data-static"))
            .attr('data-state', 'static');
            console.log(`Clicked change to ${state}`);
        }
    });


    // ajax call
    function searchGiphy() {
        var addItem = $('#add-item').val().trim();

        // GIPHY API key: jKzhnrJqtR9l5EHmGMzKHL22x5fbUIDA
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
            addItem + "&api_key=jKzhnrJqtR9l5EHmGMzKHL22x5fbUIDA";

        $('#gallery').empty();

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            var results = response.data;

            for (var i = 0; i < results.length; i++) {
                var result = results[i];
                var state = 'static';
                var gifStatic = result.images['480w_still'].url;
                var gifActive = result.images.original.url;
                var rating = result.rating.toUpperCase();
                var title = result.title;

                // update DOM -- add gifs to the gallery
                $('#gallery').append(`
                    <div class="img-wrapper">
                        <img src="${gifStatic}"
                            data-state="static"
                            data-static="${gifStatic}"
                            data-animate="${gifActive}"
                            class="gif"
                            alt="${title}">
                        <span class="text-rating">Rated: ${rating}</span>
                    </div>
                `);
            }
        });
    }



});
