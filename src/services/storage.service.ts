

export class StorageService {

    saveToStorage(key: string, val: object) {
        localStorage.setItem(key, JSON.stringify(val))
    }
    loadFromStorage(key: string) {
        const val: string | null = localStorage.getItem(key)
        if (val)
            return JSON.parse(val)
    }
    removeFromStorage(key: string) {
        localStorage.removeItem(key);
    }
}



