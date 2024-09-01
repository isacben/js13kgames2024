'use strict';

class Button extends EngineObject
{
    /** Create a button 
     *  @param {Vector2} pos - World space position of the button
     *  @param {Vector2} size - Size of the button
     *  @param {String} label - Label for the button */
    constructor(pos, size, label) {
        super(pos, size);
        this.color = blockColor;
        this.setCollision();
        this.mass = 0;
        this.label = label;
    }

    render() {
        drawRect(this.pos, this.size, blockColor);
        drawRect(this.pos, this.size.multiply(vec2(.97,.9)), bgColor); // block color
        drawText(this.label, vec2(this.pos.x, this.pos.y - 0.1), this.size.y * 0.5, textColor);
    }

}

class Click extends EngineObject
{
    /** Create click 
     *  @param {Vector2} pos - World space position of the click */
    constructor(pos) {
        super(pos, vec2(.5), tile(1));
        this.color = blockColor;
        this.setCollision();
        this.destroyTimer = new Timer(.1);
    }

    update() {
        if (this.destroyTimer.elapsed())
            this.destroy();

        super.update();
    }
    
    collideWithObject(o) {
        if (o === playBtn) {
            hideButtons(true);
            if (!isMuted) sound_button.play();
            state = "play";
        }

        if (o === soundBtn) {
            isMuted = !isMuted;
            soundBtn.label = isMuted ? "UNMUTE" : "MUTE";

            if (!isMuted) sound_button.play();
        }

        this.destroy();
        return 1; 
    }
}