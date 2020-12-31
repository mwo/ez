//my old hook still works lol
function isChat() {
    let _8 = "INPUT",
        _3 = document.activeElement.tagName;
    return _8 === _3;
}

let GenString = l => [...Array(l)].map(e => String.fromCharCode((r = Math.random, a = r() * 2 | 0 ? 65 : 97, r() * (a + 25 - a + 1) | 0 + a))).join('')

let varNames = (l, s) => [...Array(s)].map(e => GenString(l));

let esp = GenString(8);

window[esp] = false;

document.addEventListener('keydown', function (e) {
    if (!isChat() && e.key == 'n') {
        window[esp] = !window[esp]
    }
})

function conceal_function(original_Function, hook_Function) {
    var anti_map = [];
    var original_toString = Function.prototype.toString;

    function hook_toString(...args) {
        for (var i = 0; i < anti_map.length; i++) {
            if (anti_map[i].from === this) {
                return anti_map[i].to;
            }
        }
        return original_toString.apply(this, args);
    }

    anti_map.push({
        from: hook_Function,
        to: original_Function.toString()
    });
    anti_map.push({
        from: hook_toString,
        to: original_toString.toString()
    });
    Function.prototype.toString = hook_toString;
};

let handler = {
    construct(target, args) {
        let ff = []
        args.find((..._) => {
            let a = _[0].length > 1e6
            if (a) {
                ff = [_[0], _[1], args];
                return a
            }
        })
        if (ff[0]) {
            var code = args[ff[1]];
            code = code.replace(/if\((\([0-9a-zA-Z!\[\]'&=]+\)[0-9a-zA-Z!\[\]'&=]+\(![0-9a-zA-Z!\[\]'&|=]+\))([0-9a-zA-Z!\[\]'&|=]+)\)/,function(_,$1,$2){
                return "if(" + $1 + "&& !window." + esp + "?" + $2.slice(2) + ":" + $2.slice(2).split('&&').slice(0,-1).join('&&') + ")";
            });
            args[ff[1]] = code;
        }
        return new target(...args);
    }
};

let original_Function = Function;
let hook_Function = new Proxy(Function, handler);
conceal_function(original_Function, hook_Function);
Function = hook_Function;
