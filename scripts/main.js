// Some of these scripts will have to load before the next.
// This list has priority to load the last first, and needs to be in that order.
let scriptsList = [
    './scripts/player.js',
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
    document.body.append(script);
}

// Load all the scripts
loadScripts();


// Wait until the window is loaded before we start the game loop
window.onload = function()
{
    setInterval(function() {
        
        // use our demo loop here
        demo();
    }, 
    // 16 will give us 'about' 60 times a second.
    // We can change this value later if needed.
    16 
    );
};