(function () {

    function isChat() {
        let _8 = "INPUT",
            _3 = document.activeElement.tagName;
        return _8 === _3;
    }

    const GenString = l => [...Array(l)].map(e => String.fromCharCode((r = Math.random, a = r() * 2 | 0 ? 65 : 97, r() * (a + 25 - a + 1) | 0 + a))).join('')

    const varNames = (l, s) => [...Array(s)].map(e => GenString(l))
    /*--------------------------------------------------------------------------------------*/
    let [esp, inView, plist, save, define] = varNames(8, 6);
    window[define] = Object.defineProperty;
    window[esp] = false

    let initialize = function (data) {
        let regex = /if\(!\w+\['(\w+)']\)continue/;
        let hook2 = /\['team']:window\['(\w+)']/;

        let hook = hook2.exec(data);
        let result = regex.exec(data);
        if (result && hook) window[inView] = result[1];
        console.log(hook, result[1]);

        window[define](globalThis, hook[1], {
            get: function(){
                let caller = arguments.callee.caller.arguments;
                if (caller.length == 8) window.plist = window[plist] = caller[1];
                return false;
            },
            configurable: true
        })
    }
    window[define](globalThis, 'dx724', {
        set: function(){
            let str = arguments.callee.caller.toString();
            window[save] = str.length;
            initialize(str);
        },
        configurable: true
    })
    window[define](globalThis, 'dx724', {
        get: ()=>window[save], //function length, used to check for changes.
        configurable: true
    })

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
