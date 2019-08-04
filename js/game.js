document.addEventListener("DOMContentLoaded", domLoaded);

function domLoaded() {
    var startBtn = $('#startBtn');
    startBtn.click(startBtnClick);    
}

function moveDuck() {
    var duckDiv = $('#duck');
    duckDiv.removeClass("destroyed");
    duckDiv.addClass("notdestroyed");
    duckDiv.css("visibility", "visible");
    duckDiv.attr("data-energy", "100");

    duckDiv.click(showExplosion);

    var screenDiv = $('#gameScreen');

    console.log(duckDiv);

    var timeout = setInterval(function () { duckAnimate(duckDiv, screenDiv); }, 1000);
    duckDiv.attr("data-interval", timeout);
    return timeout;
}


function duckAnimate(duckDiv, screenDiv) {
    if (isDuckOutOfBounds()) {
        console.log("out of bounds!");
        resetPosition();
    }

    do {
        var direction = randomDirection();
        var distance = randomDistance();
        var animationOk = canAnimate(duckDiv, screenDiv, direction, distance);
    } while (!animationOk);

    duckDiv.animate(randomAnimation(direction, distance), 200);
}

function canAnimate(duck, screen, direction, distance) {

    var trueXdistance = distance;
    var trueYdistance = distance;

    if (direction.charAt(0) === 'N') trueYdistance *= -1;
    if (direction.charAt(1) === 'W') trueXdistance *= -1;        

    if (duck.prop("offsetTop") + trueYdistance <= screen.prop("offsetTop")) return false;
    if (duck.prop("offsetLeft") + trueXdistance <= screen.prop("offsetLeft")) return false;
    if (duck.prop("offsetTop") + duck.prop("offsetHeight") + trueYdistance >= screen.prop("offsetHeight")) return false;
    if (duck.prop("offsetLeft") + duck.prop("offsetWidth") + trueXdistance >= screen.prop("offsetWidth")) return false;

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

function fallDownAnimation(duckDiv, screenDiv) {
    var deltaTop = screenDiv.prop("offsetHeight") - duckDiv.prop("offsetTop") - 50;
    deltaTop = "+=" + deltaTop;

    duckDiv.animate({ 'top': deltaTop }, 200);
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
    return Math.floor(Math.random() * 150) + 1;
}

function showExplosion() {
    var duckDiv = $("#duck");
    var duckEnergy = parseInt(duckDiv.attr("data-energy")) - 5;
    duckDiv.attr("data-energy", duckEnergy);

    var energyBar = $("#energyBar");
    energyBar.css("width", duckEnergy * 0.8 + "%");
    energyBar.text(duckEnergy + "%");

    if (duckEnergy <= 0) { killDuck(); }

    var explosionDiv = $('#explosion');
    explosionDiv.css("visibility", "visible");
    var timeout = setTimeout(function () {
        explosionDiv.css("visibility", "hidden");
    }, 200);
}

function startBtnClick() {
    resetPosition();

    var startButton = $("#startBtn");
    startButton.removeClass("visibleBar");
    startButton.addClass("collapsedBar");

    var energyBar = $("#energyBar");
    energyBar.removeClass("collapsedBar");
    energyBar.addClass("visibleBar");

    energyBar.css("width", "80%");
    energyBar.text("100%");

    moveDuck();
}

function killDuck() {
    var duckDiv = $("#duck");
    var screenDiv = $("#gameScreen");
    duckDiv.off("click");
    clearInterval(parseInt(duckDiv.attr("data-interval")));
    duckDiv.removeClass("notdestroyed");
    duckDiv.addClass("destroyed");
    fallDownAnimation(duckDiv, screenDiv);

    var startButton = $("#startBtn");
    startButton.removeClass("collapsedBar");
    startButton.addClass("visibleBar");

    var energyBar = $("#energyBar");
    energyBar.removeClass("visibleBar");
    energyBar.addClass("collapsedBar");
}

function resetPosition() {
    var duckDiv = $("#duck");
    duckDiv.css("top", "50px");
    duckDiv.css("left", "50px");
}

function isDuckOutOfBounds() {
    var duck = $("#duck");
    var screen = $("#gameScreen");

    if (duck.prop("offsetTop") < screen.prop("offsetTop")) return true;
    if (duck.prop("offsetLeft") < screen.prop("offsetLeft")) return true;
    if (duck.prop("offsetTop") + duck.prop("offsetHeight") > screen.prop("offsetHeight")) return true;
    if (duck.prop("offsetLeft") + duck.prop("offsetWidth") > screen.prop("offsetWidth")) return true;

    return false;
}