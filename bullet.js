'use strict';

class Bullet extends EngineObject {
    constructor(x, y) {
        super(vec2(x, y), vec2(2), tile(0));
        this.velocity = 1;
        this.setCollision();
    }

    update() {
        this.pos.y += this.velocity;
        if (this.pos.y > 40) {
            this.destroy();
        }
    }

    collideWithObject(o) {
        this.destroy();
        return 0;
    }
}