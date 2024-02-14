// Enter your partners name here
var name = "Sasha";
var brd = document.createElement("DIV");
document.body.insertBefore(brd, document.getElementById("board"));
const duration = 3000;
const speed = 0.5;
const cursorXOffset = 0;
const cursorYOffset = -5;
var hearts = [];


function generateHeart(x, y, xBound, xStart, scale) {
    var heart = document.createElement("DIV");
    heart.setAttribute('class', 'heart');
    brd.appendChild(heart);
    heart.time = duration;
    heart.x = x;
    heart.y = y;
    heart.bound = xBound;
    heart.direction = xStart;
    heart.style.left = heart.x + "px";
    heart.style.top = heart.y + "px";
    heart.scale = scale;
    heart.style.transform = "scale(" + scale + "," + scale + ")";
    if (hearts == null)
        hearts = [];
    hearts.push(heart);
    return heart;
}

function getRandomPosition() {
    const posX = Math.random() * window.innerWidth;
    const posY = Math.random() * window.innerHeight;
    return { x: posX, y: posY };
}

function generateRandomHeart() {
    const position = getRandomPosition();
    var start = 1 - Math.round(Math.random()) * 2;
    var scale = Math.random() * Math.random() * 0.8 + 0.2;
    var bound = 30 + Math.random() * 20;
    generateHeart(position.x, position.y, bound, start, scale);
}

var before = Date.now();
var id = setInterval(frame, 5);

function frame() {
    var current = Date.now();
    var deltaTime = current - before;
    before = current;
    for (i in hearts) {
        var heart = hearts[i];
        heart.time -= deltaTime;
        if (heart.time > 0) {
            heart.y -= speed;
            heart.style.top = heart.y + "px";
            heart.style.left = heart.x + heart.direction * heart.bound * Math.sin(heart.y * heart.scale / 30) + "px";
        } else {
            heart.parentNode.removeChild(heart);
            hearts.splice(i, 1);
        }
    }
}

setInterval(generateRandomHeart, 500);
var firstTime = true;
function toggleGif() {
    if (firstTime) {
        firstTime = false;
    }
    var gif = document.getElementById("heartGif");
    var checkbox = document.getElementById("toggleGif");
    var title = document.getElementById("title");

    // Change the source of the GIF based on the checkbox state
    gif.src = checkbox.checked ? "cat-kiss.gif" : "y2.gif";
    


    // Update the text content based on the checkbox state
    if (checkbox.checked) {
        title.textContent = "With every click, my love for you grows stronger. I love you!";
    } else {
        if (firstTime) {
           title.textContent = `${name}, will you be my valentine?`;
        } else {
            title.textContent = "No backsies!";
        }
    }
    // title.textContent = checkbox.checked ? "With every click, my love for you grows stronger. I love you!" : firstTime == true ? "Sasha, will you be my valentine?" : "No backsies!";
}


// Attach the function to the checkbox change event
document.getElementById("toggleGif").addEventListener("change", toggleGif);

