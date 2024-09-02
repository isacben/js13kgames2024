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

// Sound effects
const sound_shot = new Sound([.5,,432,.02,.01,.07,1,.3,-4,-2,,,,,,.2,.01,.93,.17,,-1390]);
const sound_button = new Sound([2.5,,113,.03,.02,.008,1,2.1,,7,141,.13,,,,.4,,.67,.02,.05,-1492]);
const sound_hit = new Sound([2.1,,250,.01,.07,,1,3.5,-4,,,,,1.3,18,.3,.13,.65]);
const sound_destroy = new Sound([.7,,45,.01,.06,.39,,1.7,4,-4,,,,2,,.6,,.44,.13,,-2517]);
const sound_letter = new Sound([1.2,,924,.03,.04,.004,1,2.4,,,403,.06,.01,,,,.01,.56,.02,.28,335]);
const sound_pickup = new Sound([,,306,.03,.08,.06,1,.7,,,258,.04,.04,,,.1,,.89,.04,,258]);

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

let lostTimer, spawnBlockTimer, diamondTimer, hardBulletTimer, swipeTimer, fireTimer, titleTimer;
let level, score, state, powerUp, hardBullets, touchStart, touchEnd, player, playBtn, soundBtn, soundIconBtn, titleLetter, isMuted;

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
    titleTimer = new Timer;

    score = 0;
    state = "title";
    powerUp = 0;
    hardBullets = 0;
    touchStart = vec2(0,0);
    touchEnd = vec2(0,0);
    titleLetter = "B";
    isMuted = false;

    player = new Player(playerInit);
    new Wall(vec2(-.5,0), vec2(1,80)) // left
    new Wall(vec2(levelSize.x+.5,levelSize.y), vec2(1,80)) // right
    playBtn = new Button(cameraPos, vec2(6,2), "PLAY");
    soundBtn = new Button(vec2(cameraPos.x, cameraPos.y - 2.5), vec2(6,2), "MUTE");
    soundIconBtn = new Button(vec2(-5, 1), vec2(2,2), "♫");

    // pause: ⏸ 
}

function gameUpdate() {
    switch (state) {
        case "title":
            titleScene();
            if (keyWasPressed("Enter")) {
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