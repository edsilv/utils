import { StorageType } from "./StorageType";
import { StorageItem } from "./StorageItem";

export class Storage {
    private static _memoryStorage:any = {};

    public static clear(storageType: StorageType = StorageType.MEMORY): void {
        switch (storageType) {
            case StorageType.MEMORY:
                this._memoryStorage = {};
                break;
            case StorageType.SESSION:
                sessionStorage.clear();
                break;
            case StorageType.LOCAL:
                localStorage.clear();
                break;
        }
    }

    public static clearExpired(storageType: StorageType = StorageType.MEMORY): void {
        const items: StorageItem[] = this.getItems(storageType);

        for (let i = 0; i < items.length; i++) {
            var item = items[i];

            if (this._isExpired(item)) {
                this.remove(item.key);
            }
        }
    }

    public static get(key: string, storageType: StorageType = StorageType.MEMORY): StorageItem | null {

        let data: string | null = null;

        switch (storageType) {
            case StorageType.MEMORY:
                data = this._memoryStorage[key];
                break;
            case StorageType.SESSION:
                data = sessionStorage.getItem(key);
                break;
            case StorageType.LOCAL:
                data = localStorage.getItem(key);
                break;
        }

        if (!data) return null;

        let item: StorageItem | null = null;

        try {
            item = JSON.parse(data);
        } catch (error) {
            return null;
        }

        if (!item) return null;
        
        if (this._isExpired(item)) return null;

        // useful reference
        item.key = key;

        return item;
    }

    private static _isExpired(item: StorageItem): boolean {
        if (new Date().getTime() < item.expiresAt) {
            return false;
        }

        return true;
    }

    public static getItems(storageType: StorageType = StorageType.MEMORY): StorageItem[] {

        const items: StorageItem[] = [];

        switch (storageType) {
            case StorageType.MEMORY:
                const keys: string[] = Object.keys(this._memoryStorage);

                for (let i = 0; i < keys.length; i++) {
                    const item: StorageItem | null = this.get(keys[i], StorageType.MEMORY);

                    if (item) {
                        items.push(item);
                    }
                }

                break;
            case StorageType.SESSION:
                for (let i = 0; i < sessionStorage.length; i++) {
                    const key: string | null = sessionStorage.key(i);

                    if (key) {
                        const item: StorageItem | null = this.get(key, StorageType.SESSION);

                        if (item) {
                            items.push(item);
                        }
                    }
                }
                break;
            case StorageType.LOCAL:
                for (let i = 0; i < localStorage.length; i++) {
                    const key: string | null = localStorage.key(i);

                    if (key) {
                        const item: StorageItem | null = this.get(key, StorageType.LOCAL);

                        if (item) {
                            items.push(item);
                        }
                    }
                }
                break;
        }

        return items;
    }

    public static remove(key: string, storageType: StorageType = StorageType.MEMORY) {

        switch (storageType) {
            case StorageType.MEMORY:
                delete this._memoryStorage[key];
                break;
            case StorageType.SESSION:
                sessionStorage.removeItem(key);
                break;
            case StorageType.LOCAL:
                localStorage.removeItem(key);
                break;
        }
    }

    public static set(key: string, value: any, expirationSecs: number, storageType: StorageType = StorageType.MEMORY): StorageItem {
        const expirationMS: number = expirationSecs * 1000;

        const record: StorageItem = new StorageItem();
        record.value = value;
        record.expiresAt = new Date().getTime() + expirationMS;

        switch (storageType) {
            case StorageType.MEMORY:
                this._memoryStorage[key] = JSON.stringify(record);
                break;
            case StorageType.SESSION:
                sessionStorage.setItem(key, JSON.stringify(record));
                break;
            case StorageType.LOCAL:
                localStorage.setItem(key, JSON.stringify(record));
                break;
        }

        return record;
    }
}