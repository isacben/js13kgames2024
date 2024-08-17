'use strict';

class Block extends EngineObject {
    constructor(posX, posY, num) {
        super(vec2(posX, posY), vec2(blockSize));
        this.setCollision();
        this.color = new Color (1, 0, 0)
        this.num = num;
    }

    render() {
        //drawRect(this.pos, this.size, new Color(.1,.1,.1)); // for border
        drawRect(this.pos, this.size, new Color(0.3,1.0,1.0)); // for border
        drawRect(this.pos, vec2(blockSize*0.95,blockSize*0.95), bgColor); // block color
        drawText(this.num, vec2(this.pos.x, this.pos.y - 0.1), blockSize * 0.7, new Color(0.6, 0.2, 1)); // block number
    }

    collideWithObject(o) {
        ++score
        this.num -= 1;

        if (this.num < 1) {
            // this is how we calculate the column
            lines[(this.pos.x - blockSize/2) / blockSize]--;
            this.destroy();
        }
        return 0;
    }
}