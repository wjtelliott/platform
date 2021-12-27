// basic game tile.
// it will do the following:
/*

    1. Reference a point on the tilesheet that it will draw
    2. Draw on it's position
    3. Store data about the type of tile

*/

// this will be our tile sprite sheet for all our tiles:
let gTileSpriteSheet = new Image();
gTileSpriteSheet.setAttribute('src', './resources/tile/tile_sprites.png');
let gBackground_Blue = new Image();
gBackground_Blue.setAttribute('src', './resources/tile/bg.png');
let gBackground_Castle = new Image();
gBackground_Castle.setAttribute('src', './resources/tile/bg_castle.png');


class gTile
{
    spriteSource = {x: 0, y: 0, width: 1, height: 1};
    position = {x: 0, y: 0};
    size = {width: 0, height: 0};
    isVisible = false;
    isSolid = false;
    isWall = false;
    constructor(newSource, newPos)
    {
        this.spriteSource = newSource;
        this.position = newPos;
        this.size = {width: (this.spriteSource == null) ? 1 : this.spriteSource.width,
                    height: (this.spriteSource == null) ? 1 : this.spriteSource.height};
        this.isVisible = true;
        this.isSolid = true;
        this.isWall = false;
    }


    static randomTileSource()
    {

        let randomX = Math.floor(Math.random() * 13);
        let randomY = Math.floor(Math.random() * 13);

        return {x: randomX * 72, y: randomY * 72, width: 70, height: 70};

        // switch (Math.floor(Math.random() * 6))
        // {
        //     default:
        //     case 0: return {x: 0, y: 0, width: 70, height: 70};
        //     case 1: return {x: 288+144, y: 720, width: 70, height: 70};
        //     case 2: return {x: 504, y: 576, width: 70, height: 70};
        //     case 3: return {x: 288, y: 792, width: 70, height: 70};
        //     case 4: return {x: 360, y: 792, width: 70, height: 70};
        //     case 5: return {x: 288, y: 432, width: 70, height: 70};
        // }
    }

    getPosition()
    {
        return this.position;
    }

    serializeTileToDraw()
    {
        return (this.spriteSource == null) ? null : 
        {
            sprite: gTileSpriteSheet,
            sourceX: this.spriteSource.x,
            sourceY: this.spriteSource.y,
            sourceWidth: this.spriteSource.width,
            sourceHeight: this.spriteSource.height,
            posX: this.position.x,
            posY: this.position.y,
            drawWidth: this.size.width,
            drawHeight: this.size.height
        };
    }
}

class gBackgroundTile extends gTile
{
    backgroundType;
    constructor(newSource, newPos) { super(newSource, newPos); this.backgroundType = 1; this.isSolid = false; }

    // override draw to return corrisponding bg png
    serializeTileToDraw()
    {
        return {
            sprite: (this.backgroundType === 0) ? gBackground_Blue : gBackground_Castle,
            sourceX: 0,
            sourceY: 0,
            sourceWidth: (this.backgroundType === 0) ? gBackground_Blue.width : gBackground_Castle.width,
            sourceHeight: (this.backgroundType === 0) ? gBackground_Blue.height : gBackground_Castle.height,
            posX: this.position.x,
            posY: this.position.y,
            drawWidth: (this.backgroundType === 0) ? gBackground_Blue.width : gBackground_Castle.width,
            drawHeight: (this.backgroundType === 0) ? gBackground_Blue.height : gBackground_Castle.height
        };
    }
}
