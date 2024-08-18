'use strict';

class Bullet extends EngineObject {
    constructor(x, y) {
        super(vec2(x, y + 1), vec2(1), tile(1));
        this.velocity = vec2(0, 0.8);
        this.color = bulletColor;
        this.setCollision();
    }

    update() {
        if (this.pos.y > 40) {
            this.destroy();
        }

        // update physics
        super.update();
    }

    collideWithObject(o) {
        this.destroy();
        return 0;
    }
}