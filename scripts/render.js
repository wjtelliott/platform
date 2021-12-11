let gRender =
{
    context: document.querySelector('.canvas').getContext('2d'),
    canvasObj: document.querySelector('.canvas'),
    cameraPosition: gVector2.Zero(),
    drawSpace:
    {
        width: document.querySelector('.canvas').width,
        height: document.querySelector('.canvas').height
    },
    getCameraPositionDelta: function(pos)
    {
        // get pos and return delta from this viewport position
        return new gVector2(
            pos.x - this.cameraPosition.x,
            pos.y - this.cameraPosition.y
        );
    },
    updateCameraPosition: function(newPos)
    {
        let delta = this.getCameraPositionDelta(newPos);
        this.cameraPosition = newPos;
        this.context.translate(-delta.x, -delta.y);
    },
    clearScreen: function()
    {
        this.context.clearRect(-200, 0, this.drawSpace.width + 500, this.drawSpace.height);
    },
    drawImage: function(sprites, sourceX, sourceY, sourceWidth, sourceHeight, posX, posY, drawWidth, drawHeight)
    {
        this.context.drawImage(sprites, sourceX, sourceY,
            sourceWidth, sourceHeight,
            posX, posY,
            drawWidth, drawHeight);
    },


    // eventually we want to batch all of these. Drawing each object on update in its
    //own draw function is bad.
    drawSerializedImageFlipped: function(serializedObject)
    {
        //Let's fix this flip/flop mess and just make a new func. wowza.
        
        this.context.save();
        // add width of frame here while translating
        this.context.translate(serializedObject.posX + serializedObject.sourceWidth, serializedObject.posY);
        this.context.scale(-1, 1);
        this.drawSerializedImage(serializedObject, true);
        this.context.restore();
    },
    drawSerializedImage: function(serializedObject, flipped)
    {
        // If we draw flipped, we should have already translated our location
        if (serializedObject == null) return;
        this.context.drawImage(serializedObject.sprite, serializedObject.sourceX, serializedObject.sourceY,
            serializedObject.sourceWidth, serializedObject.sourceHeight,
            (flipped == null || !flipped) ? serializedObject.posX : 0, (flipped == null || !flipped) ? serializedObject.posY : 0,
            serializedObject.drawWidth, serializedObject.drawHeight);
    }
}