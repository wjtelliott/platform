

// scripts are loaded from last element to first. last element being most important.
// We are locking this while we load each script. maybe choose which are async ect later when we have more scripts.
let scriptsList = [
    './scripts/player.js',
    './scripts/render.js',
    './scripts/entity.js'
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


window.onload = function()
{
    setInterval(function() {
        
        // use our demo loop here
        demo();
    }, 
    // 10? idk bro
    10 
    );
};