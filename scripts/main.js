// Some of these scripts will have to load before the next.
// This list has priority to load the last first, and needs to be in that order.
let scriptsList = [

    /*

        We unfortunately have to use a direct address here, otherwise
        github.io will NOT load correctly and will crash our page.

        Tested, and using these addresses works locally, as well as ./scripts/...js

     */

    'https://wjtelliott.github.io/platform/scripts/player.js',
    'https://wjtelliott.github.io/platform/scripts/map.js',
    'https://wjtelliott.github.io/platform/scripts/tile.js',
    'https://wjtelliott.github.io/platform/scripts/render.js',
    'https://wjtelliott.github.io/platform/scripts/entity.js',
    'https://wjtelliott.github.io/platform/scripts/gutil.js',
    'https://wjtelliott.github.io/platform/scripts/gtypes.js',
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
    basicMainMenu.addLabel('wjtelliott/platform');
    basicMainMenu.addButton('loadScriptBtn', 'Load scripts (do this first)', 'loadScripts()', true);
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