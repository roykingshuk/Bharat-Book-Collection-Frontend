import Cookies from 'https://cdn.jsdelivr.net/npm/js-cookie@3.0.1/+esm';

$.urlParam = function (name) {
  var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
  return results[1] || 0;
}
var isbnno = $.urlParam('isbn');


$(document).ready(function () {
  var cookiesVal = Cookies.get();
  if (JSON.stringify(cookiesVal) !== "{}") {
    $('#signupBtn, #loginBtn').remove();
    $('#userLog').removeClass('d-none');
    $('#userLog #navbarDropdown').text(cookiesVal['name']);
    $('#userLog .dropdown-menu').prepend('<li class="dropdown-item">' + 'Age: ' + cookiesVal['age'] + '</li>');
    $('#userLog .dropdown-menu').prepend('<li class="dropdown-item">' + 'Gender: ' + cookiesVal['gender'] + '</li>');
    $('#userLog .dropdown-menu').prepend('<li class="dropdown-item">' + 'Email ID: ' + cookiesVal['email'] + '</li>');
    $('#userLog .dropdown-menu').prepend('<li class="dropdown-item">' + 'Username: ' + cookiesVal['username'] + '</li>');
  } else {
    $('#signupBtn, #loginBtn').removeClass('d-none');
    $('#userLog').remove();
  }

  var colIdentify = ".book-cols:first";
  var cards = $(colIdentify).clone();
  $(cards).removeClass('d-none');
  $(colIdentify).remove();


  $('#logout').click(function (e) {
    e.preventDefault();
    Object.keys(cookiesVal).forEach(function (key) {
      Cookies.remove(key);
    });
    window.location.href = "index.html";
  });

  $.ajax({
    url: "https://bbc-backend.onrender.com/get-book-details/",
    type: "GET",
    data: {
      isbn: isbnno
    },
    contentType: "application/json",
    success: function (response) {
      stopLoader();
      var book_details = response["Book-Details"][0];
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
      $(`<span style="margin-left: 6px">${book_details["Average Ratings"].toFixed(2)}/10</span>`).appendTo($('.stars'));
      $(".stars").css({'--rating': book_details["Average Ratings"]})
      // $(`<p>Number Of Ratings: ${book_details["Number of Ratings"]}</p>`).appendTo($(".book-details"));
      document.getElementById("noRating").innerHTML += `<p style: "margin-top: 100px">Number of Ratings: ${book_details["Number of Ratings"]}</p>`;

      book_recommendation.forEach(function (ele) {
        let card = $($("#book-card").html());
        card.find(".card-img-top").attr("src", ele["Image-URL-L"]);
        card.find(".card-title").text(ele["Book-Title"]);
        card.find(".card-text").text(ele["Book-Author"]);
        card.find(".book-link").attr("href", "bookdetails.html?isbn=" + ele["ISBN"]);

        $(".row").append(card);
      });
    },
    error: function (errorMessage) {
      console.log(errorMessage);
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