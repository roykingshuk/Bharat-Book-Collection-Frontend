import Cookies from '../vendor/jquery/js.cookie.min.mjs';

$(document).ready(function () {

    /*==================================================================
    [ Focus Contact2 ]*/
    $('.input100').each(function(){
        $(this).on('blur', function(){
            if($(this).val().trim() != "") {
                $(this).addClass('has-val');
            }
            else {
                $(this).removeClass('has-val');
            }
        })    
    })
  
  
    /*==================================================================
    [ Validate ]*/
    var input = $('.validate-input .input100');

    $('.validate-form').on('submit',function(e){
        e.preventDefault();
        var check = true;

        for(var i=0; i<input.length; i++) {
            if(validate(input[i]) == false){
                showValidate(input[i]);
                check=false;
            }
        }
        if (check == false)
            return false;

        $.ajax({
            url: 'https://bbcbackend-1-q7585685.deta.app/login/',
            type: 'POST',
            data: JSON.stringify({
                username: $('#username').val(),
                password: $('#pass').val()
            }),
            contentType: 'application/json',
            success: function(response) {
                var result = response[0];
                Object.keys(result).forEach(function(key) {
                    Cookies.set(key, result[key]);
                });
                window.location.href = "dash.html";
            },
            error: function(response) {
                alert(response.responseJSON.detail);
            }
        });
    });


    $('.validate-form .input100').each(function(){
        $(this).focus(function(){
           hideValidate(this);
        });
    });

    $('.signup-form').on("submit", function(e){
        e.preventDefault();
        if ($('#password').val() != $('#confirm-password').val()) {
            alert("Password and Confirm Password field does not match!");
            return false;
        }
        $.ajax({
            url: 'https://bbcbackend-1-q7585685.deta.app/signup/',
            type: 'POST',
            data: JSON.stringify({
                username: $('#username').val(),
                name: $('#name').val(),
                email: $('#email').val(),
                password: $('#password').val(),
                age: $('#age').val(),
                gender: $('input[name="gen"]:checked').val()
            }),
            contentType: 'application/json',
            success: function(response) {
                alert(response[0].message);
                window.location.href = "login.html";
            },
            error: function(response) {
                alert(response.responseJSON.detail);
            }
        });
    });
});

function validate (input) {
        if($(input).val().trim() == ''){
            return false;
        }
}

function showValidate(input) {
    var thisAlert = $(input).parent();

    $(thisAlert).addClass('alert-validate');
}

function hideValidate(input) {
    var thisAlert = $(input).parent();

    $(thisAlert).removeClass('alert-validate');
}