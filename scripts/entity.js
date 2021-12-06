//Basic game entity. This will be imported to multiple game objects

let gEntity = 
{
    //use spritesheet or just a plain image. spritesheet will be used each time
    spriteSheet: null,
    position: {x: 0, y: 0},
    velocity: {x: 0, y: 0},
    frameData: {frameName: '', frame: 0, frameSpeed: 1, frameChangeCounter: 0, frameX: 0, frameY: 0, frameWidth: 1, frameHeight: 1},
    size: {width: 1, height: 1},
    isVisible: false,
    maxSpeed: 2,
    friction: 0.1,
    init: function(spritePath, newPos, newVel)
    {
        this.isVisible = true;
        this.spriteSheet = new Image();
        this.spriteSheet.src = spritePath;
        this.position = newPos;
        this.velocity = newVel;
    },
    setFrames: function(currentFrameName, currentFrame, currentFrameSpeed, currentFrameChangeCounter, currentFramePosX, currentFramePosY, currentFrameWidth, currentFrameHeight)
    {
        this.frameData =
        {
            frameName: currentFrameName,
            frame: currentFrame,
            frameSpeed: currentFrameSpeed,
            frameChangeCounter: currentFrameChangeCounter,
            frameX: currentFramePosX,
            frameY: currentFramePosY,
            frameWidth: currentFrameWidth,
            frameHeight: currentFrameHeight
        };
    },
    serializeVector2: function(v2x, v2y)
    {
        return {x: v2x, y: v2y};
    },
    update: function()
    {
        //logic to be overriden
    },
    serializeObjectToDraw: function()
    {
        // return a serialized object to draw.
        /*
        must include
        properties: sprite, sourceX, sourceY, sourceWidth, sourceHeight, posX, posY, drawWidth, drawHeight
         */
        return {
            sprite: this.spriteSheet,
            sourceX: this.frameData.frameX,
            sourceY: this.frameData.frameY,
            sourceWidth: this.frameData.frameWidth,
            sourceHeight: this.frameData.frameHeight,
            posX: this.position.x,
            posY: this.position.y,
            drawWidth: this.size.width,
            drawHeight: this.size.height
        };
    },
    clampVelocity: function()
    {
        // this keeps velocity in ranges of -maxSpeed to maxSpeed.
        this.velocity.x = (this.velocity.x > this.maxSpeed) ? this.maxSpeed : this.velocity.x;
        this.velocity.x = (this.velocity.x < (this.maxSpeed - this.maxSpeed * 2)) ? (this.maxSpeed - this.maxSpeed * 2) : this.velocity.x;
    },
    applyFriction: function()
    {
        //todo: does not apply if in air

        // make sure we check if this sends us into the other direction and use 0 instead
        if (this.velocity.x > 0)
        {
            this.velocity.x = (this.velocity.x - this.friction < 0) ? 0 : this.velocity.x - this.friction;
        } else if (this.velocity.x < 0)
        {
            this.velocity.x = (this.velocity.x + this.friction > 0) ? 0 : this.velocity.x + this.friction;
        }
    }
}