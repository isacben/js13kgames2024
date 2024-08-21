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

let level, score, state, lostTimer, spawnBlockTimer, player;

function gameInit() {
    cameraPos = levelSize.scale(.5); // center camera in level
    canvasFixedSize = vec2(720, 1280); // use a 720p fixed size canvas

    // same as: level = [[], [], [], [], [], [], [], []];
    level = Array.from(Array(8), () => []);

    score = 0;
    lostTimer = new Timer;
    spawnBlockTimer = new Timer;

    state = "play";
    player = new Player(18);
}

function gameUpdate() {
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