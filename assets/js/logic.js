$(document).ready(function () {

    $("#submit-btn").on("click", function () {
        var addItem = $('#add-item').val().trim();

        // GIPHY API key: jKzhnrJqtR9l5EHmGMzKHL22x5fbUIDA
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
            addItem + "&api_key=jKzhnrJqtR9l5EHmGMzKHL22x5fbUIDA";


        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (data) {
            console.log(data);




        });

    });

});
