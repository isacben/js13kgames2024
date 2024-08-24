'use strict';

const levelSize = vec2(20, 40); // size of play area
const firstRow = 35;
const blockSize = 2.5;
const playerSize = vec2(1.4,2);

const bgColor = new Color(0.047, 0.058, 0.039);
const playerColor = new Color(0.254, 0.917, 0.831);
const blockColor = new Color(1, 0.125, 0.431);
const bulletColor = new Color(0.984, 1, 0.07);
const textColor = playerColor;

let level, score, state, lostTimer, spawnBlockTimer, diamondTimer, powerUp, player;

function gameInit() {
    cameraPos = levelSize.scale(.5); // center camera in level
    canvasFixedSize = vec2(720, 1280); // use a 720p fixed size canvas

    // same as: level = [[], [], [], [], [], [], [], []];
    level = Array.from(Array(8), () => []);

    score = 0;
    lostTimer = new Timer;
    spawnBlockTimer = new Timer;
    diamondTimer = new Timer;

    state = "play";
    player = new Player(18);
    powerUp = 0;

    new Wall(vec2(-.5,0), vec2(1,80)) // left
    new Wall(vec2(levelSize.x+.5,levelSize.y), vec2(1,80)) // right
}

function gameUpdate() {
    switch (state) {
        case "splash":
            splashScene();
            if (keyWasPressed(13)) {
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
        case "splash":
            splashScene();
            break;
        case "play":
            drawTextScreen(
                score.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " "),
                vec2(mainCanvasSize.x - 55, 65),
                50, playerColor,
                undefined, undefined,
                "right"
            );
            break;
    }
}

// Startup LittleJS Engine
engineInit(gameInit, gameUpdate, gameUpdatePost, gameRender, gameRenderPost);