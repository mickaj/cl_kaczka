document.addEventListener("DOMContentLoaded", domLoaded);

function domLoaded() {
    $('#startBtn').click(startBtnClick);    
}

function moveDuck() {
    var duckDiv = $('#duck');
    duckDiv.removeClass("destroyed");
    duckDiv.addClass("notdestroyed");
    duckDiv.css("visibility", "visible");
    duckDiv.attr("data-energy", "100");

    duckDiv.click(showExplosion);

    var timeout = setInterval(function () { duckAnimate(); }, 750);
    duckDiv.attr("data-interval", timeout);
    return timeout;
}

function duckAnimate() {
    if (isDuckOutOfBounds()) resetDuckPosition();

    do {
        var direction = randomDirection();
        var distance = randomDistance(200);
        var animationOk = canAnimate(direction, distance);
    } while (!animationOk);

    $("#duck").animate(randomAnimation(direction, distance), 200);
}

function canAnimate(direction, distance) {
    var duck = $("#duck");
    var screen = $("#gameScreen");

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

function showExplosion() {
    var duckDiv = $("#duck");
    var duckEnergy = parseInt(duckDiv.attr("data-energy")) - 5;

    updateEnergy(duckEnergy);

    if (duckEnergy <= 0) { stopGame(); }

    var explosionDiv = $('#explosion');
    explosionDiv.css("visibility", "visible");
    var timeout = setTimeout(function () {
        explosionDiv.css("visibility", "hidden");
    }, 200);
}

function updateEnergy(newValue) {
    $("#duck").attr("data-energy", newValue);

    var energyBar = $("#energyBar");
    energyBar.css("width", newValue * 0.8 + "%");
    energyBar.text(newValue + "%");
}

function startBtnClick() {
    resetDuckPosition();
    showNewEnergyBar();
    moveDuck();
}

function stopGame() {
    destroyDuck();
    fallDownAnimation();
    showStartButton();
}

function destroyDuck() {
    var duckDiv = $("#duck");
    clearInterval(parseInt(duckDiv.attr("data-interval")));
    duckDiv.removeClass("notdestroyed");
    duckDiv.addClass("destroyed");
    duckDiv.off("click");
}

function fallDownAnimation() {
    var duckDiv = $("#duck");
    var screenDiv = $("#gameScreen");

    var deltaTop = screenDiv.prop("offsetHeight") - duckDiv.prop("offsetTop");
    deltaTop = "+=" + deltaTop;

    duckDiv.animate({ 'top': deltaTop }, 200);
}

function resetDuckPosition() {
    var duckDiv = $("#duck");
    duckDiv.css("top", "50px");
    duckDiv.css("left", "50px");
}

function showStartButton() {
    var startButton = $("#startBtn");
    startButton.removeClass("collapsedBar");
    startButton.addClass("visibleBar");

    var energyBar = $("#energyBar");
    energyBar.removeClass("visibleBar");
    energyBar.addClass("collapsedBar");
}

function showNewEnergyBar() {
    var startButton = $("#startBtn");
    startButton.removeClass("visibleBar");
    startButton.addClass("collapsedBar");

    var energyBar = $("#energyBar");
    energyBar.removeClass("collapsedBar");
    energyBar.addClass("visibleBar");

    energyBar.css("width", "80%");
    energyBar.text("100%");
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