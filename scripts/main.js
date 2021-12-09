

// scripts are loaded from last element to first. last element being most important.
// We are locking this while we load each script. maybe choose which are async ect later when we have more scripts.
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
    script.onload = function() { loadScripts(); };
    document.body.append(script);
}

loadScripts();


/* I had to rewrite all my code from objects to classes because of
deep cloning being a thing in JS... I just wanted to be a .net programmer... */

window.onload = function()
{
    setInterval(function() {
        
        // use our demo loop here
        demo();
    }, 
    // 16? idk bro
    16 
    );
};