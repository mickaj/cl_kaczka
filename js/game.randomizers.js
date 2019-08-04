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

function randomDistance(maxValue) {
    return Math.floor(Math.random() * maxValue) + 1;
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
