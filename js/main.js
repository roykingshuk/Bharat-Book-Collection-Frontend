import Cookies from 'https://cdn.jsdelivr.net/npm/js-cookie@3.0.1/+esm';

$(document).ready(function () {
    stopLoader();
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
        let loginLoading = `
            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Logging in...
        `;
        $("#login-btn").html(loginLoading);

        var check = true;

        for(var i=0; i<input.length; i++) {
            if(validate(input[i]) == false){
                showValidate(input[i]);
                check=false;
            }
        }
        if (check == false) {
            $("#login-btn").text("Login");
            return false;
        }

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
                window.location.href = "index.html";
            },
            error: function(response) {
                $("#login-btn").text("Login");
                Swal.fire({
                    icon: 'error',
                    title: 'Authorization Failed!',
                    text: response.responseJSON.detail
                });
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

        let signupLoading = `
            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Signing up...
        `;
        $("#signupBtn").html(signupLoading);

        if ($('#password').val() != $('#confirm-password').val()) {
            $("#signupBtn").text("Sign Up");
            Swal.fire({
                icon: 'error',
                title: 'Signup Failed',
                text: "Password and Confirm Password fields does not match!"
            });
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
                Swal.fire({
                    icon: 'success',
                    title: 'Signup Successful',
                    text: response[0].message,
                    showCancelButton: true,
                    confirmButtonText: 'Go to Login'
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.href = "login.html";
                    } else {
                        $("#signupBtn").text("Sign Up");
                    }
                });
            },
            error: function(response) {
                $("#signupBtn").text("Sign Up");
                Swal.fire({
                    icon: 'error',
                    title: 'Signup Failed',
                    text: response.responseJSON.detail
                });
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