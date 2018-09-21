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
