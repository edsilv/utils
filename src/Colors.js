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
