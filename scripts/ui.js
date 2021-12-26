class gBasicMenu
{
    // Use this class for placeholder / basic menu using html.
    // Use gMenu for an in-game ui menu.

    buttons;
    labels;


    handled;

    constructor()
    {
        this.buttons = [];
        this.labels = [];
        this.handled = false;
    }

    addLabel(text)
    {
        let l = document.createElement('p');
        l.textContent = text;
        this.labels.push(l);
    }

    addButton(className, text, returnType, remove)
    {
        let b = document.createElement('button');
        b.setAttribute('id', className);
        if (remove)
            b.setAttribute('onclick', `document.querySelector('#${className}').style = 'display: none;'; ${returnType}`)
        else
            b.setAttribute('onclick', returnType);
        b.textContent = text;
        this.buttons.push(b);
    }


    pushToDoc(showMenu)
    {
        // We want this to only ever call once.
        if (this.handled) return;
        this.handled = true;

        if (this.buttons != null)
            if (this.buttons.length > 0)
                this.buttons.forEach(function(e)
                {
                    document.querySelector('main').append(e);
                });
        if (this.labels != null)
            if (this.labels.length > 0)
                this.labels.forEach(function(e)
                {
                    document.querySelector('main').append(e);
                });

        this.hide();
        if (showMenu) this.show();
    }


    show()
    {
        if (this.buttons != null)
            if (this.buttons.length > 0)
                this.buttons.forEach(function(e)
                {
                    e.style = 'display: block;';
                });
        if (this.labels != null)
            if (this.labels.length > 0)
                this.labels.forEach(function(e)
                {
                    e.style = 'display: block;';
                });
    }

    hide()
    {
        if (this.buttons != null)
            if (this.buttons.length > 0)
                this.buttons.forEach(function(e)
                {
                    e.style = 'display: none;';
                });
        if (this.labels != null)
            if (this.labels.length > 0)
                this.labels.forEach(function(e)
                {
                    e.style = 'display: none;';
                });
    }

}

class gMenu
{
    buttons;
    labels;
    constructor()
    {

    }
}