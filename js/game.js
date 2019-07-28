document.addEventListener("DOMContentLoaded", domLoaded);

function domLoaded() {
    moveDuck();
}

function moveDuck() {
    var duckDiv = $('#duck');
    var currentX = duckDiv.offsetLeft;
    var currentY = duckDiv.offsetTop;

    var timeout = setInterval(function () {
        duckDiv.animate({
            'left': "+=10px",
            'top': "+=10px"
        }, 10);
    }, 15);
}
