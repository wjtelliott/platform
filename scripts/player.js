
let playerObj = 
{
    serializeFrameData: function(x, y, width, height, nextName)
    {
        return {x:x, y:y, width:width, height:height, frameName: nextName};
    },
    getNextPlayerAnimation: function(frame)
    {
        switch (frame)
        {
            //TODO: Create a frame data obj or class.

            //this is for the green player sprite
            // these will reference themselves as 'next', since they only have 1 frame.
            case 'p1_stand': return this.serializeFrameData(67, 196, 66, 92, 'p1_stand');
            case 'p1_hurt': return this.serializeFrameData(438, 0, 69, 92, 'p1_hurt');
            case 'p1_duck': return this.serializeFrameData(365, 98, 69, 71, 'p1_duck');
            case 'p1_front': return this.serializeFrameData(0, 196, 66, 92, 'p1_front');
            case 'p1_jump': return this.serializeFrameData(438, 93, 67, 94, 'p1_jump');

            // these sprites will reference the sprite next in animation.
            case 'p1_walk01': return this.serializeFrameData(73, 0, 72, 97, 'p1_walk02');
            case 'p1_walk02': return this.serializeFrameData(146, 0, 72, 97, 'p1_walk03');
            case 'p1_walk03': return this.serializeFrameData(0, 98, 72, 97, 'p1_walk04');
            case 'p1_walk04': return this.serializeFrameData(73, 98, 72, 97, 'p1_walk05');
            case 'p1_walk05': return this.serializeFrameData(146, 98, 72, 97, 'p1_walk06');
            case 'p1_walk06': return this.serializeFrameData(219, 0, 72, 97, 'p1_walk07');
            case 'p1_walk07': return this.serializeFrameData(292, 0, 72, 97, 'p1_walk08');
            case 'p1_walk08': return this.serializeFrameData(219, 98, 72, 97, 'p1_walk09');
            case 'p1_walk09': return this.serializeFrameData(365, 0, 72, 97, 'p1_walk10');
            case 'p1_walk10': return this.serializeFrameData(292, 98, 72, 97, 'p1_walk11');
            case 'p1_walk11': return this.serializeFrameData(0, 0, 72, 97, 'p1_walk01');
        }
    },
    keyPresses: {},
    keyDownListener: function(e)
    {
        playerObj.keyPresses[e.key] = true;
    },
    keyUpListener: function(e)
    {
        playerObj.keyPresses[e.key] = false;
    },
    isFacingLeft: false,
    defaultFrameLength: 4,
    defaultPlayerAccel: 0.2,
    changeToFrameSet: function(frameName)
    {
        let nextFrame = this.getNextPlayerAnimation(frameName);
        this.setFrames(nextFrame.frameName, 0, 1, this.defaultFrameLength, nextFrame.x, nextFrame.y, nextFrame.width, nextFrame.height);
        playerObj.size = {width: playerObj.frameData.frameWidth, height: playerObj.frameData.frameHeight};
    },
};
Object.assign(playerObj, gEntity);


//playerobj overrides:
playerObj.update = function()
{

    { // Frame info
        // add to frame counter, 0 it if we reached limit, change frame.
        this.frameData.frame = (this.frameData.frame + 1 > this.frameData.frameChangeCounter) ? 0 : this.frameData.frame + 1;

        if (this.frameData.frame === 0)
        {
            let nextFrame = this.getNextPlayerAnimation(this.frameData.frameName);
            this.setFrames(nextFrame.frameName, 0, 1, this.defaultFrameLength, nextFrame.x, nextFrame.y, nextFrame.width, nextFrame.height);
        }
    }

    { // Movement updates
        if (this.keyPresses['s'] == null) this.keyPresses['s'] = false;
        if (this.keyPresses['z'] == null) this.keyPresses['z'] = false;
        //duck
        if (this.keyPresses['s'])
        {
            // this will take priority over movement. 
            if (this.frameData.frameName != 'p1_duck')
            {
                this.changeToFrameSet('p1_duck');
                this.position.y += 21;
            }
        }
        else if (this.keyPresses['z'])
        {
            // check duck height
            if (this.frameData.frameName == 'p1_duck')
                this.position.y -= 21;
            if (this.frameData.frameName != 'p1_front')
                this.changeToFrameSet('p1_front');
        }
        else
        {
            // check duck height
            if (this.frameData.frameName == 'p1_duck')
                this.position.y -= 21;

            if (this.frameData.frameName == 'p1_duck' || this.frameData.frameName == 'p1_front')
                this.changeToFrameSet('p1_walk11');
            
            // movement
            if (this.keyPresses['d'])
            {
                this.velocity.x+=this.defaultPlayerAccel;
                this.isFacingLeft = false;
            }
            if (this.keyPresses['a'])
            {
                this.velocity.x-=this.defaultPlayerAccel;
                this.isFacingLeft = true;
            }
        }
    }
    

    { // forces updates
        this.applyGravity();

        this.clampVelocity();

        this.position.x += this.velocity.x;

        this.applyFriction();
    }


    // final animation passes.
    if (Math.abs(this.velocity.x === 0) && this.keyPresses['s'] == false && this.keyPresses['z'] == false)
    {
        this.changeToFrameSet('p1_stand');
        
    }
    else
    {
        if (this.frameData.frameName == 'p1_stand')
        {
            // start on last movement frame to make the 'next' frame, which is the first to show,
            //be the frame that is first in loop
            this.changeToFrameSet('p1_walk11');
        }
    }
};

// init obj
playerObj.init('./resources/player/green_sprites.PNG', {x: 20, y:20}, {x: 0, y:0});

// set first anim. TODO: Maybe add this to init?
let greenFrames = playerObj.getNextPlayerAnimation('p1_walk01');
playerObj.setFrames('p1_walk01', 0, 1, 80, greenFrames.x, greenFrames.y, greenFrames.width, greenFrames.height);


// player button listeners
window.addEventListener('keydown', playerObj.keyDownListener, false);
window.addEventListener('keyup', playerObj.keyUpListener, false);




// simple demo loop, move this later when a real game loop is made
function demo()
{
    gRender.clearScreen();
    playerObj.update();
    if (playerObj.isFacingLeft)
    {
        gRender.drawSerializedImageFlipped(playerObj.serializeObjectToDraw());
    } else {
        
        gRender.drawSerializedImage(playerObj.serializeObjectToDraw());
    }
}


