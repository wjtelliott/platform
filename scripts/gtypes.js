class gVector2
{
    x;y;
    constructor(newX, newY)
    {
        this.x = (newX == null) ? 0 : newX;
        this.y = (newY == null) ? 0 : newY;
    }
    serializeVector2(newX, newY)
    {
        return {x: (newX == null) ? 0 : newX,
                y: (newY == null) ? 0 : newY};
    }
}

class gBoundingBox
{
    x;y;width;height;
    constructor(newX, newY, newWidth, newHeight)
    {
        this.x = newX;
        this.y = newY;
        this.width = newWidth;
        this.height = newHeight;
    }

    // this expects another gBoundingBox
    contains(value)
    {
        // return true / false if this BB has any of the other box colliding at all
        //using monogame framework return here
        return
        ((((this.x <= value.x) &&
        ((value.x + value.width) <= (this.x + this.width))) &&
        (this.y <= value.y)) &&
        ((value.y + value.height) <= (this.y + this.height)));
    }

    // this expects 
    collideX(value)
    {

    }
}

// Size is just a vector2, but I'll keep it for the properties' namesake.
class gSize
{
    width;height;
    constructor(newWidth, newHeight)
    {
        this.width = (newWidth == null) ? 0 : newWidth;
        this.height = (newHeight == null) ? 0 : newHeight;
    }
    serializeSize(newWidth, newHeight)
    {
        return {width: (newWidth == null) ? 0 : newWidth,
                height: (newHeight == null) ? 0 : newHeight};
    }
}

class gFrameData
{
    frameName;
    currentFrame;

    // This is currently obsolete, for now.
    frameSpeed;

    frameChangeCounter;
    frameX;
    frameY;
    frameWidth;
    frameHeight;
    constructor()
    {
        this.frameName = '';
        this.currentFrame = 0;
        this.frameSpeed = 1;
        this.frameChangeCounter = 1;
        this.frameX = 0;
        this.frameY = 0;
        this.frameWidth = 1;
        this.frameHeight = 1;
    }
    setFrames(currentFrameName, currentFrame, currentFrameSpeed, currentFrameChangeCounter, currentFramePosX, currentFramePosY, currentFrameWidth, currentFrameHeight)
    {
        this.frameName = currentFrameName;
        this.currentFrame = currentFrame;
        this.frameSpeed = currentFrameSpeed;
        this.frameChangeCounter = currentFrameChangeCounter;
        this.frameX = currentFramePosX;
        this.frameY = currentFramePosY;
        this.frameWidth = currentFrameWidth;
        this.frameHeight = currentFrameHeight;
    }
}