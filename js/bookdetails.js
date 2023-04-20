$.urlParam = function (name) {
  var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
  return results[1] || 0;
}
var isbnno = $.urlParam('isbn');


$(document).ready(function () {
  $.ajax({
    url: "https://bbc-backend.onrender.com/get-book-details/",
    type: "GET",
    data: { isbn: isbnno },
    contentType: "application/json",
    success: function (response) {
      var book_details = response["Book-Details"][0];
      console.log(book_details);
      var book_recommendation = response["Book-Recommendation"];

      $("#bookImage").attr("src", book_details["Image-URL-L"]);
      $("#bookImage").attr("alt", book_details["Book-Title"]);
      $(".book-title").text(book_details["Book-Title"]);
      $(".book-details").text("ISBN: " + book_details["ISBN"]);
      $(`<p>Author: ${book_details["Book-Author"]}</p>`).appendTo(
        $(".book-details")
      );
      $(`<p>Published by: ${book_details["Publisher"]}</p>`).appendTo(
        $(".book-details")
      );
      $(
        `<p>Year of Publication: ${book_details["Year-Of-Publication"]}</p>`
      ).appendTo($(".book-details"));
      $(".book-rating").text(book_details["Average Ratings"].toFixed(2));
      $(`<p>${book_details["Number of Ratings"]}</p>`).appendTo(
        $(".book-rating")
      );

      book_recommendation.forEach(function (ele) {
        let card = $($("#book-card").html());
        card.find(".card-img-top").attr("src", ele["Image-URL-L"]);
        card.find(".card-title").text(ele["Book-Title"]);
        card.find(".card-text").text(ele["Book-Author"]);
        card.find(".book-link").attr("href", "bookdetails.html?isbn=" + ele["ISBN"]);

        $(".row").append(card);
      });

      //   $.each(book_recommendation, function (index, value) {
      //     console.log("response here");
      //     console.log(index);
      //     console.log(value);

      //     var title = value["Book-Title"];
      //     var author = value["Book-Author"];
      //     var isbn = value["ISBN"];
      //     var img_url = value["Image-URL-L"];
      //     var publisher = value["Publisher"];
      //     $(
      //       ".carousel .container .row .card-container .card .card-img-top .img-fluid"
      //     ).attr("src", img_url);

      //     // console.log(title, author);
      //   });
    },
    error: function (errorMessage) {
      alert(errorMessage.responseJSON["detail"]);
    },
  });
});

(function ($) {
  "use strict";

  // manual carousel controls
  $(".next").click(function () {
    $(".carousel").carousel("next");
    return false;
  });
  $(".prev").click(function () {
    $(".carousel").carousel("prev");
    return false;
  });
})(jQuery);
