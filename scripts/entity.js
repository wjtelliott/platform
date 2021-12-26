//Basic game entity. This will be imported to multiple game objects

const ENTITY_MAX_SPEED = 2;
const ENTITY_TERMINAL_FALL = 10;
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

    update()
    {
        /*
            When dealing with forces, we will prioritize the following values from entity global or (this.)entity personal:
            gravity: Minimum value
            Terminal fall rate: Maximum value
            Run walk speed: Maximum
            Friction: Minimum
        */
        // gravity and clamp for max speeds. No maximum value on upwards Y clamp
        if (this.useGravity)
            this.velocity.y = gUtil.applyGravity(this.velocity.y, Math.min(this.gravityForce, ENTITY_GRAVITY));
        this.velocity.y = gUtil.clampVelocity(Math.max(this.maxFall, ENTITY_TERMINAL_FALL), this.velocity.y, null, true);
        this.velocity.x = gUtil.clampVelocity(Math.max(this.maxSpeed, ENTITY_MAX_SPEED), this.velocity.x);

        // basic collision check with bottom of map:
        if (this.velocity.y != 0)
            this.velocity.y = gUtil.collisionFloorCheck(this.velocity.y, this.position.y, this.size.height, 150, 560);
        
        // add to our position ( velocity should already have been changed for collisions )
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        // decrease speed from friction
        this.velocity.x = gUtil.applyFriction(Math.min(this.friction, ENTITY_FRICTION), this.velocity.x);
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