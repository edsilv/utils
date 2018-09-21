export declare class Urls {
    static getHashParameter(key: string, doc?: Document): string | null;
    static getHashParameterFromString(key: string, fragment: string): string | null;
    static setHashParameter(key: string, value: any, doc?: Document): void;
    static getQuerystringParameter(key: string, w?: Window): string | null;
    static getQuerystringParameterFromString(key: string, querystring: string): string | null;
    static setQuerystringParameter(key: string, value: any, doc?: Document): void;
    static updateURIKeyValuePair(uriSegment: string, key: string, value: string): string;
    static getUrlParts(url: string): any;
    static convertToRelativeUrl(url: string): string;
}
