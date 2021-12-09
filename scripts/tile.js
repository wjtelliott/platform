// basic game tile.
// it will do the following:
/*

    1. Reference a point on the tilesheet that it will draw
    2. Draw on it's position
    3. Store data about the type of tile

*/

// this will be our tile sprite sheet for all our tiles:
let gTileSpriteSheet = new Image();
gTileSpriteSheet.setAttribute('src', './resources/tile/tile_sprites.PNG');
let gBackground_Blue = new Image();
gBackground_Blue.setAttribute('src', './resources/tile/bg.PNG');
let gBackground_Castle = new Image();
gBackground_Castle.setAttribute('src', './resources/tile/bg_castle.PNG');


class gTileClass
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
        this.size = {width: this.spriteSource.width, height: this.spriteSource.height};
        this.isVisible = true;
        this.isSolid = true;
        this.isWall = false;
    }

    serializeTileToDraw()
    {
        return {
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

class gBackgroundTileClass extends gTileClass
{
    backgroundType;
    constructor(newSource, newPos) { super(newSource, newPos); this.backgroundType = 0; this.isSolid = false; }

    // override draw to return corrisponding bg png
    serializeTileToDraw()
    {
        return {
            sprite: (this.backgroundType === 0) ? gBackground_Blue : gBackground_Castle,
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
