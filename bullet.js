'use strict';

class Bullet extends EngineObject
{
    /** Create a bullet
     *  @param {Vector2} pos - World space position of the bullet
     *  @param {Vector2} direction - Direction vector of the bullet
     *  @param {String} type - Type of bullet (normal/hard) */
    constructor(pos, direction=vec2(0, 0.8), type="normal") {
        super(vec2(pos.x, pos.y + 1), vec2(1), tile(1));
        this.velocity = direction;
        this.color = bulletColor;
        this.type = type;
        this.setCollision();
    }

    update() {
        if (this.pos.y > 40) {
            this.destroy();
        }

        if (this.type === "hard")
            this.sparkles();

        // update physics
        super.update();
    }

    collideWithObject(o) {
        if (this.type === "normal" && o.constructor.name === "Block"){
            this.destroy();
        }

        if (o.constructor.name === "Wall") {
            this.sparkles();
            this.destroy();
        }

        return 0;
    }

    sparkles() {
        const color = bulletColor;
        new ParticleEmitter(
            this.pos.subtract(vec2(0,.5)), PI,            // pos, angle
            this.size, .1, 50, PI, // emitSize, emitTime, emitRate, emiteCone
            tile(1,16),                      // tileInfo
            color, color,                       // colorStartA, colorStartB
            color.scale(1,0), color.scale(1,0), // colorEndA, colorEndB
            .2, .1, .4, .1, 0,  // time, sizeStart, sizeEnd, speed, angleSpeed
            1, 0, 5, PI,   // damp, angleDamp, gravity, cone
            .1, .4, 0, 0        // fade, randomness, collide, additive
        );
    }
}