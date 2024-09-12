'use strict';

function titleScene() {
    if (player.destroyed)
        player = new Player(playerInit);

    fireControl();

    if (keyWasPressed("Enter")) {
        startGame();
    }
    
    if (mouseWasPressed(0)) {
        new Click(mousePos);
    }

    if (song.isPlaying) song.stop();
    
    soundIconBtn.pos = vec2(-5,1);
    soundBtn.label = isMuted ? "UNMUTE" : "MUTE";
}

function playMainTheme() {
    if (!isMuted && !song.playing()) song.play();
}

function playScene() {
    
    fireControl(); 

    if (!playStageTimer.isSet())
        playStageTimer.set(levelData[stage].time);

    if (!spawnBlockTimer.isSet()){
        spawnBlockTimer.set(1);
    }

    if (levelData[stage].fallingTimer && !blockFallTimer.isSet())
        blockFallTimer.set(randInt(0, levelData[stage].fallingTimer))
    
    spawnBlock();
    moveBlocks();

    if (!diamondTimer.isSet())
        diamondTimer.set(2);
    
    spawnDiamond();
    if (!hardBulletTimer.isSet())
        hardBulletTimer.set(5);


    if (mouseWasPressed(0))
        new Click(mousePos);

    soundIconBtn.pos = vec2(1,1);
    soundIconBtn.label = isMuted ? " ̶♫̶" : "♫";

    nextStage();
    isGameOver();
}

function endScene() {
    if (mouseWasPressed(0))
        new Click(mousePos);

    hideButtons(true);
    soundIconBtn.pos.x = -5;
    backBtn.pos.x = cameraPos.x;

    //if (song.isPlaying) song.stop();
}

function endSceneText(text, color) {
    drawTextScreen(text,vec2(mainCanvasSize.x/2, mainCanvasSize.y/4), 50, color);
    drawTextScreen(score.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " "), vec2(mainCanvasSize.x/2, mainCanvasSize.y/3), 40, playerColor);
}

function lostScene() {  
    //if (lostTimer.isSet()) {
    //    if (lostTimer.elapsed()) {
    //        let o = randInt(0, engineObjects.length);
    //        if (engineObjects[o].constructor.name === "Block") {
    //            engineObjects[o].destroy();
    //            lostTimer.set(0.001);
    //        }
    //    }
    //}

    for (let col=0; col<columns; col++){
        for (let row=0; row<level[col].length; row++) {
            level[col][row].destroy();
        }
    }

    if (playStageTimer.isSet())
        playStageTimer.unset();


    if (song.isPlaying) song.stop();

    if (lostTimer.elapsed()) {
        if (!isMuted) gameover_sound.play();
        state = "over";
    }
}

function showStage() {
    drawTextScreen("STAGE " + stage, vec2(mainCanvasSize.x/2, mainCanvasSize.y/5), 45, playerColor);
    
    if (stageTimer.elapsed()) {
        drawLevel(stage);
        playStageTimer.set(levelData[stage].time);
        state = "play";
    }
}

function showProgressBar() {
    drawRect(vec2(0 + 10*playStageTimer.getPercent(),37.3), vec2(20*playStageTimer.getPercent(), .5), bulletColor); // block color
}