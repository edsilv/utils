"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Urls {
    static getHashParameter(key, doc) {
        if (!doc)
            doc = window.document;
        return this.getHashParameterFromString(key, doc.location.hash);
    }
    static getHashParameterFromString(key, fragment) {
        const regex = new RegExp("#.*[?&]" + key + "=([^&]+)(&|$)");
        const match = regex.exec(fragment);
        return (match ? decodeURIComponent(match[1].replace(/\+/g, " ")) : null);
    }
    static setHashParameter(key, value, doc) {
        if (!doc)
            doc = window.document;
        const kvp = this.updateURIKeyValuePair(doc.location.hash.replace('#?', ''), key, value);
        const newHash = "#?" + kvp;
        let url = doc.URL;
        // remove hash value (if present).
        const index = url.indexOf('#');
        if (index != -1) {
            url = url.substr(0, url.indexOf('#'));
        }
        doc.location.replace(url + newHash);
    }
    static getQuerystringParameter(key, w) {
        if (!w)
            w = window;
        return this.getQuerystringParameterFromString(key, w.location.search);
    }
    static getQuerystringParameterFromString(key, querystring) {
        key = key.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
        const regex = new RegExp("[\\?&]" + key + "=([^&#]*)");
        const match = regex.exec(querystring);
        return (match ? decodeURIComponent(match[1].replace(/\+/g, " ")) : null);
    }
    static setQuerystringParameter(key, value, doc) {
        if (!doc)
            doc = window.document;
        const kvp = this.updateURIKeyValuePair(doc.location.hash.replace('#?', ''), key, value);
        // redirects.
        window.location.search = kvp;
    }
    static updateURIKeyValuePair(uriSegment, key, value) {
        key = encodeURIComponent(key);
        value = encodeURIComponent(value);
        const kvp = uriSegment.split('&');
        // Array.split() returns an array with a single "" item
        // if the target string is empty. remove if present.
        if (kvp[0] == "")
            kvp.shift();
        let i = kvp.length;
        let x;
        // replace if already present.
        while (i--) {
            x = kvp[i].split('=');
            if (x[0] == key) {
                x[1] = value;
                kvp[i] = x.join('=');
                break;
            }
        }
        // not found, so append.
        if (i < 0) {
            kvp[kvp.length] = [key, value].join('=');
        }
        return kvp.join('&');
    }
    static getUrlParts(url) {
        const a = document.createElement('a');
        a.href = url;
        return a;
    }
    static convertToRelativeUrl(url) {
        const parts = this.getUrlParts(url);
        let relUri = parts.pathname + parts.searchWithin;
        if (!relUri.startsWith("/")) {
            relUri = "/" + relUri;
        }
        return relUri;
    }
}
exports.Urls = Urls;
