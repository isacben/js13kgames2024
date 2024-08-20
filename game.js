'use strict';

const levelSize = vec2(20, 40); // size of play area
const firstRow = 34;
const blockSize = 2.5;
const playerSize = vec2(1.4,2);

const bgColor = new Color(0.047, 0.058, 0.039);
const playerColor = new Color(0.254, 0.917, 0.831);
const blockColor = new Color(1, 0.125, 0.431);
const bulletColor = new Color(0.984, 1, 0.07);
const textColor = playerColor;

let lines = new Array(8).fill(0); // the vertical lines
let level, l1, l2, l3, l4, l5, l6, l7, l8;
let score=0;
let T=0;
let state;
let lostTimer;
let spawnBlockTimer;
let player;

function gameInit() {
    cameraPos = levelSize.scale(.5); // center camera in level
    canvasFixedSize = vec2(720, 1280); // use a 720p fixed size canvas

    level = new Array(103).fill(null);
    l1 = l2 = l3 = l4 = l5 = l6 = l7 = l8 = [];

    lostTimer = new Timer;
    spawnBlockTimer = new Timer;

    state = "play";
    player = new Player(10);
}

function gameUpdate() {
    T++;

    switch (state) {
        case "splash":
            splashScreen();
            if (keyWasPressed(13)) {
                state = "play";
            }
            break;
        case "play":
            play();
            break;
        case "lost":
            lostScreen();
            break;
    }
}

function gameUpdatePost()
{
    // called after physics and objects are updated
    // setup camera and prepare for render
}

function gameRender()
{
    // called before objects are rendered
    // draw any background effects that appear behind objects
    drawRect(cameraPos, vec2(50), new Color(.5,.5,.5)); // draw background
    drawRect(cameraPos, levelSize, bgColor); // draw level boundary
}
function gameRenderPost() {
    // called after objects are rendered
    // draw effects or hud that appear above all objects
    switch (state) {
        case "splash":
            splashScreen();
            break;
        case "play":
            drawTextScreen("Score " + score, vec2(mainCanvasSize.x/2, 70), 50);
            break;
    }
}

// Startup LittleJS Engine
engineInit(gameInit, gameUpdate, gameUpdatePost, gameRender, gameRenderPost);