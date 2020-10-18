import { Constant } from "../infastructural/constant";

export class StorageService {

    set(key: string, value: any): void {
        localStorage.setItem(key, JSON.stringify(value));
    }

    get(key: string): any {
        
        if (key === Constant.bookingData.isData) {
            if (localStorage.getItem(key)) {
                return JSON.parse(localStorage.getItem(Constant.bookingData.data))
            } else {
                return false
            }
        }

        return JSON.parse(localStorage.getItem(key) || "")
    }

    remove(key: string): void {
        localStorage.removeItem(key);
    }

    removeAll(): void {
        localStorage.clear();
    }
}