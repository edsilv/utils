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
