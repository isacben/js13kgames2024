'use strict';

class Points extends EngineObject
{
    /** Create a points animation
     *  @param {Vector2} pos - World space position of the points animation
     *  @param {String} points - The points */
    constructor(pos, points) {
        super(pos);
        this.points = points;
        //this.color = new Color(0.254, 0.917, 0.831);
        this.color = new Color(0.984, 1, 0.07);

        this.time = new Timer;
        this.velocity = vec2(0,.2);
    }

    update() {
        if (!this.time.isSet())
            this.time.set(.4);

        if (this.time.isSet()) {
            this.color.a = 1-this.time.getPercent();
            if (this.time.elapsed())
                this.destroy();
        }

        super.update();
    }

    render() {
        drawText(this.points, this.pos, 1.3, this.color, 0.1, this.color);
    }
}