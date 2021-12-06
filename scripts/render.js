let gRender =
{
    context: document.querySelector('.canvas').getContext('2d'),
    canvasObj: document.querySelector('.canvas'),
    drawSpace:
    {
        width: document.querySelector('.canvas').width,
        height: document.querySelector('.canvas').height
    },
    clearScreen: function()
    {
        this.context.clearRect(0, 0, this.drawSpace.width, this.drawSpace.height);
    },
    drawImage: function(sprites, sourceX, sourceY, sourceWidth, sourceHeight, posX, posY, drawWidth, drawHeight)
    {
        this.context.drawImage(sprites, sourceX, sourceY,
            sourceWidth, sourceHeight,
            posX, posY,
            drawWidth, drawHeight);
    },
    drawSerializedImage: function(serializedObject)
    {
        this.context.drawImage(serializedObject.sprite, serializedObject.sourceX, serializedObject.sourceY,
            serializedObject.sourceWidth, serializedObject.sourceHeight,
            serializedObject.posX, serializedObject.posY,
            serializedObject.drawWidth, serializedObject.drawHeight);
    }
}