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
const loadScripts = function(_callback)
{
    if (scriptsList.length > 0)
        runJScriptFile(scriptsList.pop());
    else _callback();
}
function runJScriptFile(path)
{
    let script = document.createElement('script');
    script.setAttribute('src', path);

    // Make sure we declare this before appending it to body
    script.onload = function() { loadScripts(loadScriptsCallback); };
    document.getElementsByTagName("head")[0].appendChild(script);
}

function loadScriptsCallback()
{
    testBgMap.loadTestRoom();
    document.querySelector('#startBtn').textContent = 'Start Game';
    document.querySelector('#startBtn').style = 'display: block;';
}


window.onload = function()
{
    

    let basicMainMenu = new gBasicMenu();
    // basicMainMenu.addButton('loadScriptBtn', 'Load Scripts (do this first)', 'loadScripts();', true);
    
    // No need for a button on this
    //basicMainMenu.addButton('loadMapBtn', 'Load map', 'testBgMap.loadTestRoom(); document.querySelector(\'#startBtn\').style = \'display: block;\'', true);
    
    basicMainMenu.addButton('startBtn', 'Start game', 'startGame(); document.querySelector(\'#controls\').style = \'display: block;\'', true);

    basicMainMenu.pushToDoc();

    loadScripts(loadScriptsCallback);
    
    //document.querySelector('#startBtn').style = "display: none;";
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