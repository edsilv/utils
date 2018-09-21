export class Device {
    static getPixelRatio(ctx: CanvasRenderingContext2D): number {
        var dpr = window.devicePixelRatio || 1;
        var bsr = ctx.webkitBackingStorePixelRatio ||
            ctx.mozBackingStorePixelRatio ||
            ctx.msBackingStorePixelRatio ||
            ctx.oBackingStorePixelRatio ||
            ctx.backingStorePixelRatio || 1;

        return dpr / bsr;
    }
    
    static isTouch (): boolean {
        return !!("ontouchstart" in window) || (<any>window).navigator.msMaxTouchPoints > 0;
    }
}