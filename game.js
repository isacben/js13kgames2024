'use strict';

const levelSize = vec2(20, 40); // size of play area
const firstRow = 36;
const blockSize = 2.0; // ori: 2.5
const columns = 10; // ori: 8
const playerSize = vec2(1.4,2);
const playerInit = vec2(18, 8); // ori: 1.5

const bgColor = new Color(0.047, 0.058, 0.039);
const playerColor = new Color(0.254, 0.917, 0.831);
const blockColor = new Color(1, 0.125, 0.431);
const bulletColor = new Color(0.984, 1, 0.07);
const extraColor = new Color(0.568, 0.003, 0.968);
const textColor = playerColor;

const gameTitle = {
    'U': [
        [1,,1],
        [1,,1],
        [1,,1],
        [1,,1],
        [,1,1]
    ],
    'N': [
        [1,1],
        [1,,1],
        [1,,1],
        [1,,1],
        [1,,1]
    ],
    'B': [
        [1,1,1],
        [1, ,1],
        [1,1],
        [1,,1],
        [1,1,1]
    ],
    'L': [
        [1],
        [1],
        [1],
        [1],
        [1,1,1]
    ],
    'O': [
        [,1,1],
        [1,,1],
        [1,,1],
        [1,,1],
        [1,1]
    ],
    'C': [
        [,1,1],
        [1],
        [1],
        [1],
        [,1,1]
    ],
    'K': [
        [1,,1],
        [1,,1],
        [1,1],
        [1,,1],
        [1,,1]
    ]
}

let lostTimer, spawnBlockTimer, diamondTimer, hardBulletTimer, swipeTimer, fireTimer;
let level, score, state, powerUp, hardBullets, touchStart, touchEnd, player, playBtn;

function gameInit() {
    cameraPos = levelSize.scale(.5); // center camera in level
    canvasFixedSize = vec2(720, 1280); // use a 720p fixed size canvas

    // same as: level = [[], [], [], [], [], [], [], []];
    level = Array.from(Array(columns), () => []);

    lostTimer = new Timer;
    spawnBlockTimer = new Timer;
    swipeTimer = new Timer;
    diamondTimer = new Timer;
    hardBulletTimer = new Timer;
    fireTimer = new Timer;

    score = 0;
    state = "title";
    powerUp = 0;
    hardBullets = 0;
    touchStart = vec2(0,0);
    touchEnd = vec2(0,0);

    player = new Player(playerInit);
    new Wall(vec2(-.5,0), vec2(1,80)) // left
    new Wall(vec2(levelSize.x+.5,levelSize.y), vec2(1,80)) // right
    playBtn = new Button(cameraPos, vec2(6,2), "PLAY");
}

function gameUpdate() {
    switch (state) {
        case "title":
            titleScene();
            if (keyWasPressed(13)) {
                hideButtons(true);
                state = "play";
            }
            break;
        case "play":
            playScene();
            break;
        case "lost":
            lostScene();
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
    drawRect(cameraPos, vec2(21.1,50), playerColor); // draw external border 
    drawRect(cameraPos, vec2(21,50), bgColor); // draw black area between borders border
    drawRect(cameraPos, vec2(20.2,50), blockColor); // draw internal border 
    drawRect(cameraPos, vec2(20.1,50), bgColor); // draw internal black border 
}
function gameRenderPost() {
    // called after objects are rendered
    // draw effects or hud that appear above all objects
    switch (state) {
        case "title":
            titleScene();
            break;
        case "play":
            drawTile(vec2(1,38.5),vec2(1.2),tile(2), extraColor);
            drawTextScreen("x " + hardBullets, vec2(130, 45), 40, playerColor);
            drawTextScreen(
                score.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " "),
                vec2(mainCanvasSize.x - 55, 48),
                50, playerColor,
                undefined, undefined,
                "right"
            );
            break;
    }
}

// Startup LittleJS Engine
engineInit(gameInit, gameUpdate, gameUpdatePost, gameRender, gameRenderPost);