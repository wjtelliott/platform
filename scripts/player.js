
class gPlayer extends gEntity
{
    isFacingLeft;
    defaultFrameLength;
    defaultPlayerAccel;
    constructor(sprite, pos, vel)
    {
        super(sprite, pos, vel);
        this.isFacingLeft = false;
        this.defaultFrameLength = 3;
        this.defaultPlayerAccel = 0.6;
        this.maxSpeed = 4;

        let newFrames = gUtil.getNextPlayerAnimation('p1_front', 0);
        this.setFrames('p1_front', 0, 1, 80, newFrames.x, newFrames.y, newFrames.width, newFrames.height);
    }

    changeToPlayerFrameSet(frameToSet, changePos)
    {
        // default to true
        changePos = (changePos == null) ? true : changePos;

        // Get our new frame data and set the animation to play it
        let nextFrame = gUtil.getNextPlayerAnimation(frameToSet);
        this.setFrames(nextFrame.frameName, 0, 1, this.defaultFrameLength, nextFrame.x, nextFrame.y, nextFrame.width, nextFrame.height);


        // some of our frames will be different sizes. We have to change the position of the entity if it changes sizes
        if (changePos)
        {
            let newSize = new gSize(this.frameData.frameWidth, this.frameData.frameHeight);

            let deltaX = this.size.width - newSize.width;
            let deltaY = this.size.height - newSize.height;
            this.size = newSize;

            this.position.x += deltaX;
            this.position.y += deltaY;
        }
    }

    updateFrameCounter()
    {
        // add to frame counter, 0 it if we reached limit, change frame.
        this.frameData.frame = (this.frameData.frame + 1 > this.frameData.frameChangeCounter) ? 0 : this.frameData.frame + 1;

        if (this.frameData.frame === 0)
        {
            let nextFrame = gUtil.getNextPlayerAnimation(this.frameData.frameName);
            this.setFrames(nextFrame.frameName, 0, 1, this.defaultFrameLength, nextFrame.x, nextFrame.y, nextFrame.width, nextFrame.height);
        }
    }

    updatePlayerMovement()
    {
        if (gUtil.playerPressedKeys['s'] == null) gUtil.playerPressedKeys['s'] = false;
        if (gUtil.playerPressedKeys['z'] == null) gUtil.playerPressedKeys['z'] = false;
        //duck
        if (gUtil.playerPressedKeys['s'])
        {
            // this will take priority over movement. 
            if (this.frameData.frameName != 'p1_duck')
            {
                this.changeToPlayerFrameSet('p1_duck');
            }
        }
        else if (gUtil.playerPressedKeys['z'])
        {
            if (this.frameData.frameName != 'p1_front')
                this.changeToPlayerFrameSet('p1_front');
        }
        else
        {


            if (gUtil.playerPressedKeys['w'])
            {
                if (this.velocity.y == 0)
                    this.velocity.y -= 9;
                this.changeToPlayerFrameSet('p1_jump');
            }


            if (this.frameData.frameName == 'p1_duck' || this.frameData.frameName == 'p1_front')
                this.changeToPlayerFrameSet('p1_walk11');
            
            // movement
            if (gUtil.playerPressedKeys['d'])
            {
                this.velocity.x+=this.defaultPlayerAccel;
                this.isFacingLeft = false;
            }
            if (gUtil.playerPressedKeys['a'])
            {
                this.velocity.x-=this.defaultPlayerAccel;
                this.isFacingLeft = true;
            }
        }
    }

    updatePlayerAnimations_Final()
    {
        // final animation passes.
        if (Math.abs(this.velocity.x === 0) && gUtil.playerPressedKeys['s'] == false && gUtil.playerPressedKeys['z'] == false)
        {
            if (this.frameData.frameName == 'p1_jump' && this.velocity.y != 0)
                this.changeToPlayerFrameSet('p1_jump');
            else
                this.changeToPlayerFrameSet('p1_stand');
            
        }
        else
        {
            if (this.frameData.frameName == 'p1_stand')
            {
                // start on last movement frame to make the 'next' frame, which is the first to show,
                //be the frame that is first in loop
                this.changeToPlayerFrameSet('p1_walk11');
            }
            else if (this.frameData.frameName == 'p1_jump')
            {
                if (this.velocity.y == 0)//Math.abs(this.velocity.y) < Math.min(this.gravityForce, ENTITY_GRAVITY))
                    this.changeToPlayerFrameSet('p1_walk11');
            }
        }
    }

    updateDebugHTML()
    {
        //velocity
        document.querySelector('#playerVelocityLabel').innerHTML = `${this.velocity.x.toFixed(2)} ux, ${this.velocity.y.toFixed(2)} uy`;
        //position
        document.querySelector('#playerPositionLabel').innerHTML = `${this.position.x.toFixed(2)} x, ${this.position.y.toFixed(2)} y`;
    }

    update(tileMap)
    {
        this.updateFrameCounter()
        
        this.updatePlayerMovement();

        this.checkTileMapCollisions(tileMap);

        // Forces
        super.update(tileMap);

        this.updateDebugHTML();

        this.updatePlayerAnimations_Final();
    }
}



// player button listeners
window.addEventListener('keydown', gUtil.keyDownListener, false);
window.addEventListener('keyup', gUtil.keyUpListener, false);
