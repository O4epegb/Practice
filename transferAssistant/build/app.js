/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var electron_1 = __webpack_require__(1);
	var utils = __webpack_require__(2);
	var shortcut_1 = __webpack_require__(6);
	var constants_1 = __webpack_require__(19);
	var inputPositions_1 = __webpack_require__(20);
	var players_1 = __webpack_require__(21);
	electron_1.app.on('ready', function () {
	    var players = players_1.players.filter(function (player) { return Number(player.price) <= 10000; }).map(function (player) { return (player.price = String(Number(player.price) * 0.8), player); });
	    players = utils.randomSort(players);
	    var lastPlayerPrice = '';
	    var needToUpdateMinPrice = false;
	    var playerCounter = 0;
	    function searchHandler() {
	        if (playerCounter >= players.length) {
	            needToUpdateMinPrice = true;
	            players = utils.randomSort(players);
	            playerCounter = 0;
	        }
	        else {
	            needToUpdateMinPrice = false;
	        }
	        var currentPlayer = players[playerCounter];
	        ++playerCounter;
	        console.log("Checking player \"" + currentPlayer.name + "\" with minPrice = " + currentPlayer.price);
	        utils.delay(0)
	            .then(function () {
	            utils.moveAndClick(inputPositions_1.inputs.clearPlayerInput);
	            return utils.delay(100);
	        }).then(function () {
	            utils.moveAndClick(inputPositions_1.inputs.playerInput);
	            return utils.delay(100);
	        }).then(function () {
	            utils.typeString(currentPlayer.alias);
	            return utils.delay(1000);
	        }).then(function () {
	            utils.moveAndClick(inputPositions_1.inputs.playerIcon);
	            return utils.delay(50);
	        }).then(function () {
	            utils.moveAndClick(inputPositions_1.inputs.priceInput, true);
	            return utils.delay(100);
	        }).then(function () {
	            if (lastPlayerPrice !== currentPlayer.price) {
	                lastPlayerPrice = currentPlayer.price;
	                utils.typeString(currentPlayer.price);
	                return utils.delay(100);
	            }
	        }).then(function () {
	            if (needToUpdateMinPrice) {
	                utils.moveAndClick(inputPositions_1.inputs.increaseBuyNowMinPrice);
	                return utils.delay(100);
	            }
	        }).then(function () {
	            utils.moveAndClick(inputPositions_1.inputs.searchButton);
	            return utils.delay(300);
	        }).then(function () {
	            utils.moveAndClick(inputPositions_1.inputs.popupCenterAndLeftButtons);
	        }).catch(function (err) {
	            console.log("Something went wrong.", err);
	        });
	    }
	    shortcut_1.registerShortcut(constants_1.shortcutNames.three, searchHandler);
	    shortcut_1.registerShortcut(constants_1.shortcutNames.two, function () {
	        utils.moveAndClick(inputPositions_1.inputs.popupCenterAndLeftButtons);
	    });
	    shortcut_1.registerShortcut(constants_1.shortcutNames.one, function () {
	        utils.moveAndClick(inputPositions_1.inputs.firstPlayerCard).then(function () {
	            return utils.delay(500);
	        }).then(function () {
	            utils.moveAndClick(inputPositions_1.inputs.buyNowButton);
	        });
	    });
	    shortcut_1.registerShortcut(constants_1.shortcutNames.four, function () {
	        utils.moveAndClick(inputPositions_1.inputs.backButton);
	    });
	});
	electron_1.app.on('will-quit', function () {
	    Object.keys(constants_1.shortcutNames).forEach(function (name) { return shortcut_1.unregisterShortcut(name); });
	});


