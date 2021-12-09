
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
    }

    // todo: move to gEntity
    changeToFrameSet(frameToSet, changePos)
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

    // todo: move some of this to gEntity. call super()
    update()
    {
        { // Frame info
            // add to frame counter, 0 it if we reached limit, change frame.
            this.frameData.frame = (this.frameData.frame + 1 > this.frameData.frameChangeCounter) ? 0 : this.frameData.frame + 1;
    
            if (this.frameData.frame === 0)
            {
                let nextFrame = gUtil.getNextPlayerAnimation(this.frameData.frameName);
                this.setFrames(nextFrame.frameName, 0, 1, this.defaultFrameLength, nextFrame.x, nextFrame.y, nextFrame.width, nextFrame.height);
            }
        }
    
        { // Movement updates
            if (gUtil.playerPressedKeys['s'] == null) gUtil.playerPressedKeys['s'] = false;
            if (gUtil.playerPressedKeys['z'] == null) gUtil.playerPressedKeys['z'] = false;
            //duck
            if (gUtil.playerPressedKeys['s'])
            {
                // this will take priority over movement. 
                if (this.frameData.frameName != 'p1_duck')
                {
                    this.changeToFrameSet('p1_duck');
                }
            }
            else if (gUtil.playerPressedKeys['z'])
            {
                if (this.frameData.frameName != 'p1_front')
                    this.changeToFrameSet('p1_front');
            }
            else
            {
    

                if (gUtil.playerPressedKeys['w'])
                {
                    if (this.velocity.y == 0)
                        this.velocity.y -= 10;
                    this.changeToFrameSet('p1_jump');
                }


                if (this.frameData.frameName == 'p1_duck' || this.frameData.frameName == 'p1_front')
                    this.changeToFrameSet('p1_walk11');
                
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
        
    
        { // forces updates

            /*
            When dealing with forces, we will prioritize the following values from entity global or (this.)entity personal:
                gravity: Minimum value
                Terminal fall rate: Maximum value
                Run walk speed: Maximum
                Friction: Minimum
             */


            // gravity and clamp for terminal
            this.velocity.y = gUtil.applyGravity(this.velocity.y, Math.min(this.gravityForce, ENTITY_GRAVITY));
            this.velocity.y = gUtil.clampVelocity(Math.max(this.maxFall, ENTITY_TERMINAL_FALL), this.velocity.y);
    
            // clamp walk/run speed
            this.velocity.x = gUtil.clampVelocity(Math.max(this.maxSpeed, ENTITY_MAX_SPEED), this.velocity.x);
    

            // check collisions here

            // check Y & platforms
            // basic screen collision check:
            if (this.velocity.y != 0)
            {
                this.velocity.y = gUtil.collisionFloorCheck(this.velocity.y, this.position.y, this.size.height, 220, 230);
                
            }
            
            // check X and walls


            // add to our position if no collision detected
            this.position.x += this.velocity.x;
            this.position.y += this.velocity.y;
    
            // decrease speed from friction
            this.velocity.x = gUtil.applyFriction(Math.min(this.friction, ENTITY_FRICTION), this.velocity.x);
        }
    
    
        // final animation passes.
        if (Math.abs(this.velocity.x === 0) && gUtil.playerPressedKeys['s'] == false && gUtil.playerPressedKeys['z'] == false)
        {
            if (this.frameData.frameName == 'p1_jump' && this.velocity.y != 0)
                this.changeToFrameSet('p1_jump');
            else
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
            else if (this.frameData.frameName == 'p1_jump')
            {
                if (this.velocity.y == 0)//Math.abs(this.velocity.y) < Math.min(this.gravityForce, ENTITY_GRAVITY))
                    this.changeToFrameSet('p1_walk11');
            }
        }
    }
}


// todo: add to constructor in override
let pobj = new gPlayer('./resources/player/green_sprites.PNG', {x: 20, y: 20}, {x: 0, y:0});
let newFrames = gUtil.getNextPlayerAnimation('p1_front', 0);
pobj.setFrames('p1_front', 0, 1, 80, newFrames.x, newFrames.y, newFrames.width, newFrames.height);

// player button listeners
window.addEventListener('keydown', gUtil.keyDownListener, false);
window.addEventListener('keyup', gUtil.keyUpListener, false);



// simple demo loop, move this later when a real game loop is made

let bgMap = [];
let map = [];

//populate test map
for (let i = 0; i < 6; i++)
{
    //bgmap

    let newBgTileClass = new gBackgroundTileClass({x: 0, y:0, width: 256, height:256}, {x:128*i, y:0});
    newBgTileClass.backgroundType = (i % 2 == 0) ? 0 : 1;
    newBgTileClass.size = {width: (i % 2 == 1) ? 128 : 64, height: (i % 2 == 0) ? 64 : 128};
    bgMap.push(newBgTileClass);


    let newTileClass = new gTileClass({x: 504, y:576, width:70, height:70}, {x:70*i, y:70*i});
    map.push(newTileClass);
}

function demo()
{

    // final version of game loop will:
    /**
     * Clear screen
     * Update all logic (no order)
     * Draw (background, tiles, objects, enemies, player)
     */


    gRender.clearScreen();

    bgMap.forEach(
        function(a){
            gRender.drawSerializedImage(a.serializeTileToDraw());
        }, null
    );

    map.forEach(
        function(e){
            gRender.drawSerializedImage(e.serializeTileToDraw());
        }, null
    );

    //objects and enemies here


    pobj.update();
    if (pobj.isFacingLeft)
    {
        gRender.drawSerializedImageFlipped(pobj.serializeObjectToDraw());
    } else {
        
        gRender.drawSerializedImage(pobj.serializeObjectToDraw());
    }
}


