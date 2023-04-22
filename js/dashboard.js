import Cookies from 'https://cdn.jsdelivr.net/npm/js-cookie@3.0.1/+esm';

var cards, colIdentify;
var pageCount = 7;

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
    
    $('#logout').click(function(e){
        e.preventDefault();
        Object.keys(cookiesVal).forEach(function (key) {
            Cookies.remove(key);
        });
        window.location.href = "dashboard.html";
    });

    $('.pagination').append(`
        <li class="page-item" id="prevBtn">
            <a class="page-link" href="#">&laquo;</a>
        </li>
    `);
    for (let i = 1; i <= pageCount; i++) {
        $('.pagination').append(`
            <li class="page-item page-no">
                <a class="page-link" href="#">${i}</a>
            </li>
        `);
    }
    $('.pagination').append(`
        <li class="page-item" id="nextBtn">
            <a class="page-link" href="#">&raquo;</a>
        </li>
    `);

    $('.page-no:nth-child(2)').addClass("active");

    $("#prevBtn").on("click", function(e) {
        e.preventDefault();
        if ($('.active').prev().is('.page-no:not(:nth-child(1))')) {
            $('.active').removeClass('active').prev().addClass('active');
            loadBooks(getCurrentPage());
        }
    });
    $("#nextBtn").on("click", function(e) {
        e.preventDefault();
        if ($('.active').next().is('.page-no:not(:last-child)')) {
            $('.active').removeClass('active').next().addClass('active');
            loadBooks(getCurrentPage());
        }
    });
    $(".page-no").on("click", function(e) {
        e.preventDefault();
        $('.active').removeClass("active");
        $(this).addClass("active");
        loadBooks(getCurrentPage());
    });

    loadBooks(1);
});

function loadBooks(pageNo) {
    colIdentify = ".book-cols:first";
    cards = $(colIdentify).clone();
    $(cards).removeClass('d-none');
    $('.book-cols').remove();
    jQuery.ajax({
        url: "https://bbc-backend.onrender.com/get-top-books/",
        type: "GET",
        data: { page: pageNo, perPage: 12 },
        contentType: "applications/json",
        success: function (response) {
        stopLoader();
        $.each(response, function (index, value) {
            var bookTitle = value["Book-Title"];
            var img_url = value["Image-URL-L"];
            var rating = value["Average Ratings"].toFixed(2);
            var author = value["Book-Author"];
            var noOfRatings = value["Number of Ratings"];

            $(cards).find(".card-img-top").attr("src", img_url);
            $(cards).find(".card-img-top").attr("alt", bookTitle + " cover");
            $(cards).find(".card-title>a").text(bookTitle);
            $(cards).find(".card-title>a").attr("title", bookTitle);
            $(cards).find(".card-title>a").attr("href", "bookdetails.html?isbn="+value["ISBN"]);
            $(cards).find(".author").text(author);
            $(cards).find(".rating").text(rating);
            $(cards).find(".rating-no").text("(" + noOfRatings + ")");
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
}

function getCurrentPage() {
    return $('.active').text();
}
