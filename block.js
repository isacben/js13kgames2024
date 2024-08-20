'use strict';

class Block extends EngineObject {
    constructor(posX, posY, num, levelPos, levelCol) {
        super(vec2(posX, posY), vec2(blockSize));
        this.setCollision();
        this.mass = 0;
        this.friction = 1;
        this.elasticity = 0;
        this.collideTiles = true;
        this.collideSolidObjects = true;
        this.isSolid = true;
        this.color = new Color (.5, 0, 0)
        this.num = num;
        this.levelPos = levelPos;
        this.levelCol = levelCol;
    }

    render() {
        //drawRect(this.pos, this.size, new Color(.1,.1,.1)); // for border
        drawRect(this.pos, this.size, blockColor); // for border
        drawRect(this.pos, vec2(blockSize*0.95,blockSize*0.95), bgColor); // block color
        drawText(this.num, vec2(this.pos.x, this.pos.y - 0.1), blockSize * 0.7, textColor); // block number
    }

   // update() {
   //     if (this.pos.y <= firstRow) {
   //         this.velocity = vec2(0, 1);
   //     }
   //     else if (this.pos.y >= firstRow) {
   //         this.velocity = vec2(0);
   //     }

   //     super.update();
   // }

    collideWithObject(o) {
        if (o.constructor.name === "Block") {
            this.velocity = vec2(0);
            return 1;
        }

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

        if ((this.num < 1 || o.type === "hard")) {
            // this is how we calculate the column
            lines[(this.pos.x - blockSize/2) / blockSize]--;
            //level[this.levelPos] = null;

            const index = level[this.levelCol].indexOf(this);
            if (index > -1) { // only splice array when item is found
                level[this.levelCol].splice(index, 1); // 2nd parameter means remove one item only
            }

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