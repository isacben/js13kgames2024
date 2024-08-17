'use strict';

const levelSize = vec2(20, 40); // size of play area
const firstRow = 38;
const blockSize = 2.5;
const playerSize = vec2(1.4,2);

let lines = [0, 0, 0, 0, 0, 0, 0, 0]; // the vertical lines
let score=0;
let T=0;
let player;
let state;
let lostTimer;

// colors
const bgColor = new Color(0.2, 0.0, 0.2);
const playerColor = new Color(0.3, 1, 1);
const bulletColor = new Color(0.3, 1, 1);

function gameInit() {
    cameraPos = levelSize.scale(.5); // center camera in level
    canvasFixedSize = vec2(720, 1280); // use a 720p fixed size canvas

    lostTimer = new Timer;

    state = "splash";
    player = new Player(10);
}

function resetGame() {
    score = 0;
    lines = [0, 0, 0, 0, 0, 0, 0, 0];
}

function spawnBlock() {
    const col = randInt(0, 8);
    lines[col]++;
    new Block(col*blockSize+blockSize/2, firstRow-lines[col]*blockSize, lines[col]);
}

function gameUpdate() {
    T++;
    // called every frame at 60 frames per second
    // handle input and update the game state

    switch (state) {
        case "splash":
            splashScreen();
            if (keyWasPressed(13)) {
                state = "play";
            }
            break;
        case "play":
            if (mouseWasPressed(0) || keyWasPressed(32)) { // if there is no ball and left mouse is pressed
                new Bullet(player.pos.x, player.pos.y);
            }
            if (T/randInt(6,3)%10 === 0) {
                spawnBlock();
            }

            for (let i=0; i<lines.length; i++) {
                if (lines[i] > 12) {
                    lostTimer.set(0.1);
                    state = "lost";
                }
            }
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