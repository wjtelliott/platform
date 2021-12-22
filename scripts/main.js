// Some of these scripts will have to load before the next.
// This list has priority to load the last first, and needs to be in that order.
let scriptsList = [
    './scripts/player.js',
    './scripts/map.js',
    './scripts/tile.js',
    './scripts/render.js',
    './scripts/entity.js',
    './scripts/gutil.js',
    './scripts/gtypes.js',
];
const loadScripts = function()
{
    if (scriptsList.length > 0)
        runJScriptFile(scriptsList.pop());
}
function runJScriptFile(path)
{
    let script = document.createElement('script');
    script.setAttribute('src', path);

    // Make sure we declare this before appending it to body
    script.onload = function() { loadScripts(); };
    document.getElementsByTagName("head")[0].appendChild(script);
}



window.onload = function()
{
    

    let basicMainMenu = new gBasicMenu();
    basicMainMenu.addButton('loadScriptBtn', 'Load Scripts (do this first)', 'loadScripts();', true);
    basicMainMenu.addButton('loadMapBtn', 'Load map (do this second)', 'testBgMap.loadTestRoom();', true);
    
    basicMainMenu.addButton('startBtn', 'Start game', 'startGame()', true);

    basicMainMenu.pushToDoc();

    basicMainMenu.show();
};


let startDemo;
function startGame()
{
    startDemo = setInterval(
        function() {
            demo();
        }, 16
    );
}
function stopGame()
{
    clearInterval(startDemo);
}