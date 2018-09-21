"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Files {
    static simplifyMimeType(mime) {
        switch (mime) {
            case 'text/plain':
                return 'txt';
            case 'image/jpeg':
                return 'jpg';
            case 'application/msword':
                return 'doc';
            case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
                return 'docx';
            default:
                const parts = mime.split('/');
                return parts[parts.length - 1];
        }
    }
}
exports.Files = Files;
