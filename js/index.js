import Cookies from '../vendor/jquery/js.cookie.min.mjs';

$(document).ready(function () {
    var cookiesVal = Cookies.get();
    if (JSON.stringify(cookiesVal) !== "{}") {
        $('#signupBtn, #loginBtn').remove();
        $('#userLog').removeClass('d-none');
        $('#userLog #navbarDropdown').text(cookiesVal['name']);
        $('#userLog .dropdown-menu').prepend('<li class="dropdown-item">'+'Age: '+cookiesVal['age']+'</li>');
        $('#userLog .dropdown-menu').prepend('<li class="dropdown-item">'+'Gender: '+cookiesVal['gender']+'</li>');
        $('#userLog .dropdown-menu').prepend('<li class="dropdown-item">'+'Email ID: '+cookiesVal['email']+'</li>');
        $('#userLog .dropdown-menu').prepend('<li class="dropdown-item">'+'Username: '+cookiesVal['username']+'</li>');
    } else {
        $('#signupBtn, #loginBtn').removeClass('d-none');
        $('#userLog').remove();
    }

    var colIdentify = ".book-cols:first";
    var cards = $(colIdentify).clone();
    $(cards).removeClass('d-none');
    $(colIdentify).remove();
    
    
    $('#logout').click(function(e){
        e.preventDefault();
        Object.keys(cookiesVal).forEach(function (key) {
            Cookies.remove(key);
        });
        window.location.href = "index.html";
    });

    $.ajax({
        url: "https://bbc-backend.onrender.com/get-top-books/",
        type: "GET",
        data: { perPage: 12 },
        contentType: "applications/json",
        success: function (response) {
        $.each(response, function (index, value) {
            stopLoader();
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
        Swal.fire({
            icon: 'error',
            title: 'Page Load Failed!',
            text: errorMessage.responseJSON["detail"]
        });
    },
  });
});
