const replace = String.prototype.replace;
var anti_map = [];

function conceal_function(original_Function, hook_Function) {
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

function isChat() {
	let _8 = "INPUT",
		_3 = document.activeElement.tagName;
	return _8 === _3;
}

const GenString = l => [...Array(l)].map(e => String.fromCharCode((r = Math.random, a = r() * 2 | 0 ? 65 : 97, r() * (a + 25 - a + 1) | 0 + a))).join('')

const varNames = (l, s) => [...Array(s)].map(e => GenString(l))
/*--------------------------------------------------------------------------------------*/
let local = {}
let [esp, sockets] = varNames(8, 2)
local[sockets] = []
local[name] = '?'
window[esp] = false

const handler = {
	construct(target, args) {
		//find source
		let ff = []
		args.find((..._) => {
			let a = _[0].length > 1e5
			if (a) {
				ff = [_[0], _[1], args];
				return a
			}
		})

		//store original string
		var orig = new target(...args) + []

		//make changes to target constructor
		if (ff[0]) {
			var code = args[ff[1]];
			code = replace.call(code, /(b\['exports']={')/, 'window.ws = $1')
			code = replace.call(code, /if\((!\w+\['\w+'])\)continue;/, 'if($1&&window.' + esp + ')continue;')
			args[ff[1]] = code;
		}

		//restore string for check
		var ret = new target(...args)
		let save = ret.toString
		ret.toString = () => orig
		//hide hooked toString
		conceal_function(save, ret.toString)

		//return target contructor
		return ret
	}
};

//keydown listener for keybinds
document.addEventListener('keydown', function (e) {
	if (!isChat() && e.key == 'n') {
		window[esp] = !window[esp]
	}
})
document.addEventListener('mouseup', function(e){
    if (e.button == 4) {
        console.log('requested player data')
        window.ws.send('p')
    }
})

//make hooks
var original_Function = Function;
var hook_Function = new Proxy(Function, handler);
conceal_function(original_Function, hook_Function);
Function = hook_Function;
window.activeHacker = true
