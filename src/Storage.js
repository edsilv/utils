"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const StorageType_1 = require("./StorageType");
const StorageItem_1 = require("./StorageItem");
class Storage {
    static clear(storageType = StorageType_1.StorageType.MEMORY) {
        switch (storageType) {
            case StorageType_1.StorageType.MEMORY:
                this._memoryStorage = {};
                break;
            case StorageType_1.StorageType.SESSION:
                sessionStorage.clear();
                break;
            case StorageType_1.StorageType.LOCAL:
                localStorage.clear();
                break;
        }
    }
    static clearExpired(storageType = StorageType_1.StorageType.MEMORY) {
        const items = this.getItems(storageType);
        for (let i = 0; i < items.length; i++) {
            var item = items[i];
            if (this._isExpired(item)) {
                this.remove(item.key);
            }
        }
    }
    static get(key, storageType = StorageType_1.StorageType.MEMORY) {
        let data = null;
        switch (storageType) {
            case StorageType_1.StorageType.MEMORY:
                data = this._memoryStorage[key];
                break;
            case StorageType_1.StorageType.SESSION:
                data = sessionStorage.getItem(key);
                break;
            case StorageType_1.StorageType.LOCAL:
                data = localStorage.getItem(key);
                break;
        }
        if (!data)
            return null;
        let item = null;
        try {
            item = JSON.parse(data);
        }
        catch (error) {
            return null;
        }
        if (!item)
            return null;
        if (this._isExpired(item))
            return null;
        // useful reference
        item.key = key;
        return item;
    }
    static _isExpired(item) {
        if (new Date().getTime() < item.expiresAt) {
            return false;
        }
        return true;
    }
    static getItems(storageType = StorageType_1.StorageType.MEMORY) {
        const items = [];
        switch (storageType) {
            case StorageType_1.StorageType.MEMORY:
                const keys = Object.keys(this._memoryStorage);
                for (let i = 0; i < keys.length; i++) {
                    const item = this.get(keys[i], StorageType_1.StorageType.MEMORY);
                    if (item) {
                        items.push(item);
                    }
                }
                break;
            case StorageType_1.StorageType.SESSION:
                for (let i = 0; i < sessionStorage.length; i++) {
                    const key = sessionStorage.key(i);
                    if (key) {
                        const item = this.get(key, StorageType_1.StorageType.SESSION);
                        if (item) {
                            items.push(item);
                        }
                    }
                }
                break;
            case StorageType_1.StorageType.LOCAL:
                for (let i = 0; i < localStorage.length; i++) {
                    const key = localStorage.key(i);
                    if (key) {
                        const item = this.get(key, StorageType_1.StorageType.LOCAL);
                        if (item) {
                            items.push(item);
                        }
                    }
                }
                break;
        }
        return items;
    }
    static remove(key, storageType = StorageType_1.StorageType.MEMORY) {
        switch (storageType) {
            case StorageType_1.StorageType.MEMORY:
                delete this._memoryStorage[key];
                break;
            case StorageType_1.StorageType.SESSION:
                sessionStorage.removeItem(key);
                break;
            case StorageType_1.StorageType.LOCAL:
                localStorage.removeItem(key);
                break;
        }
    }
    static set(key, value, expirationSecs, storageType = StorageType_1.StorageType.MEMORY) {
        const expirationMS = expirationSecs * 1000;
        const record = new StorageItem_1.StorageItem();
        record.value = value;
        record.expiresAt = new Date().getTime() + expirationMS;
        switch (storageType) {
            case StorageType_1.StorageType.MEMORY:
                this._memoryStorage[key] = JSON.stringify(record);
                break;
            case StorageType_1.StorageType.SESSION:
                sessionStorage.setItem(key, JSON.stringify(record));
                break;
            case StorageType_1.StorageType.LOCAL:
                localStorage.setItem(key, JSON.stringify(record));
                break;
        }
        return record;
    }
}
Storage._memoryStorage = {};
exports.Storage = Storage;
