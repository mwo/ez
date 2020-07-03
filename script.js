(function () {
    'use strict';

    const replace = String.prototype.replace;

    function isChat() {
        let _8 = "INPUT",
            _3 = document.activeElement.tagName;
        return _8 === _3;
    }

    const GenString = l => [...Array(l)].map(e => String.fromCharCode((r = Math.random, a = r() * 2 | 0 ? 65 : 97, r() * (a + 25 - a + 1) | 0 + a))).join('')

    const varNames = (l, s) => [...Array(s)].map(e => GenString(l))
    /*--------------------------------------------------------------------------------------*/
    let [esp, sockets] = varNames(8, 2)
    window[esp] = false

    let initialize = function (data) {
        let regex = /if\(!\w+\['(\w+)']\)continue/;
        let result = regex.exec(data);
        if (result) {
            const inView = result[1];
            const push = Array.prototype.push;
            Array.prototype.push = function (...args) {
                push.apply(this, args);
                if (args[0] instanceof Object && args[0].isPlayer) {
                    Object.defineProperty(args[0], inView, {
                        value: window[esp],
                        configurable: false
                    });
                }
            }
        }
    }

    const decode = window.TextDecoder.prototype.decode;
    window.TextDecoder.prototype.decode = function (...args) {
        let data = decode.apply(this, args);
        if (data.length > 1050000) {
            initialize(data);
        }
        return data;
    }

    //keydown listener for keybinds
    document.addEventListener('keydown', function (e) {
        if (!isChat() && e.key == 'n') {
            window[esp] = !window[esp]
        }
    })
})();
//window.activeHacker = true
