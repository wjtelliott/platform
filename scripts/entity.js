//Basic game entity. This will be imported to multiple game objects

const ENTITY_MAX_SPEED = 2;
const ENTITY_TERMINAL_FALL = 5;
const ENTITY_FRICTION = 0.2;
const ENTITY_FRICTION_ICE = 0.05;
const ENTITY_GRAVITY = .3;

class gEntity
{
    spriteSheet;
    position;
    velocity;
    frameData;
    size;
    isVisible;
    maxSpeed;
    maxFall;
    friction;
    gravityForce;
    useGravity;
    constructor(spritePath, newPos, newVel)
    {
        this.spriteSheet = new Image();
        this.spriteSheet.src = spritePath;
        this.position = newPos;
        this.velocity = newVel;
        this.frameData = new gFrameData();
        this.size = new gSize(70, 70);
        this.isVisible = true;
        this.maxSpeed = ENTITY_MAX_SPEED;
        this.friction = ENTITY_FRICTION;
        this.useGravity = true;
        this.gravityForce = ENTITY_GRAVITY;
        this.maxFall = ENTITY_TERMINAL_FALL;
    }

    setFrames(currentFrameName, currentFrame, currentFrameSpeed, currentFrameChangeCounter, currentFramePosX, currentFramePosY, currentFrameWidth, currentFrameHeight)
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
    }

    serializeObjectToDraw()
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
    }
}