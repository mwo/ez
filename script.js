(function () {

    function isChat() {
        let _8 = "INPUT",
            _3 = document.activeElement.tagName;
        return _8 === _3;
    }

    const GenString = l => [...Array(l)].map(e => String.fromCharCode((r = Math.random, a = r() * 2 | 0 ? 65 : 97, r() * (a + 25 - a + 1) | 0 + a))).join('')

    const varNames = (l, s) => [...Array(s)].map(e => GenString(l))
    /*--------------------------------------------------------------------------------------*/
    let [esp, inView, plist] = varNames(8, 4)
    window[esp] = false

    let initialize = function (data) {
        let regex = /if\(!\w+\['(\w+)']\)continue/;
        let hook2 = /\['team']:window\['(\w+)']/;

        let hook = hook2.exec(data)[1];
        let result = regex.exec(data);
        window.__defineGetter__(hook,function(){
            let caller = arguments.callee.caller.arguments;
            if (caller.length == 8) window[plist] = caller[1];
            return false;
        })
        if (result) window[inView] = result[1];
    }

    window.__defineSetter__('dx724',function(){
        initialize(arguments.callee.caller.toString());
    })
    window.__defineGetter__('dx724',()=>3676159); //function length, used to check for changes. But they have doo doo brain

    //keydown listener for keybinds
    document.addEventListener('keydown', function (e) {
        if (!isChat() && e.key == 'n') {
            window[esp] = !window[esp]
            if (window[plist] && window[plist].players && window[plist].players.list) {
                window[plist].players.list.forEach(e=>{
                    Object.defineProperty(e, window[inView], {
                        get: () => window[esp],
                        configurable: true
                    });
               })
           }
        }
    })
})();
