(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Async {
    static waitFor(test, successCallback, failureCallback, interval, maxTries, numTries) {
        if (!interval)
            interval = 200;
        if (!maxTries)
            maxTries = 100; // try 100 times over 20 seconds
        if (!numTries)
            numTries = 0;
        numTries += 1;
        if (numTries > maxTries) {
            if (failureCallback)
                failureCallback();
        }
        else if (test()) {
            successCallback();
        }
        else {
            setTimeout(function () {
                Async.waitFor(test, successCallback, failureCallback, interval, maxTries, numTries);
            }, interval);
        }
    }
}
exports.Async = Async;

},{}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Bools {
    static getBool(val, defaultVal) {
        if (val === null || typeof (val) === 'undefined') {
            return defaultVal;
        }
        return val;
    }
}
exports.Bools = Bools;

},{}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Clipboard {
    static supportsCopy() {
        return document.queryCommandSupported && document.queryCommandSupported('copy');
    }
    static copy(text) {
        text = Clipboard.convertBrToNewLine(text);
        var textArea = document.createElement("textarea");
        textArea.value = text;
        Clipboard.hideButKeepEnabled(textArea);
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
    }
    static hideButKeepEnabled(textArea) {
        // Place in top-left corner of screen regardless of scroll position.
        textArea.style.position = 'fixed';
        textArea.style.top = '0';
        textArea.style.left = '0';
        // Ensure it has a small width and height. Setting to 1px / 1em
        // doesn't work as this gives a negative w/h on some browsers.
        textArea.style.width = '2em';
        textArea.style.height = '2em';
        // We don't need padding, reducing the size if it does flash render.
        textArea.style.padding = '0';
        // Clean up any borders.
        textArea.style.border = 'none';
        textArea.style.outline = 'none';
        textArea.style.boxShadow = 'none';
        // Avoid flash of white box if rendered for any reason.
        textArea.style.background = 'transparent';
    }
    static convertBrToNewLine(text) {
        const brRegex = /<br\s*[\/]?>/gi;
        text = text.replace(brRegex, "\n");
        return text;
    }
}
exports.Clipboard = Clipboard;

},{}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Colors {
    static float32ColorToARGB(float32Color) {
        const a = (float32Color & 0xff000000) >>> 24;
        const r = (float32Color & 0xff0000) >>> 16;
        const g = (float32Color & 0xff00) >>> 8;
        const b = float32Color & 0xff;
        const result = [a, r, g, b];
        return result;
    }
    static _componentToHex(c) {
        const hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    }
    static rgbToHexString(rgb) {
        Colors.coalesce(rgb);
        return "#" + Colors._componentToHex(rgb[0]) + Colors._componentToHex(rgb[1]) + Colors._componentToHex(rgb[2]);
    }
    static argbToHexString(argb) {
        return "#" + Colors._componentToHex(argb[0]) + Colors._componentToHex(argb[1]) + Colors._componentToHex(argb[2]) + Colors._componentToHex(argb[3]);
    }
    static coalesce(arr) {
        for (let i = 1; i < arr.length; i++) {
            if (typeof (arr[i]) === 'undefined')
                arr[i] = arr[i - 1];
        }
    }
}
exports.Colors = Colors;

},{}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Dates {
    static getTimeStamp() {
        return new Date().getTime();
    }
}
exports.Dates = Dates;

},{}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Device {
    static getPixelRatio(ctx) {
        var dpr = window.devicePixelRatio || 1;
        var bsr = ctx.webkitBackingStorePixelRatio ||
            ctx.mozBackingStorePixelRatio ||
            ctx.msBackingStorePixelRatio ||
            ctx.oBackingStorePixelRatio ||
            ctx.backingStorePixelRatio || 1;
        return dpr / bsr;
    }
    static isTouch() {
        return !!("ontouchstart" in window) || window.navigator.msMaxTouchPoints > 0;
    }
}
exports.Device = Device;

},{}],7:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Documents {
    static isInIFrame() {
        // see http://stackoverflow.com/questions/326069/how-to-identify-if-a-webpage-is-being-loaded-inside-an-iframe-or-directly-into-t
        try {
            return window.self !== window.top;
        }
        catch (e) {
            return true;
        }
    }
    static supportsFullscreen() {
        const doc = document.documentElement;
        const support = doc.requestFullscreen || doc.mozRequestFullScreen ||
            doc.webkitRequestFullScreen || doc.msRequestFullscreen;
        return support !== undefined;
    }
    static isHidden() {
        const prop = Documents.getHiddenProp();
        if (!prop)
            return false;
        return true;
        //return document[prop];
    }
    static getHiddenProp() {
        const prefixes = ['webkit', 'moz', 'ms', 'o'];
        // if 'hidden' is natively supported just return it
        if ('hidden' in document)
            return 'hidden';
        // otherwise loop over all the known prefixes until we find one
        for (let i = 0; i < prefixes.length; i++) {
            if ((prefixes[i] + 'Hidden') in document) {
                return prefixes[i] + 'Hidden';
            }
        }
        // otherwise it's not supported
        return null;
    }
}
exports.Documents = Documents;

},{}],8:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Events {
    static debounce(fn, debounceDuration) {
        // summary:
        //      Returns a debounced function that will make sure the given
        //      function is not triggered too much.
        // fn: Function
        //      Function to debounce.
        // debounceDuration: Number
        //      OPTIONAL. The amount of time in milliseconds for which we
        //      will debounce the function. (defaults to 100ms)
        debounceDuration = debounceDuration || 100;
        return function () {
            if (!fn.debouncing) {
                const args = Array.prototype.slice.apply(arguments);
                fn.lastReturnVal = fn.apply(window, args);
                fn.debouncing = true;
            }
            clearTimeout(fn.debounceTimeout);
            fn.debounceTimeout = setTimeout(function () {
                fn.debouncing = false;
            }, debounceDuration);
            return fn.lastReturnVal;
        };
    }
}
exports.Events = Events;

},{}],9:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Files {
    static simplifyMimeType(mime) {
        switch (mime) {
            case 'text/plain':
                return 'txt';
            case 'image/jpeg':
                return 'jpg';
            case 'application/msword':
                return 'doc';
            case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
                return 'docx';
            default:
                const parts = mime.split('/');
                return parts[parts.length - 1];
        }
    }
}
exports.Files = Files;

},{}],10:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Keyboard {
    static getCharCode(e) {
        const charCode = (typeof e.which == "number") ? e.which : e.keyCode;
        return charCode;
    }
}
exports.Keyboard = Keyboard;

},{}],11:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Maths {
    static normalise(num, min, max) {
        return (num - min) / (max - min);
    }
    static median(values) {
        values.sort(function (a, b) {
            return a - b;
        });
        const half = Math.floor(values.length / 2);
        if (values.length % 2) {
            return values[half];
        }
        else {
            return (values[half - 1] + values[half]) / 2.0;
        }
    }
    static clamp(value, min, max) {
        return Math.min(Math.max(value, min), max);
    }
}
exports.Maths = Maths;

},{}],12:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Size {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }
}
exports.Size = Size;
class Dimensions {
    static fitRect(width1, height1, width2, height2) {
        const ratio1 = height1 / width1;
        const ratio2 = height2 / width2;
        let width = 0;
        let height = 0;
        let scale;
        if (ratio1 < ratio2) {
            scale = width2 / width1;
            width = width1 * scale;
            height = height1 * scale;
        }
        if (ratio2 < ratio1) {
            scale = height2 / height1;
            width = width1 * scale;
            height = height1 * scale;
        }
        return new Size(Math.floor(width), Math.floor(height));
    }
    static hitRect(x, y, w, h, mx, my) {
        if (mx > x && mx < (x + w) && my > y && my < (y + h)) {
            return true;
        }
        return false;
    }
}
exports.Dimensions = Dimensions;

},{}],13:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Numbers {
    static numericalInput(event) {
        // Allow: backspace, delete, tab and escape
        if (event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 ||
            // Allow: Ctrl+A
            (event.keyCode == 65 && event.ctrlKey === true) ||
            // Allow: home, end, left, right
            (event.keyCode >= 35 && event.keyCode <= 39)) {
            // let it happen, don't do anything
            return true;
        }
        else {
            // Ensure that it is a number and stop the keypress
            if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105)) {
                event.preventDefault();
                return false;
            }
            return true;
        }
    }
}
exports.Numbers = Numbers;

},{}],14:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Objects {
    static toPlainObject(value) {
        value = Object(value);
        const result = {};
        for (const key in value) {
            result[key] = value[key];
        }
        return result;
    }
}
exports.Objects = Objects;

},{}],15:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const StorageType_1 = require("./StorageType");
const StorageItem_1 = require("./StorageItem");
class Storage {
    static clear(storageType = StorageType_1.StorageType.MEMORY) {
        switch (storageType) {
            case StorageType_1.StorageType.MEMORY:
                this._memoryStorage = {};
                break;
            case StorageType_1.StorageType.SESSION:
                sessionStorage.clear();
                break;
            case StorageType_1.StorageType.LOCAL:
                localStorage.clear();
                break;
        }
    }
    static clearExpired(storageType = StorageType_1.StorageType.MEMORY) {
        const items = this.getItems(storageType);
        for (let i = 0; i < items.length; i++) {
            var item = items[i];
            if (this._isExpired(item)) {
                this.remove(item.key);
            }
        }
    }
    static get(key, storageType = StorageType_1.StorageType.MEMORY) {
        let data = null;
        switch (storageType) {
            case StorageType_1.StorageType.MEMORY:
                data = this._memoryStorage[key];
                break;
            case StorageType_1.StorageType.SESSION:
                data = sessionStorage.getItem(key);
                break;
            case StorageType_1.StorageType.LOCAL:
                data = localStorage.getItem(key);
                break;
        }
        if (!data)
            return null;
        let item = null;
        try {
            item = JSON.parse(data);
        }
        catch (error) {
            return null;
        }
        if (!item)
            return null;
        if (this._isExpired(item))
            return null;
        // useful reference
        item.key = key;
        return item;
    }
    static _isExpired(item) {
        if (new Date().getTime() < item.expiresAt) {
            return false;
        }
        return true;
    }
    static getItems(storageType = StorageType_1.StorageType.MEMORY) {
        const items = [];
        switch (storageType) {
            case StorageType_1.StorageType.MEMORY:
                const keys = Object.keys(this._memoryStorage);
                for (let i = 0; i < keys.length; i++) {
                    const item = this.get(keys[i], StorageType_1.StorageType.MEMORY);
                    if (item) {
                        items.push(item);
                    }
                }
                break;
            case StorageType_1.StorageType.SESSION:
                for (let i = 0; i < sessionStorage.length; i++) {
                    const key = sessionStorage.key(i);
                    if (key) {
                        const item = this.get(key, StorageType_1.StorageType.SESSION);
                        if (item) {
                            items.push(item);
                        }
                    }
                }
                break;
            case StorageType_1.StorageType.LOCAL:
                for (let i = 0; i < localStorage.length; i++) {
                    const key = localStorage.key(i);
                    if (key) {
                        const item = this.get(key, StorageType_1.StorageType.LOCAL);
                        if (item) {
                            items.push(item);
                        }
                    }
                }
                break;
        }
        return items;
    }
    static remove(key, storageType = StorageType_1.StorageType.MEMORY) {
        switch (storageType) {
            case StorageType_1.StorageType.MEMORY:
                delete this._memoryStorage[key];
                break;
            case StorageType_1.StorageType.SESSION:
                sessionStorage.removeItem(key);
                break;
            case StorageType_1.StorageType.LOCAL:
                localStorage.removeItem(key);
                break;
        }
    }
    static set(key, value, expirationSecs, storageType = StorageType_1.StorageType.MEMORY) {
        const expirationMS = expirationSecs * 1000;
        const record = new StorageItem_1.StorageItem();
        record.value = value;
        record.expiresAt = new Date().getTime() + expirationMS;
        switch (storageType) {
            case StorageType_1.StorageType.MEMORY:
                this._memoryStorage[key] = JSON.stringify(record);
                break;
            case StorageType_1.StorageType.SESSION:
                sessionStorage.setItem(key, JSON.stringify(record));
                break;
            case StorageType_1.StorageType.LOCAL:
                localStorage.setItem(key, JSON.stringify(record));
                break;
        }
        return record;
    }
}
Storage._memoryStorage = {};
exports.Storage = Storage;

},{"./StorageItem":16,"./StorageType":17}],16:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class StorageItem {
}
exports.StorageItem = StorageItem;

},{}],17:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var StorageType;
(function (StorageType) {
    StorageType["MEMORY"] = "memory";
    StorageType["SESSION"] = "session";
    StorageType["LOCAL"] = "local";
})(StorageType = exports.StorageType || (exports.StorageType = {}));

},{}],18:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Strings {
    static ellipsis(text, chars) {
        if (text.length <= chars)
            return text;
        let trimmedText = text.substr(0, chars);
        const lastSpaceIndex = trimmedText.lastIndexOf(" ");
        if (lastSpaceIndex != -1) {
            trimmedText = trimmedText.substr(0, Math.min(trimmedText.length, lastSpaceIndex));
        }
        return trimmedText + "&hellip;";
    }
    static htmlDecode(encoded) {
        const div = document.createElement('div');
        div.innerHTML = encoded;
        return div.firstChild.nodeValue;
    }
    static format(str, ...values) {
        for (let i = 0; i < values.length; i++) {
            const reg = new RegExp("\\{" + i + "\\}", "gm");
            str = str.replace(reg, values[i]);
        }
        return str;
    }
    static isAlphanumeric(str) {
        return /^[a-zA-Z0-9]*$/.test(str);
    }
    static toCssClass(str) {
        return str.replace(/[^a-z0-9]/g, function (s) {
            var c = s.charCodeAt(0);
            if (c == 32)
                return '-';
            if (c >= 65 && c <= 90)
                return '_' + s.toLowerCase();
            return '__' + ('000' + c.toString(16)).slice(-4);
        });
    }
    static toFileName(str) {
        return str.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    }
    static utf8_to_b64(str) {
        return window.btoa(unescape(encodeURIComponent(str)));
    }
}
exports.Strings = Strings;

},{}],19:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Urls {
    static getHashParameter(key, doc) {
        if (!doc)
            doc = window.document;
        return this.getHashParameterFromString(key, doc.location.hash);
    }
    static getHashParameterFromString(key, fragment) {
        const regex = new RegExp("#.*[?&]" + key + "=([^&]+)(&|$)");
        const match = regex.exec(fragment);
        return (match ? decodeURIComponent(match[1].replace(/\+/g, " ")) : null);
    }
    static setHashParameter(key, value, doc) {
        if (!doc)
            doc = window.document;
        const kvp = this.updateURIKeyValuePair(doc.location.hash.replace('#?', ''), key, value);
        const newHash = "#?" + kvp;
        let url = doc.URL;
        // remove hash value (if present).
        const index = url.indexOf('#');
        if (index != -1) {
            url = url.substr(0, url.indexOf('#'));
        }
        doc.location.replace(url + newHash);
    }
    static getQuerystringParameter(key, w) {
        if (!w)
            w = window;
        return this.getQuerystringParameterFromString(key, w.location.search);
    }
    static getQuerystringParameterFromString(key, querystring) {
        key = key.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
        const regex = new RegExp("[\\?&]" + key + "=([^&#]*)");
        const match = regex.exec(querystring);
        return (match ? decodeURIComponent(match[1].replace(/\+/g, " ")) : null);
    }
    static setQuerystringParameter(key, value, doc) {
        if (!doc)
            doc = window.document;
        const kvp = this.updateURIKeyValuePair(doc.location.hash.replace('#?', ''), key, value);
        // redirects.
        window.location.search = kvp;
    }
    static updateURIKeyValuePair(uriSegment, key, value) {
        key = encodeURIComponent(key);
        value = encodeURIComponent(value);
        const kvp = uriSegment.split('&');
        // Array.split() returns an array with a single "" item
        // if the target string is empty. remove if present.
        if (kvp[0] == "")
            kvp.shift();
        let i = kvp.length;
        let x;
        // replace if already present.
        while (i--) {
            x = kvp[i].split('=');
            if (x[0] == key) {
                x[1] = value;
                kvp[i] = x.join('=');
                break;
            }
        }
        // not found, so append.
        if (i < 0) {
            kvp[kvp.length] = [key, value].join('=');
        }
        return kvp.join('&');
    }
    static getUrlParts(url) {
        const a = document.createElement('a');
        a.href = url;
        return a;
    }
    static convertToRelativeUrl(url) {
        const parts = this.getUrlParts(url);
        let relUri = parts.pathname + parts.searchWithin;
        if (!relUri.startsWith("/")) {
            relUri = "/" + relUri;
        }
        return relUri;
    }
}
exports.Urls = Urls;

},{}],20:[function(require,module,exports){
(function (global){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _Async = require("./Async");
const _Bools = require("./Bools");
const _Clipboard = require("./Clipboard");
const _Colors = require("./Colors");
const _Dates = require("./Dates");
const _Device = require("./Device");
const _Documents = require("./Documents");
const _Events = require("./Events");
const _Files = require("./Files");
const _Keyboard = require("./Keyboard");
const _Maths = require("./Maths");
const _Measurements = require("./Measurements");
const _Numbers = require("./Numbers");
const _Objects = require("./Objects");
const _Storage = require("./Storage");
const _StorageItem = require("./StorageItem");
const _StorageType = require("./StorageType");
const _Strings = require("./Strings");
const _Urls = require("./Urls");
var Utils;
(function (Utils) {
    Utils.Async = _Async;
    Utils.Bools = _Bools;
    Utils.Clipboard = _Clipboard;
    Utils.Colors = _Colors;
    Utils.Dates = _Dates;
    Utils.Device = _Device;
    Utils.Documents = _Documents;
    Utils.Events = _Events;
    Utils.Files = _Files;
    Utils.Keyboard = _Keyboard;
    Utils.Maths = _Maths;
    Utils.Measurements = _Measurements;
    Utils.Numbers = _Numbers;
    Utils.Objects = _Objects;
    Utils.Storage = _Storage;
    Utils.StorageItem = _StorageItem;
    Utils.StorageType = _StorageType;
    Utils.Strings = _Strings;
    Utils.Urls = _Urls;
})(Utils = exports.Utils || (exports.Utils = {}));
global.Utils = Utils;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./Async":1,"./Bools":2,"./Clipboard":3,"./Colors":4,"./Dates":5,"./Device":6,"./Documents":7,"./Events":8,"./Files":9,"./Keyboard":10,"./Maths":11,"./Measurements":12,"./Numbers":13,"./Objects":14,"./Storage":15,"./StorageItem":16,"./StorageType":17,"./Strings":18,"./Urls":19}]},{},[20]);
