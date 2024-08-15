'use strict';

const levelSize = vec2(20, 40); // size of play area
const firstRow = 38;
const blockSize = 2.5;
const playerSize = vec2(2)
let player;
let blocks = [];
let lines = [0, 0, 0, 0, 0, 0, 0, 0];
let score=0;
let T=0;

function gameInit() {
    cameraPos = levelSize.scale(.5); // center camera in level
    canvasFixedSize = vec2(720, 1280); // use a 720p fixed size canvas

    player = new Player(10);

    for (let i=0; i<8; i++) {
        blocks[i] = [];
    }

    spawnBlock();
}

function spawnBlock() {
    const col = randInt(0, 8);
    lines[col]++;
    new Block(col*blockSize+blockSize/2, firstRow-lines[col]*blockSize, lines[col]);
}

function gameUpdate() {
    ++T;
    // called every frame at 60 frames per second
    // handle input and update the game state
    if (mouseWasPressed(0)) { // if there is no ball and left mouse is pressed
        console.log("click");
        spawnBlock();

        new Bullet(player.pos.x, player.pos.y);
    }

    if (T/randInt(6,3)%60 === 0) {
        //spawnBlocks();
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
    drawRect(cameraPos, levelSize, new Color(.1,.1,.1)); // draw level boundary
}
function gameRenderPost()
{
    // called after objects are rendered
    // draw effects or hud that appear above all objects
    drawTextScreen("Score " + score, vec2(mainCanvasSize.x/2, 70), 50);
}

// Startup LittleJS Engine
engineInit(gameInit, gameUpdate, gameUpdatePost, gameRender, gameRenderPost);