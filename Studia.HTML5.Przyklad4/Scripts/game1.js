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

var grayReady = false;
var grayImage = new Image();
grayImage.onload = function () {
    grayReady = true;
};
grayImage.src = "./Images/gray-fish.png";


var crabReady = false;
var crabImage = new Image();
crabImage.onload = function () {
    crabReady = true;
};
crabImage.src = "./Images/crab.png";


var points = 0;
var level = 1;
var lives = 3;
var fishAmount = 10;
var levelChange = 10;
var monsterAmount = 0;
var time;

// Obiekty
var hero = {
    width: 40,
    height: 30,
    speed: 256 
};

var fishes = [];

var creatFishes = function () {
    fishes = [];
    for (var i = 0; i < fishAmount; i++)
    {
        fishes.push(
            {
                x: Math.floor((Math.random() * (700 - 40)) + 1),
                y: Math.floor((Math.random() * (480 - 30)) + 1),
                width: 40,
                height: 30,
                x_dir: Math.random() >= 0.5,
                y_dir: Math.random() >= 0.5,
                speed: Math.floor((Math.random() * 256) + 1),
                catch: false,
                monsterImage: Math.random() >= 0.5,
                image: ((Math.random() >= 0.5) == true ? fishImage : grayImage),
                friendly: true,
            }
        );
    }
    for (var i = 0; i < monsterAmount; i++) {
        fishes.push(
            {
                x: Math.floor((Math.random() * (700 - 40)) + 1),
                y: Math.floor((Math.random() * (480 - 30)) + 1),
                width: 40,
                height: 30,
                x_dir: Math.random() >= 0.5,
                y_dir: Math.random() >= 0.5,
                speed: Math.floor((Math.random() * 256) + 1),
                catch: false,
                monsterImage: Math.random() >= 0.5,
                image: crabImage,
                friendly: false,
            }
        );
    }
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
var reset = function ()
{
    if (hero.x == null)
    {
        hero.x = canvas.width / 2;
        hero.y = canvas.height / 2;
    }
};

// Logika ruchu
var update = function (modifier) {
    if (38 in keysDown) { // Góra
        if (hero.y - (hero.speed * modifier) > 0)
        {
            hero.y -= hero.speed * modifier;
        }
    }
    if (40 in keysDown)
    { 
        if (hero.y + (hero.speed * modifier) < 450)
        {
            hero.y += hero.speed * modifier;
        }
    }
    if (37 in keysDown)
    { 
        if (hero.x - (hero.speed * modifier) > 0)
        {
            hero.x -= hero.speed * modifier;
        }
    }
    if (39 in keysDown)
    { 
        if (hero.x + (hero.speed * modifier) < 660)
        {
            hero.x += hero.speed * modifier;
        }
    }
    

    for (var i = 0; i < fishAmount + monsterAmount; i++)
    {
        if (fishes[i].x_dir == true)
        {
            if (fishes[i].x + fishes[i].speed * modifier < 700) {
                fishes[i].x += fishes[i].speed * modifier
            }
            else {
                fishes[i].x = 0;
            }
        }
        else
        {
            if (fishes[i].x - fishes[i].speed * modifier > 0) {
                fishes[i].x -= fishes[i].speed * modifier
            }
            else {
                fishes[i].x = 700 - 40;
            }
        }
    }
    reset();
};

var detectColision = function () {
    if (lives != 0) {
        for (var i = 0; i < fishAmount + monsterAmount; i++) {
            if (Math.abs(fishes[i].y - hero.y) < 30 && Math.abs(fishes[i].x - hero.x) < 40 && fishes[i].catch == false) {
                if (fishes[i].friendly == true) {
                    fishes[i].catch = true;
                    points++;
                    if (points == levelChange) {
                        level++;
                        monsterAmount++;
                        fishAmount--;
                        levelChange += fishAmount;
                        creatFishes();
                    }
                }
                else {
                    if (lives == 1) {
                        lives--;
                    }
                    else {
                        lives--;
                        hero.x = canvas.width / 2;
                        hero.y = canvas.height / 2;
                    }
                }
            }
        }
    }
};

// Wyświetlanie
var render = function () {
    if (bgReady) {
        ctx.drawImage(bgImage, 0, 0);
    }

    if (heroReady) {
        ctx.drawImage(heroImage, hero.x, hero.y, hero.width, hero.height);
    }

    if (fishReady) {
        for (var i = 0; i < fishAmount + monsterAmount; i++)
        {
            if (fishes[i].catch == false)
            {
                ctx.drawImage(fishes[i].image, fishes[i].x, fishes[i].y, fishes[i].width, fishes[i].height);
            }
        }
    }

    // Tablica wyników
    ctx.fillStyle = "rgb(250, 250, 250)";
    ctx.font = "24px Helvetica";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText("Lives: " + lives + ", Level: " + level + ", Points: " + points, 32, 32);
};

var gameOver = function () {

    if (lives == 0)
    {
        ctx.font = "30px Comic Sans MS";
        ctx.fillStyle = "red";
        ctx.textAlign = "center";
        ctx.fillText("GAME OVER", canvas.width / 2, canvas.height / 2); 
    }
};

var main = function () {
    var now = Date.now();
    var delta = now - then;

    update(delta / 1000);

    detectColision();

    render();

    gameOver();

    then = now;
};

reset();
creatFishes();
var then = Date.now();
setInterval(main, 1);