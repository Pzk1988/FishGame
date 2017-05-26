// Utworzenie obiektu canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 700;
canvas.height = 480;
document.body.appendChild(canvas);

// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
    bgReady = true;
};
bgImage.src = "./Images/seaweed.png";

// Hero image
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
    heroReady = true;
};
heroImage.src = "./Images/blue-fish.png";

// Monster image
var fishReady = false;
var fishImage = new Image();
fishImage.onload = function () {
    fishReady = true;
};
fishImage.src = "./Images/green-fish.png";

var points = 50;
var level = 1;
var lives = 3;

// Obiekty
var hero = {
    width: 40,
    height: 30,
    speed: 256 // prędkość ruchu naszej ryby
};

// Reakcja na zdarzenia naciśnięcia klawisza
var keysDown = {};

addEventListener("keydown", function (e) {
    keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
    delete keysDown[e.keyCode];
}, false);

// Trzeba sprawdzić, czy ryby nie zostały złapane
var reset = function () {
    if (hero.x == null) {
        hero.x = canvas.width / 2;
        hero.y = canvas.height / 2;
    }
};

// Logika ruchu
var update = function (modifier) {
    if (38 in keysDown) { // Góra
        hero.y -= hero.speed * modifier;
    }
    if (40 in keysDown) { // Dół
        hero.y += hero.speed * modifier;
    }
    if (37 in keysDown) { // Lewo
        hero.x -= hero.speed * modifier;
    }
    if (39 in keysDown) { // Prawo
        hero.x += hero.speed * modifier;
    }

    level = Math.ceil(points) / 50;
    reset();
};

// Wyświetlanie
var render = function () {
    if (bgReady) {
        ctx.drawImage(bgImage, 0, 0);
    }

    if (heroReady) {
        ctx.drawImage(heroImage, hero.x, hero.y, hero.width, hero.height);
    }

    // Tablica wyników
    ctx.fillStyle = "rgb(250, 250, 250)";
    ctx.font = "24px Helvetica";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText("Lives: " + lives + ", Level: " + level + ", Points: " + points, 32, 32);
};

var main = function () {
    var now = Date.now();
    var delta = now - then;

    update(delta / 1000);
    render();

    then = now;
};

reset();
var then = Date.now();
setInterval(main, 1);