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
