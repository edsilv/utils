declare namespace Utils {
    class Async {
        static waitFor(test: () => boolean, successCallback: () => void, failureCallback?: () => void, interval?: number, maxTries?: number, numTries?: number): void;
    }
    class Bools {
        static getBool(val: any, defaultVal: boolean): boolean;
    }
    class Clipboard {
        static supportsCopy(): boolean;
        static copy(text: string): void;
        private static hideButKeepEnabled;
        private static convertBrToNewLine;
    }
    class Colors {
        static float32ColorToARGB(float32Color: number): number[];
        private static _componentToHex;
        static rgbToHexString(rgb: number[]): string;
        static argbToHexString(argb: number[]): string;
        static coalesce(arr: any[]): void;
    }
    class Dates {
        static getTimeStamp(): number;
    }
    class Device {
        static getPixelRatio(ctx: CanvasRenderingContext2D): number;
        static isTouch(): boolean;
    }
    class Documents {
        static isInIFrame(): boolean;
        static supportsFullscreen(): boolean;
        static isHidden(): boolean;
        static getHiddenProp(): string | null;
    }
    class Events {
        static debounce(fn: any, debounceDuration: number): any;
    }
    class Files {
        static simplifyMimeType(mime: string): string;
    }
    class Keyboard {
        static getCharCode(e: KeyboardEvent): number;
    }
    class Maths {
        static normalise(num: number, min: number, max: number): number;
        static median(values: number[]): number;
        static clamp(value: number, min: number, max: number): number;
    }
    class Size {
        width: number;
        height: number;
        constructor(width: number, height: number);
    }
    class Dimensions {
        static fitRect(width1: number, height1: number, width2: number, height2: number): Size;
        static hitRect(x: number, y: number, w: number, h: number, mx: number, my: number): boolean;
    }
    class Numbers {
        static numericalInput(event: any): boolean;
    }
    class Objects {
        static toPlainObject(value: any): any;
    }
    class Storage {
        private static _memoryStorage;
        static clear(storageType?: StorageType): void;
        static clearExpired(storageType?: StorageType): void;
        static get(key: string, storageType?: StorageType): StorageItem | null;
        private static _isExpired;
        static getItems(storageType?: StorageType): StorageItem[];
        static remove(key: string, storageType?: StorageType): void;
        static set(key: string, value: any, expirationSecs: number, storageType?: StorageType): StorageItem;
    }
    class StorageItem {
        key: string;
        value: any;
        expiresAt: number;
    }
    class StorageType {
        value: string;
        static memory: StorageType;
        static session: StorageType;
        static local: StorageType;
        constructor(value: string);
        toString(): string;
    }
    class Strings {
        static ellipsis(text: string, chars: number): string;
        static htmlDecode(encoded: string): string;
        static format(str: string, ...values: string[]): string;
        static isAlphanumeric(str: string): boolean;
        static toCssClass(str: string): string;
        static toFileName(str: string): string;
        static utf8_to_b64(str: string): string;
    }
    class Urls {
        static getHashParameter(key: string, doc?: Document): string | null;
        static getHashParameterFromString(key: string, url: string): string | null;
        static setHashParameter(key: string, value: any, doc?: Document): void;
        static getQuerystringParameter(key: string, w?: Window): string | null;
        static getQuerystringParameterFromString(key: string, querystring: string): string | null;
        static setQuerystringParameter(key: string, value: any, doc?: Document): void;
        static updateURIKeyValuePair(uriSegment: string, key: string, value: string): string;
        static getUrlParts(url: string): any;
        static convertToRelativeUrl(url: string): string;
    }
}
