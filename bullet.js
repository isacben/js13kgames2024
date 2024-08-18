'use strict';

class Bullet extends EngineObject {
    constructor(x, y, velocity=vec2(0, 0.8), type="normal") {
        super(vec2(x, y + 1), vec2(1), tile(1));
        this.velocity = velocity;
        this.color = bulletColor;
        this.type = type;
        this.setCollision();
    }

    update() {
        if (this.pos.y > 40) {
            this.destroy();
        }

        if (this.type === "hard") {
            const color = bulletColor;
            new ParticleEmitter(
                this.pos.subtract(vec2(0,2)), PI,            // pos, angle
                this.size, .1, 50, PI, // emitSize, emitTime, emitRate, emiteCone
                tile(1,16),                      // tileInfo
                color, color,                       // colorStartA, colorStartB
                color.scale(1,0), color.scale(1,0), // colorEndA, colorEndB
                .2, .1, .4, .1, 0,  // time, sizeStart, sizeEnd, speed, angleSpeed
                1, 0, 5, PI,   // damp, angleDamp, gravity, cone
                .1, .4, 0, 0        // fade, randomness, collide, additive
            );
        }

        // update physics
        super.update();
    }

    collideWithObject(o) {
        if (this.type === "normal" && o.constructor.name === "Block"){
            this.destroy();
        }

        return 0;
    }
}