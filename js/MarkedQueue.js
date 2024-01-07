
export class MarkedQueue {
    constructor(maxCount) {
        this._maxCount = maxCount;
        this._newItems = [];
        this._markedItem = [];
    }

    get maxCount() {
        return this._maxCount;
    }

    get items() {
        return this._markedItem;
    }

    get newItems() {
        return this._newItems;
    }

}
