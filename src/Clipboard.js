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
