function stopLoader(delayStop = 200) {
    $(".book-loader").fadeOut(delayStop, () => {
        $("body").css("overflow", "auto");
        $(".book-loader").remove();
    });
}
