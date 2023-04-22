import Cookies from 'https://cdn.jsdelivr.net/npm/js-cookie@3.0.1/+esm';

$(document).ready(function () {
    stopLoader();
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
        window.location.href = "dashboard.html";
    });
});