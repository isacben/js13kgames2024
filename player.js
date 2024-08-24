'use strict';

class Player extends EngineObject
{
    /** Player object
     *  @param {Number} x - World space x position of the player */
    constructor(x)
    {
        super(vec2(x, 1.5), playerSize, tile(0)); // set object position and size
        this.setCollision();
        this.color = playerColor;
    }

    //collideWithObject(o) {
    //    this.destroy();
    //    return 1;
    //}

    update() {
        this.pos.x = lerp(0.1, this.pos.x, mousePos.x); // move paddle to mouse
        
        // clamp balls to level size
        this.pos.x = clamp(this.pos.x, this.size.x/2, levelSize.x - this.size.x/2);
    }
}