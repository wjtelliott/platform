class gMap
{
    width;height;
    backgroundTileMap;
    tileMap;
    playerObject;
    collectableObjects;
    enemyObjects;
    constructor(w, h)
    {
        this.width = (w == null) ? 1 : w;
        this.height = (h == null) ? 1 : h;
        this.tileMap = Array(this.width * this.height).fill();
        //this.playerObject = new gPlayer('./resources/player/green_sprites.PNG', {x: 20, y: 20}, {x: 0, y:0});
        this.backgroundTileMap = [];
        this.collectableObjects = [];
        this.enemyObjects = [];
    }

    loadTestRoom()
    {

        // Set map basic vars
        let testMapWidth = 12;
        let testMapHeight = 5;
        // Need these for actual pixel lengths
        let testMapWidth_Actual = testMapWidth * 70;
        let testMapHeight_Actual = testMapHeight * 70;

        
        //Create a basic background tilemap
        // determine background amount needed (Add 2 just in case)
        let backgroundAmountWidth = (testMapWidth_Actual / gBackground_Blue.width) + 1;
        let backgroundAmountHeight = (testMapHeight_Actual / gBackground_Blue.height) + 1;

        for (let i = 0; i < backgroundAmountHeight; i++)
            for (let ii = 0; ii < backgroundAmountWidth; ii++)
                this.backgroundTileMap.push(
                    new gBackgroundTileClass(
                        null, 
                        new gVector2(
                                ii * gBackground_Blue.width,
                                i * gBackground_Blue.height
                            )
                        )
                );


        //Populate a tilemap
        for (let i = 0; i < testMapWidth; i++)
            for (let ii = 0; ii < testMapHeight; ii++)
                this.tileMap.push(
                    new gTileClass(
                        gTileClass.randomTileSource(), new gVector2(i*70, ii*70)
                    )
                );

        //Spawn Move the player to position
        this.playerObject = new gPlayer('./resources/player/green_sprites.png', {x: 20, y: 20}, {x: 0, y:0});

        //make some objects and enemies later on 
    }

    testUpdateBg()
    {
        if (this.playerObject != null)
        {
            this.playerObject.update();

            //basic camera positioning
            let newViewpoint = new gVector2(parseInt(this.playerObject.position.x + (this.playerObject.frameData.frameWidth / 2) - (gRender.drawSpace.width / 2)),
                    parseInt(this.playerObject.position.y - (gRender.drawSpace.height / 2) + (this.playerObject.frameData.frameHeight / 2)));
            gRender.updateCameraPosition(newViewpoint);
        }
    }

    testDrawBg()
    {
        this.backgroundTileMap.forEach(
            function(e){
                gRender.drawSerializedImage(e.serializeTileToDraw());
            }, null
        )
        this.tileMap.forEach(
            function(a){
                if (a != null)
                    gRender.drawSerializedImage(a.serializeTileToDraw());
            }, null
        )

        if (this.playerObject != null)
            if (!this.playerObject.isFacingLeft)
                gRender.drawSerializedImage(this.playerObject.serializeObjectToDraw());
            else gRender.drawSerializedImageFlipped(this.playerObject.serializeObjectToDraw());
    }
}


let testBgMap = new gMap();

// simple demo loop, move this later when a real game loop is made
function demo()
{

    // final version of game loop will:
    /**
     * Clear screen
     * Update all logic (no order)
     * Draw (background, tiles, objects, enemies, player)
     */


    gRender.clearScreen();

    testBgMap.testDrawBg();

    testBgMap.testUpdateBg();
    
}