class gUtil
{
    static clampVelocity(max, current, min, jump)
    {
        jump = (jump == null) ? false : true;
        if (jump && current < 0) return current;

        if (max == null || current == null) return 0;
        if (min == null) min = max - (max * 2);

        if (min > max)
        {
            let temp = min;
            min = max;
            max = temp;
        }

        current = (current > max) ? max : current;
        current = (current < min) ? min : current;
        return current;
    }

    static applyFriction(frictionValue, velocityX)
    {
        if (frictionValue == null) frictionValue = 0;
        if (velocityX == null) velocityX = 0;
        

        return (velocityX > 0) ?
            (velocityX - frictionValue < 0) ? 0 : velocityX - frictionValue
            :
            (velocityX + frictionValue > 0) ? 0 : velocityX + frictionValue;
    }

    static applyGravity(gravityValue, velocityY)
    {
        // even though we just add here, I made this a seperate function incase
        // we need it to expand complexity later.
        if (gravityValue == null) gravityValue = 0;
        if (velocityY == null) velocityY = 0;
        return velocityY + gravityValue;
    }

    static collisionFloorCheck(velocityY, positionY, frameHeight, floorY, floorYBottom)
    {
        
        // Check if velocity + position (AND FRAME HEIGHT) is greater than the floor.
        // if so. Make the velocity = the difference to make the floorY == positiionY + frame + velocityY
        // return as the velocity Y
        
        

        return (velocityY + positionY + frameHeight > floorY &&
            velocityY + positionY + frameHeight < floorYBottom) ?
        
        (floorY - positionY - frameHeight)
        : 
        velocityY;
    

    }

    static distanceToObject(o1, o2)
    {
        if (o1 == null || o2 == null) return -1;

        let v1 = o1.x - o2.x;
        let v2 = o1.y - o2.y;
        return (v1 * v1) + (v2 * v2);
    }

    static serializePlayerFrameData(x, y, width, height, nextFrameName)
    {
        return {
            x: (x == null) ? 0 : x,
            y: (y == null) ? 0 : y,
            width: (width == null) ? 0 : width,
            height: (height == null) ? 0 : height,
            frameName: (nextFrameName == null) ? 'nil' : nextFrameName
        };
    }

    static getNextPlayerAnimation(frame, playerType)
    {
        if (playerType == null) playerType = 0;
        if (frame == null) return;
        // huge switch incoming
        switch (playerType)
        {
            case 0: // green player sprites
                switch (frame)
                {
                    // these will reference themselves as 'next', since they only have 1 frame.
                    case 'p1_stand': return gUtil.serializePlayerFrameData(67, 196, 66, 92, 'p1_stand');
                    case 'p1_hurt': return gUtil.serializePlayerFrameData(438, 0, 69, 92, 'p1_hurt');
                    case 'p1_duck': return gUtil.serializePlayerFrameData(365, 98, 69, 71, 'p1_duck');
                    case 'p1_front': return gUtil.serializePlayerFrameData(0, 196, 66, 92, 'p1_front');
                    case 'p1_jump': return gUtil.serializePlayerFrameData(438, 93, 67, 94, 'p1_jump');

                    // these sprites will reference the sprite next in animation.
                    case 'p1_walk01': return gUtil.serializePlayerFrameData(73, 0, 72, 97, 'p1_walk02');
                    case 'p1_walk02': return gUtil.serializePlayerFrameData(146, 0, 72, 97, 'p1_walk03');
                    case 'p1_walk03': return gUtil.serializePlayerFrameData(0, 98, 72, 97, 'p1_walk04');
                    case 'p1_walk04': return gUtil.serializePlayerFrameData(73, 98, 72, 97, 'p1_walk05');
                    case 'p1_walk05': return gUtil.serializePlayerFrameData(146, 98, 72, 97, 'p1_walk06');
                    case 'p1_walk06': return gUtil.serializePlayerFrameData(219, 0, 72, 97, 'p1_walk07');
                    case 'p1_walk07': return gUtil.serializePlayerFrameData(292, 0, 72, 97, 'p1_walk08');
                    case 'p1_walk08': return gUtil.serializePlayerFrameData(219, 98, 72, 97, 'p1_walk09');
                    case 'p1_walk09': return gUtil.serializePlayerFrameData(365, 0, 72, 97, 'p1_walk10');
                    case 'p1_walk10': return gUtil.serializePlayerFrameData(292, 98, 72, 97, 'p1_walk11');
                    case 'p1_walk11': return gUtil.serializePlayerFrameData(0, 0, 72, 97, 'p1_walk01');
                }
        }
    }


    static playerPressedKeys = {};
    static keyDownListener(e)
    {
        gUtil.playerPressedKeys[e.key] = true;
    }
    static keyUpListener(e)
    {
        gUtil.playerPressedKeys[e.key] = false;
    }
}