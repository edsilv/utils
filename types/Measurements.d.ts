export declare class Size {
    width: number;
    height: number;
    constructor(width: number, height: number);
}
export declare class Dimensions {
    static fitRect(width1: number, height1: number, width2: number, height2: number): Size;
    static hitRect(x: number, y: number, w: number, h: number, mx: number, my: number): boolean;
}
