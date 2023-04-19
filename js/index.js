$(document).ready(function () {
    var colIdentify = ".book-cols:first";
    var cards = $(colIdentify).clone();
    $(cards).removeClass('d-none');
    $(colIdentify).remove();
    $.ajax({
        url: "https://bbc-backend.onrender.com/get-top-books/",
        type: "GET",
        data: { perPage: 12 },
        contentType: "applications/json",
        success: function (response) {
        $.each(response, function (index, value) {
            var bookTitle = value["Book-Title"];
            var img_url = value["Image-URL-L"];
            var rating = value["Average Ratings"].toFixed(2);
            var author = value["Book-Author"];
            var noOfRatings = value["Number of Ratings"];

            $(cards).find(".card-img-top").attr("src", img_url);
            $(cards).find(".card-img-top").attr("alt", bookTitle + " cover");
            $(cards).find(".card-title>a").text(bookTitle);
            $(cards).find(".card-title>a").attr("href", "bookdetails.html?isbn="+value["ISBN"]);
            $(cards).find(".author").text(author);
            $(cards).find(".rating").text(rating);
            $(cards).find(".rating-no").text(noOfRatings);
            $(cards).appendTo($("#book-show"));
            cards = $(colIdentify).clone();
        });
    },
    error: function (errorMessage) {
        console.log(errorMessage);
    },
  });
});