/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("electron");

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var robot = __webpack_require__(3);
	function delay(ms) {
	    if (ms === void 0) { ms = 0; }
	    return new Promise(function (resolve, reject) {
	        setTimeout(function () {
	            resolve();
	        }, ms);
	    });
	}
	exports.delay = delay;
	function randomSort(arr) {
	    return arr.slice().sort(function () { return Math.random() > 0.5 ? 1 : 0; });
	}
	exports.randomSort = randomSort;
	function moveAndClick(_a, double) {
	    var x = _a.x, y = _a.y;
	    if (double === void 0) { double = false; }
	    return new Promise(function (resolve, reject) {
	        robot.moveMouse(x, y);
	        robot.mouseClick('left', double);
	        resolve();
	    });
	}
	exports.moveAndClick = moveAndClick;
	function typeString(str) {
	    robot.typeStringDelayed("" + str, 8000);
	}
	exports.typeString = typeString;
	function getPixelColor(_a) {
	    var x = _a.x, y = _a.y;
	    return robot.getPixelColor(x, y);
	}
	exports.getPixelColor = getPixelColor;
	function getMouseCoords() {
	    return robot.getMousePos();
	}
	exports.getMouseCoords = getMouseCoords;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var robotjs = __webpack_require__(4);

	module.exports = robotjs;

	module.exports.screen = {};

	function bitmap(width, height, byteWidth, bitsPerPixel, bytesPerPixel, image) 
	{
	    this.width = width;
	    this.height = height;
	    this.byteWidth = byteWidth;
	    this.bitsPerPixel = bitsPerPixel;
	    this.bytesPerPixel = bytesPerPixel;
	    this.image = image;

	    this.colorAt = function(x, y)
	    {
	        return robotjs.getColor(this, x, y);
	    };

	}

	module.exports.screen.capture = function(x, y, width, height)
	{
	    //If coords have been passed, use them.
	    if (typeof x !== "undefined" && typeof y !== "undefined" && typeof width !== "undefined" && typeof height !== "undefined")
	    {
	        b = robotjs.captureScreen(x, y, width, height);
	    }
	    else 
	    {
	        b = robotjs.captureScreen();
	    }

	    return new bitmap(b.width, b.height, b.byteWidth, b.bitsPerPixel, b.bytesPerPixel, b.image);
	};


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {try {global.process.dlopen(module, "E:\\Projects\\Practice\\clicker\\node_modules\\robotjs\\build\\Release\\robotjs.node"); } catch(e) {throw new Error('Cannot open ' + "E:\\Projects\\Practice\\clicker\\node_modules\\robotjs\\build\\Release\\robotjs.node" + ': ' + e);}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5)(module)))

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var electron_1 = __webpack_require__(1);
	var debounce = __webpack_require__(7);
	function registerShortcut(shortcutName, cb) {
	    var counter = 0;
	    return new Promise(function (resolve, reject) {
	        var ret = electron_1.globalShortcut.register(shortcutName, debounce(function () {
	            console.log("Shortcut \"" + shortcutName + "\" is pressed " + ++counter + " time");
	            cb(counter);
	        }, 50));
	        if (!ret) {
	            console.log("ERROR: Shortcut \"" + shortcutName + "\" registration failed");
	            reject();
	        }
	        else {
	            console.log("SUCCESS: Shortcut \"" + shortcutName + "\" is registered = " + electron_1.globalShortcut.isRegistered(shortcutName));
	            resolve();
	        }
	    });
	}
	exports.registerShortcut = registerShortcut;
	function unregisterShortcut(shortcutName) {
	    return new Promise(function (resolve, reject) {
	        electron_1.globalShortcut.unregister(shortcutName);
	        electron_1.globalShortcut.unregisterAll();
	        resolve();
	    });
	}
	exports.unregisterShortcut = unregisterShortcut;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(8),
	    now = __webpack_require__(9),
	    toNumber = __webpack_require__(12);

	/** Error message constants. */
	var FUNC_ERROR_TEXT = 'Expected a function';

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max,
	    nativeMin = Math.min;

	/**
	 * Creates a debounced function that delays invoking `func` until after `wait`
	 * milliseconds have elapsed since the last time the debounced function was
	 * invoked. The debounced function comes with a `cancel` method to cancel
	 * delayed `func` invocations and a `flush` method to immediately invoke them.
	 * Provide `options` to indicate whether `func` should be invoked on the
	 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
	 * with the last arguments provided to the debounced function. Subsequent
	 * calls to the debounced function return the result of the last `func`
	 * invocation.
	 *
	 * **Note:** If `leading` and `trailing` options are `true`, `func` is
	 * invoked on the trailing edge of the timeout only if the debounced function
	 * is invoked more than once during the `wait` timeout.
	 *
	 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
	 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
	 *
	 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
	 * for details over the differences between `_.debounce` and `_.throttle`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Function
	 * @param {Function} func The function to debounce.
	 * @param {number} [wait=0] The number of milliseconds to delay.
	 * @param {Object} [options={}] The options object.
	 * @param {boolean} [options.leading=false]
	 *  Specify invoking on the leading edge of the timeout.
	 * @param {number} [options.maxWait]
	 *  The maximum time `func` is allowed to be delayed before it's invoked.
	 * @param {boolean} [options.trailing=true]
	 *  Specify invoking on the trailing edge of the timeout.
	 * @returns {Function} Returns the new debounced function.
	 * @example
	 *
	 * // Avoid costly calculations while the window size is in flux.
	 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
	 *
	 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
	 * jQuery(element).on('click', _.debounce(sendMail, 300, {
	 *   'leading': true,
	 *   'trailing': false
	 * }));
	 *
	 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
	 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
	 * var source = new EventSource('/stream');
	 * jQuery(source).on('message', debounced);
	 *
	 * // Cancel the trailing debounced invocation.
	 * jQuery(window).on('popstate', debounced.cancel);
	 */
	function debounce(func, wait, options) {
	  var lastArgs,
	      lastThis,
	      maxWait,
	      result,
	      timerId,
	      lastCallTime,
	      lastInvokeTime = 0,
	      leading = false,
	      maxing = false,
	      trailing = true;

	  if (typeof func != 'function') {
	    throw new TypeError(FUNC_ERROR_TEXT);
	  }
	  wait = toNumber(wait) || 0;
	  if (isObject(options)) {
	    leading = !!options.leading;
	    maxing = 'maxWait' in options;
	    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
	    trailing = 'trailing' in options ? !!options.trailing : trailing;
	  }

	  function invokeFunc(time) {
	    var args = lastArgs,
	        thisArg = lastThis;

	    lastArgs = lastThis = undefined;
	    lastInvokeTime = time;
	    result = func.apply(thisArg, args);
	    return result;
	  }

	  function leadingEdge(time) {
	    // Reset any `maxWait` timer.
	    lastInvokeTime = time;
	    // Start the timer for the trailing edge.
	    timerId = setTimeout(timerExpired, wait);
	    // Invoke the leading edge.
	    return leading ? invokeFunc(time) : result;
	  }

	  function remainingWait(time) {
	    var timeSinceLastCall = time - lastCallTime,
	        timeSinceLastInvoke = time - lastInvokeTime,
	        result = wait - timeSinceLastCall;

	    return maxing ? nativeMin(result, maxWait - timeSinceLastInvoke) : result;
	  }

	  function shouldInvoke(time) {
	    var timeSinceLastCall = time - lastCallTime,
	        timeSinceLastInvoke = time - lastInvokeTime;

	    // Either this is the first call, activity has stopped and we're at the
	    // trailing edge, the system time has gone backwards and we're treating
	    // it as the trailing edge, or we've hit the `maxWait` limit.
	    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
	      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
	  }

	  function timerExpired() {
	    var time = now();
	    if (shouldInvoke(time)) {
	      return trailingEdge(time);
	    }
	    // Restart the timer.
	    timerId = setTimeout(timerExpired, remainingWait(time));
	  }

	  function trailingEdge(time) {
	    timerId = undefined;

	    // Only invoke if we have `lastArgs` which means `func` has been
	    // debounced at least once.
	    if (trailing && lastArgs) {
	      return invokeFunc(time);
	    }
	    lastArgs = lastThis = undefined;
	    return result;
	  }

	  function cancel() {
	    if (timerId !== undefined) {
	      clearTimeout(timerId);
	    }
	    lastInvokeTime = 0;
	    lastArgs = lastCallTime = lastThis = timerId = undefined;
	  }

	  function flush() {
	    return timerId === undefined ? result : trailingEdge(now());
	  }

	  function debounced() {
	    var time = now(),
	        isInvoking = shouldInvoke(time);

	    lastArgs = arguments;
	    lastThis = this;
	    lastCallTime = time;

	    if (isInvoking) {
	      if (timerId === undefined) {
	        return leadingEdge(lastCallTime);
	      }
	      if (maxing) {
	        // Handle invocations in a tight loop.
	        timerId = setTimeout(timerExpired, wait);
	        return invokeFunc(lastCallTime);
	      }
	    }
	    if (timerId === undefined) {
	      timerId = setTimeout(timerExpired, wait);
	    }
	    return result;
	  }
	  debounced.cancel = cancel;
	  debounced.flush = flush;
	  return debounced;
	}

	module.exports = debounce;


