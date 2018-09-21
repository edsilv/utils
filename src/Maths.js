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
