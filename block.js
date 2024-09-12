'use strict';

class Block extends EngineObject
{
    /** Create a block
     *  @param {Vector2} pos - World space position of the block
     *  @param {Number} num - Health value for the block
     *  @param {Number} levelCol - Column the block is positioned in the level array */
    constructor(pos, num, levelCol, type=1)
    {
        super(pos, vec2(blockSize));
        this.num = num;
        this.levelCol = levelCol;
        this.type = type;
        this.setCollision();

        if (this.type === 3)
            this.velocity = vec2(0,-.25);
    }

    update() {
        if (this.pos.y < 0)
            this.destroy();

        super.update();
    }

    render() {
        drawRect(this.pos, this.size, blockColor); // for border

        if (this.type === 2) { // solid block
            drawRect(this.pos, vec2(blockSize*0.85,blockSize*0.85), blockColor); // block color
        } else {
            drawRect(this.pos, vec2(blockSize*0.85,blockSize*0.85), bgColor); // block color
            drawText(this.num, vec2(this.pos.x, this.pos.y - 0.1), blockSize * 0.7, textColor); // block number
        }
    }

    collideWithObject(o) {
        //if (o.constructor.name === "Block") {
        //    this.velocity = vec2(0);
        //    return 1;
        //}

        if (o === player) {
            lostTimer.set(0.1);
            this.destroy();
            lostTimer.set(1);
            stageTimer.set(2);
            state = "lost";
        }

        if (o.constructor.name === "Bullet") {
            let totalScore = 100;
            let p = 0;
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

                if (!isMuted) sound_hit.play(this.pos);
            }

            if (this.type === 3)
                p += 500;

            if (this.num < 1 || o.type === "hard" || this.type === 3) {
                // this is how we calculate the column
                //lines[(this.pos.x - blockSize/2) / blockSize]--;
                p += 100;

                this.destroy();
                new Points(this.pos, "+" + p);

                score += p;
            }

            return 1;
        } 
    }

    destroy() {
        const index = level[this.levelCol].indexOf(this);
        if (index > -1) { // only splice array when item is found
            level[this.levelCol].splice(index, 1); // 2nd parameter means remove one item only
        }

        super.destroy();

        // create explosion effect
        const color = blockColor;
        new ParticleEmitter(
            this.pos, 0,            // pos, angle
            this.size, .1, 200, PI, // emitSize, emitTime, emitRate, emiteCone
            0,                      // tileInfo
            color, color,                       // colorStartA, colorStartB
            color.scale(1,0), color.scale(1,0), // colorEndA, colorEndB
            .2, .5, 1, .08, .1,  // time, sizeStart, sizeEnd, speed, angleSpeed
            .99, .95, .4, PI,   // damp, angleDamp, gravity, cone
            .1, .8, 0, 1        // fade, randomness, collide, additive
        );
        
        if (!isMuted) sound_destroy.play(this.pos);
    }
}