$.ajax({
    url: 'https://bbcbackend-1-q7585685.deta.app/signup/',
    type: 'POST',
    data: JSON.stringify({
        uname: $('#uname').val(),
        name: $('#name').val(),
        email: $('#email').val(),
        age: $('#age').val(),
        gen: $('#gen').val(),
        pass1: $('#pass1').val(),
        pass2: $('#pass2').val(),
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