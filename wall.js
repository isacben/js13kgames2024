'use strict';

class Wall extends EngineObject
{
    /** Create a wall 
     *  @param {Vector2} pos - World space position of the wall
     *  @param {Vector2} size - Size of the wall */
    constructor(pos, size) {
        super(pos, size);
        this.setCollision();
        this.wall = true;
        this.mass = 0;
        this.color = new Color(0, 0, 0, 0); // make invisible
    }
}