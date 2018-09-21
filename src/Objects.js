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
