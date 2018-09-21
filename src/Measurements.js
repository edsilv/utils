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
