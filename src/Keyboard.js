"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Keyboard {
    static getCharCode(e) {
        const charCode = (typeof e.which == "number") ? e.which : e.keyCode;
        return charCode;
    }
}
exports.Keyboard = Keyboard;
