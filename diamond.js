'use strict';

class Diamond extends EngineObject

{
    /** Create a diamond 
     *  @param {Vector2} pos - World space position of the bullet
     *  @param {Number} amount - Number of times the powerUp will be increased */
    constructor(pos, amount=1) {
        super(pos, vec2(2), tile(0));
        this.velocity = vec2(0, -.3);
        this.color = playerColor;
        this.amount = amount;
        this.renderOrder = 500;    
    }

    update() {
        if (this.pos.y < 2.5)
            this.setCollision();

        if (this.pos.y < -1)
            this.destroy();
    
        super.update();
    }

    collideWithObject(o) {
        if (o === player){
            this.destroy();
            powerUp += this.amount;
        }
        return 0;
    }

   // sparkles() {
   //     const color = bulletColor;
   //     new ParticleEmitter(
   //         this.pos.subtract(vec2(0,.5)), PI,            // pos, angle
   //         this.size, .1, 50, PI, // emitSize, emitTime, emitRate, emiteCone
   //         tile(1,16),                      // tileInfo
   //         color, color,                       // colorStartA, colorStartB
   //         color.scale(1,0), color.scale(1,0), // colorEndA, colorEndB
   //         .2, .1, .4, .1, 0,  // time, sizeStart, sizeEnd, speed, angleSpeed
   //         1, 0, 5, PI,   // damp, angleDamp, gravity, cone
   //         .1, .4, 0, 0        // fade, randomness, collide, additive
   //     );
   // }
}