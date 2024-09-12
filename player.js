'use strict';

class Player extends EngineObject
{
    /** Player object
     *  @param {Vector2} pos - World space position of the player */
    constructor(pos)
    {
        super(pos, playerSize, tile(0)); // set object position and size
        this.setCollision();
        this.color = playerColor;
    }

    collideWithObject(o) {
        if (o.constructor.name === "Block") {
            this.destroy();
            
            const color = playerColor;
            new ParticleEmitter(
                this.pos, 0,            // pos, angle
                this.size, .1, 200, PI, // emitSize, emitTime, emitRate, emiteCone
                tile(1),                      // tileInfo
                color, color,                       // colorStartA, colorStartB
                color.scale(1,0), color.scale(1,0), // colorEndA, colorEndB
                .8, .2, 1.5, .3, .1,  // time, sizeStart, sizeEnd, speed, angleSpeed
                .8, .5, .1, PI,   // damp, angleDamp, gravity, cone
                .5, .3, 0, 1        // fade, randomness, collide, additive
            );

            return 1;
        }
    }

    update() {
        this.pos.x = lerp(0.1, this.pos.x, mousePos.x); // move paddle to mouse
        
        // clamp player to level size
        this.pos.x = clamp(this.pos.x, this.size.x/2, levelSize.x - this.size.x/2);
    }
}