$(document).ready(function () {

    var topics = ["Game of Thrones", "Stargate", "The IT Crowd", "The Walking Dead", "Dr. Who", "Red Dwarf", "The Expanse", "The Sopranos", "Sons of Anarchy", "Babylon 5", "Breaking Bad", "Battlestar Galactica", "Fringe", "Cobra Kai", "Mr. Robot", "Star Trek", "The Office", "The Orville", "Family Guy", "Seinfield", "Voltron"]


    // Display buttons for tv shows
    var showButtons = function () {

        $("#tv-display").empty();

        for (var i = 0; i < topics.length; i++) {

            var newButton = $("<button>")
            newButton.attr("data-name", topics[i]);
            newButton.addClass(".tvshow");
            newButton.text(topics[i]);
            $("#tv-display").append(newButton);

        }
    }


    // Click event to add button and add new tvshow to the array
    $("#add-tv").on("click", function (event) {

        event.preventDefault();
        var tvShow = $("#data-name").val().trim();
        topics.push(tvShow);
        console.log(topics);
        showButtons();

    });



    // API function to get display the gif rating and picture

    function displayGif() {

        var gif = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/random?q=" + gif + "api_key=bDsYdUqI28OTcU8KKXSRfP6ppX68ZyXN&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {

            var results = response.data;

            for (var i = 0; i > results.length; i++) {
                
                var imageDiv = $("<div class='gif'>");
                var image = $("<img>").attr("src", imgURL)

            }


        });


    }

    $(document).on("click", ".tvshow", displayGif);

    showButtons();




















});