$(document).ready(function () {

    var items = ['banana', 'pizza', 'donut', 'steak', 'cheese', 'veggies', 'avocado', 'ice cream', 'bacon', 'taco', 'egg'];

    var searchTerm;

    // Display items to DOM
    displayItems();

    // loop through items array to create a list
    function displayItems() {
        $('#items-wrapper').empty();

        for (var i = 0; i < items.length; i++) {
            var itemsTransform = items.sort();
            var list = itemsTransform[i];

            $('#items-wrapper').append(`
            <div class="item-btn" data-name="${list}">
                ${list.toUpperCase()}
            </div>
            `)
        };
    }


    // Event listeners - submit button && enter key
    $("#submit-btn").on("click", function () {
        runSearch();
    });

    $(document).on('keypress', function (e) {
        if (e.which == 13) {
            // Prevent page from refreshing
            e.preventDefault();
            runSearch();
        }
    });


    // Listener - search with item buttons
    $(document).on('click', '.item-btn', function () {
        var btnName = $(this).attr('data-name');
        callAPI(btnName);
    });


    // Listener - change state of gif - static or active
    $(document).on('click', '.gif', function () {
        var state = $(this).attr("data-state");

        if (state === 'static') {
            $(this)
                .attr('src', $(this).attr("data-animate"))
                .attr('data-state', 'animate');
        } else {
            $(this)
                .attr('src', $(this).attr("data-static"))
                .attr('data-state', 'static');
        }
    });


    function runSearch() {
        searchTerm = $('#add-item').val().trim();
        callAPI(searchTerm);
        displayItems();
        $('#add-item').val('');
    }
   
    
    // ajax call
    function callAPI(keyword) {
        // GIPHY API key: jKzhnrJqtR9l5EHmGMzKHL22x5fbUIDA
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        keyword + "&api_key=jKzhnrJqtR9l5EHmGMzKHL22x5fbUIDA";
        
        $('#gallery').empty();
                
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            var results = response.data;
    
            for (var i = 0; i < results.length; i++) {
                var result = results[i];
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
