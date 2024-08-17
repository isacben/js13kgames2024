'use strict';

class Player extends EngineObject {
    constructor(posX) {
        super(vec2(posX, 1.5), playerSize, tile(0)); // set object position and size
        this.setCollision();
        this.color = playerColor;
    }

    collideWithObject(o) {
        this.destroy();
        return 1;
    }

    update() {
        // TODO: make movement better
        this.pos.x = lerp(0.1, this.pos.x, mousePos.x); // move paddle to mouse
        
        // clamp balls to level size
        this.pos.x = clamp(this.pos.x, this.size.x/2, levelSize.x - this.size.x/2);

        //console.log(this.pos.x, this.pos.y);
    }
}