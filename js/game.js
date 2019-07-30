document.addEventListener("DOMContentLoaded", domLoaded);

function domLoaded() {
    moveDuck();
}

function moveDuck() {
    var duckDiv = $('#duck');
    var currentX = duckDiv.offsetLeft;
    var currentY = duckDiv.offsetTop;

    var screenDiv = $('#gameScreen');

    //console.log(duckDiv);
    //console.log(screenDiv);

    var timeout = setInterval(function () { duckAnimate(duckDiv, screenDiv); }, 200);
}


function duckAnimate(duckDiv, screenDiv) {
    do {
        var direction = randomDirection();
        var distance = randomDistance();
        var animationOk = canAnimate(duckDiv, screenDiv, direction, distance);
        //if (!animationOk) console.log("movement blocked!");
    } while (!animationOk);
    duckDiv.animate(randomAnimation(direction, distance), 10);

    //console.log("screen Xs: " + screenDiv.prop("offsetLeft") + "x" + screenDiv.prop("offsetWidth"));
    //console.log("screen Yx: " + screenDiv.prop("offsetTop") + "x" + screenDiv.prop("offsetHeight"));
    //console.log("current offsetTop: " + duckDiv.prop("offsetTop"));
    //console.log("current offsetLeft: " + duckDiv.prop("offsetLeft"));
}

function canAnimate(duck, screen, direction, distance) {

    var trueXdistance = distance;
    var trueYdistance = distance;

    if (direction.charAt(0) === 'N') trueYdistance *= -1;
    if (direction.charAt(1) === 'W') trueXdistance *= -1;        

    if (duck.prop("offsetTop") + trueYdistance <= screen.prop("offsetTop")) return false;
    if (duck.prop("offsetLeft") + trueXdistance <= screen.prop("offsetLeft")) return false;
    if (duck.prop("offsetTop") + 50 + trueYdistance >= screen.prop("offsetHeight")) return false;
    if (duck.prop("offsetLeft") + 50 + trueXdistance >= screen.prop("offsetWidth")) return false;

    return true;
}

function randomAnimation(direction, distance) {
    var deltaLeft = "+=0px";
    var deltaTop = "+=0px";

    switch (direction.charAt(0)) {
        case "N":
            deltaTop = `-=${distance}`;
            break;
        case "S":
            deltaTop = `+=${distance}`;
            break;
    }

    switch (direction.charAt(1)) {
        case "E":
            deltaLeft = `+=${distance}`;
            break;
        case "W":
            deltaLeft = `-=${distance}`;
            break;
    }

    return {
        'left': deltaLeft,
        'top': deltaTop
    };
}

function randomDirection() {
    var number = Math.floor(Math.random() * 8) + 1;
    switch (number) {
        case 1: return "N0";
        case 2: return "NE";
        case 3: return "0E";
        case 4: return "SE";
        case 5: return "S0";
        case 6: return "SW";
        case 7: return "0W";
        case 8: return "NW";
    }
}

function randomDistance() {
    return Math.floor(Math.random() * 100) + 1;
}
