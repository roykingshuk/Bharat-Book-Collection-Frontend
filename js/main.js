import Cookies from '../vendor/jquery/js.cookie.min.mjs';

(function ($) {
    "use strict";


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
                console.log(Cookies.get())
            },
            error: function(response) {
                console.log(response);
                console.log(response.responseJSON.detail);
            }
        });
    });


    $('.validate-form .input100').each(function(){
        $(this).focus(function(){
           hideValidate(this);
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
    

})(jQuery);