/***/ },
/* 8 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is the
	 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
	 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(_.noop);
	 * // => true
	 *
	 * _.isObject(null);
	 * // => false
	 */
	function isObject(value) {
	  var type = typeof value;
	  return value != null && (type == 'object' || type == 'function');
	}

	module.exports = isObject;


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var root = __webpack_require__(10);

	/**
	 * Gets the timestamp of the number of milliseconds that have elapsed since
	 * the Unix epoch (1 January 1970 00:00:00 UTC).
	 *
	 * @static
	 * @memberOf _
	 * @since 2.4.0
	 * @category Date
	 * @returns {number} Returns the timestamp.
	 * @example
	 *
	 * _.defer(function(stamp) {
	 *   console.log(_.now() - stamp);
	 * }, _.now());
	 * // => Logs the number of milliseconds it took for the deferred invocation.
	 */
	var now = function() {
	  return root.Date.now();
	};

	module.exports = now;


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var freeGlobal = __webpack_require__(11);

	/** Detect free variable `self`. */
	var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

	/** Used as a reference to the global object. */
	var root = freeGlobal || freeSelf || Function('return this')();

	module.exports = root;


/***/ },
/* 11 */
/***/ function(module, exports) {

	/** Detect free variable `global` from Node.js. */
	var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

	module.exports = freeGlobal;


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(8),
	    isSymbol = __webpack_require__(13);

	/** Used as references for various `Number` constants. */
	var NAN = 0 / 0;

	/** Used to match leading and trailing whitespace. */
	var reTrim = /^\s+|\s+$/g;

	/** Used to detect bad signed hexadecimal string values. */
	var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

	/** Used to detect binary string values. */
	var reIsBinary = /^0b[01]+$/i;

	/** Used to detect octal string values. */
	var reIsOctal = /^0o[0-7]+$/i;

	/** Built-in method references without a dependency on `root`. */
	var freeParseInt = parseInt;

	/**
	 * Converts `value` to a number.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to process.
	 * @returns {number} Returns the number.
	 * @example
	 *
	 * _.toNumber(3.2);
	 * // => 3.2
	 *
	 * _.toNumber(Number.MIN_VALUE);
	 * // => 5e-324
	 *
	 * _.toNumber(Infinity);
	 * // => Infinity
	 *
	 * _.toNumber('3.2');
	 * // => 3.2
	 */
	function toNumber(value) {
	  if (typeof value == 'number') {
	    return value;
	  }
	  if (isSymbol(value)) {
	    return NAN;
	  }
	  if (isObject(value)) {
	    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
	    value = isObject(other) ? (other + '') : other;
	  }
	  if (typeof value != 'string') {
	    return value === 0 ? value : +value;
	  }
	  value = value.replace(reTrim, '');
	  var isBinary = reIsBinary.test(value);
	  return (isBinary || reIsOctal.test(value))
	    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
	    : (reIsBadHex.test(value) ? NAN : +value);
	}

	module.exports = toNumber;


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var baseGetTag = __webpack_require__(14),
	    isObjectLike = __webpack_require__(18);

	/** `Object#toString` result references. */
	var symbolTag = '[object Symbol]';

	/**
	 * Checks if `value` is classified as a `Symbol` primitive or object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
	 * @example
	 *
	 * _.isSymbol(Symbol.iterator);
	 * // => true
	 *
	 * _.isSymbol('abc');
	 * // => false
	 */
	function isSymbol(value) {
	  return typeof value == 'symbol' ||
	    (isObjectLike(value) && baseGetTag(value) == symbolTag);
	}

	module.exports = isSymbol;


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var Symbol = __webpack_require__(15),
	    getRawTag = __webpack_require__(16),
	    objectToString = __webpack_require__(17);

	/** `Object#toString` result references. */
	var nullTag = '[object Null]',
	    undefinedTag = '[object Undefined]';

	/** Built-in value references. */
	var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

	/**
	 * The base implementation of `getTag` without fallbacks for buggy environments.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the `toStringTag`.
	 */
	function baseGetTag(value) {
	  if (value == null) {
	    return value === undefined ? undefinedTag : nullTag;
	  }
	  value = Object(value);
	  return (symToStringTag && symToStringTag in value)
	    ? getRawTag(value)
	    : objectToString(value);
	}

	module.exports = baseGetTag;


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var root = __webpack_require__(10);

	/** Built-in value references. */
	var Symbol = root.Symbol;

	module.exports = Symbol;


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var Symbol = __webpack_require__(15);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var nativeObjectToString = objectProto.toString;

	/** Built-in value references. */
	var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

	/**
	 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the raw `toStringTag`.
	 */
	function getRawTag(value) {
	  var isOwn = hasOwnProperty.call(value, symToStringTag),
	      tag = value[symToStringTag];

	  try {
	    value[symToStringTag] = undefined;
	    var unmasked = true;
	  } catch (e) {}

	  var result = nativeObjectToString.call(value);
	  if (unmasked) {
	    if (isOwn) {
	      value[symToStringTag] = tag;
	    } else {
	      delete value[symToStringTag];
	    }
	  }
	  return result;
	}

	module.exports = getRawTag;


/***/ },
/* 17 */
/***/ function(module, exports) {

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var nativeObjectToString = objectProto.toString;

	/**
	 * Converts `value` to a string using `Object.prototype.toString`.
	 *
	 * @private
	 * @param {*} value The value to convert.
	 * @returns {string} Returns the converted string.
	 */
	function objectToString(value) {
	  return nativeObjectToString.call(value);
	}

	module.exports = objectToString;


/***/ },
/* 18 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
	function isObjectLike(value) {
	  return value != null && typeof value == 'object';
	}

	module.exports = isObjectLike;


/***/ },
/* 19 */
/***/ function(module, exports) {

	"use strict";
	exports.shortcutNames = {
	    one: 'CommandOrControl+Shift+Alt+Q',
	    two: 'CommandOrControl+Shift+Alt+W',
	    three: 'CommandOrControl+Shift+Alt+E',
	    four: 'CommandOrControl+Shift+Alt+R',
	};
	exports.playerIconBgColor = '2c313c';


/***/ },
/* 20 */
/***/ function(module, exports) {

	"use strict";
	exports.inputs = {
	    playerInput: {
	        x: 502,
	        y: 439
	    },
	    playerIcon: {
	        x: 502,
	        y: 469
	    },
	    priceInput: {
	        x: 614,
	        y: 677
	    },
	    searchButton: {
	        x: 609,
	        y: 744
	    },
	    popupCenterAndLeftButtons: {
	        x: 815,
	        y: 573
	    },
	    clearPlayerInput: {
	        x: 642,
	        y: 439
	    },
	    increaseBuyNowMinPrice: {
	        x: 683,
	        y: 638
	    },
	    firstPlayerCard: {
	        x: 426,
	        y: 638
	    },
	    buyNowButton: {
	        x: 1105,
	        y: 467
	    },
	    backButton: {
	        x: 520,
	        y: 550
	    }
	};


/***/ },
/* 21 */
/***/ function(module, exports) {

	"use strict";
	var playersData = {
	    // Just ~84 OVR players
	    'Xhaka': '6.2/x',
	    'Azpilicueta': '7.7/az',
	    'Ramsey': '5.9/aa',
	    'Eriksen': '9.5/er',
	    'Mata': '6.9/ju',
	    'Laporte': '6.5/ay',
	    'AndreGomes': '6.8/gom',
	    'Carvalho': '7/carv',
	    'Draxler': '6.5/dr',
	    'Koke': '6.6/res',
	    'Howedes': '6.1/how',
	    'Jonas': '6.5/oli',
	    'Garay': '6/ez',
	    'Aduriz': '7/ad',
	    'Bacca': '6.7/bac',
	    'Gotze': '6/got',
	    'JaviMartinez': '6/agi',
	    'Sokratis': '7.4/sok',
	    'Matic': '10/nem',
	    'Turan': '6.5/tu',
	    'XabiAlonso': '6.5/xa',
	    'Manolas': '6/kost',
	    'Toprak': '6/om',
	    'Krych': '6/grz',
	    'ThiagoAlcantara': '6/alc',
	    'Isco': '6.3/is',
	    'Banega': '6/ev',
	    'Terry': '7/ter',
	    'Veratti': '8.7/ver',
	    // Other valuable players
	    'Kroos': '38/kro',
	    'Higuain': '78/hi',
	    'Pepe': '40/pe',
	    'Chiellini': '67/ch',
	    'Godin': '20/go',
	    'Iniesta': '40/in',
	    'Lahm': '25/ph',
	    'DiMaria': '45/ang',
	    'Rakitic': '28/iv',
	    'Benzema': '58/ka',
	    'DavidSilva': '18/ji',
	    'James': '75/ja',
	    'Hummels': '25/hum',
	    'Muller': '30/mu',
	    'Bonucci': '26/bon',
	    'Busquets': '19/bus',
	    'Fabregas': '16/ces',
	    'Marchisio': '70/cl',
	    'Miranda': '14/mir',
	    'Payet': '18/pay',
	    'Pique': '12/piq',
	    'Marcelo': '30/vie',
	    'Barzagli': '23/bar',
	    'Alba': '35/alb',
	    'Cazorla': '18/caz',
	    'Kompany': '35/ko',
	    'Ribery': '17/ri',
	    'Matuidi': '40/bl',
	    'Alderweireld': '14/tob',
	    'FilipeLuis': '14/kas',
	    'DiegoCosta': '26/cos',
	    'Lacazette': '65/lac',
	    'Coutinho': '34/cor',
	    'Mahrez': '18/mah',
	    'DaniAlves': '19/dan',
	    'Pjanic': '25/pj',
	    'Koscielny': '40/kos',
	    'Hamsik': '13/ham',
	    'Willian': '40/wil',
	    'Miki': '20/mk',
	    'Gundogan': '35/gu',
	    'Otamendi': '13/ot',
	    'Pastore': '9/pas',
	    // GKs
	    'Neuer': '250/ne',
	    'DeGea': '140/ge',
	    'Courtois': '85/cou',
	    'Lloris': '30/ll',
	    'Čech': '25/ce',
	    'Buffon': '25/bu',
	    'Handanovič': '14/han',
	    'Oblak': '12/ob',
	    'Leno': '14/ber',
	    'Mandanda': '11/st',
	    'Bravo': '9.5/bra',
	    'Ruffier': '9/ruf',
	    'Navas': '11/na',
	    'Patrício': '5.5/rui',
	    'Sommer': '6.5/som',
	    'Fährmann': '6/fah',
	    'Reina': '6.5/rei',
	    'Hart': '6.2/joe',
	    'Perin': '',
	    'Alves': '',
	    'Consigli': '',
	    'JulioCésar': '',
	    'Muslera': '',
	    'Begović': '',
	    'Lopes': '',
	    'Subašić': '',
	    'Enyeama': '',
	    'terStegen': '',
	    'Trapp': '',
	    //
	    'Boateng': '250/bo',
	    'Lewandowski': '230/le',
	    'Ozil': '45/o',
	    'Modric': '80/mo',
	    'ThiagoSilva': '55/th',
	    'Ramos': '130/ra',
	    'DeBruyne': '220/br',
	    'Griezmann': '210/gr',
	    'Hazard': '220/ha',
	    'Reus': '180/re',
	    'Alaba': '160/ala',
	    'Sanchez': '90/al',
	    'Vidal': '170/vi',
	    'Aubameyang': '320/au',
	    'Ibrahimovic': '500/ib',
	};
	exports.players = Object.keys(playersData).map(function (name) {
	    var playerInfo = playersData[name];
	    if (playerInfo.length === 0) {
	        return;
	    }
	    var _a = playerInfo.split('/'), shortPrice = _a[0], alias = _a[1];
	    var price = String((parseFloat(shortPrice) || 0) * 1000);
	    return {
	        name: name,
	        alias: alias,
	        price: price
	    };
	}).filter(Boolean);


/***/ }
/******/ ]);