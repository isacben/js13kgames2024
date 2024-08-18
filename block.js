'use strict';

class Block extends EngineObject {
    constructor(posX, posY, num) {
        super(vec2(posX, posY), vec2(blockSize));
        this.setCollision();
        this.mass = 0;
        this.color = new Color (.5, 0, 0)
        this.num = num;
    }

    render() {
        //drawRect(this.pos, this.size, new Color(.1,.1,.1)); // for border
        drawRect(this.pos, this.size, blockColor); // for border
        drawRect(this.pos, vec2(blockSize*0.95,blockSize*0.95), bgColor); // block color
        drawText(this.num, vec2(this.pos.x, this.pos.y - 0.1), blockSize * 0.7, textColor); // block number
    }

    collideWithObject(o) {
        ++score
        this.num -= 1;

        // create hit effect
        if (this.num!=0) {
            const color = blockColor;
            new ParticleEmitter(
                this.pos.subtract(vec2(0,2)), PI,            // pos, angle
                this.size, .1, 50, PI/2, // emitSize, emitTime, emitRate, emiteCone
                0,                      // tileInfo
                color, color,                       // colorStartA, colorStartB
                color.scale(1,0), color.scale(1,0), // colorEndA, colorEndB
                .2, .1, .4, .1, 0,  // time, sizeStart, sizeEnd, speed, angleSpeed
                1, 0, 1.8, PI,   // damp, angleDamp, gravity, cone
                .1, .4, 0, 0        // fade, randomness, collide, additive
            );
        }

        if (this.num < 1 || o.type === "hard") {
            // this is how we calculate the column
            lines[(this.pos.x - blockSize/2) / blockSize]--;
            this.destroy();

            // create explosion effect
            const color = blockColor;
            new ParticleEmitter(
                this.pos, 0,            // pos, angle
                this.size, .1, 200, PI, // emitSize, emitTime, emitRate, emiteCone
                0,                      // tileInfo
                color, color,                       // colorStartA, colorStartB
                color.scale(1,0), color.scale(1,0), // colorEndA, colorEndB
                .2, .5, 1, .1, .1,  // time, sizeStart, sizeEnd, speed, angleSpeed
                .99, .95, .4, PI,   // damp, angleDamp, gravity, cone
                .1, .5, 0, 1        // fade, randomness, collide, additive
            );
        }
        return 1;
    }
}