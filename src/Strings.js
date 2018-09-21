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
