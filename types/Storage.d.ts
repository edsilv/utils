import { StorageType } from "./StorageType";
import { StorageItem } from "./StorageItem";
export declare class Storage {
    private static _memoryStorage;
    static clear(storageType?: StorageType): void;
    static clearExpired(storageType?: StorageType): void;
    static get(key: string, storageType?: StorageType): StorageItem | null;
    private static _isExpired;
    static getItems(storageType?: StorageType): StorageItem[];
    static remove(key: string, storageType?: StorageType): void;
    static set(key: string, value: any, expirationSecs: number, storageType?: StorageType): StorageItem;
}
