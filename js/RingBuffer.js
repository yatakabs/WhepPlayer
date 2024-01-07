
import { InvalidOperationError } from "./Errors.js";

/**
 * Represents a ring buffer data structure.
 */
class RingBuffer {

    /**
     * Creates a new RingBuffer with the specified capacity.
     * @param {number} capacity - The maximum number of items the RingBuffer can hold.
     */
    constructor(capacity) {
        this._capacity = capacity;

        this._items = [];
        this._writerIndex = 0;
        this._readerIndex = 0;
        this._count = 0;
    }

    /**
     * Gets the capacity of the RingBuffer.
     *
     * @returns {number} The capacity of the RingBuffer.
     */
    get capacity() {
        return this._capacity;
    }

    /**
     * Gets the count of elements in the RingBuffer.
     * @returns {number} The count of elements.
     */
    get count() {
        return this._count;
    }

    /**
     * Get the items in the RingBuffer, as a copy of items (snapshot).
     * Items are ordered from first to last.
     *
     * @returns {Array} The items in the RingBuffer.
     */
    get items() {
        const items = [];
        for (let i = 0; i < this._count; i++) {
            const index = (this._readerIndex + i) % this._capacity;
            items.push(this._items[index]);
        }

        return items;
    }

    /**
     * Adds an item to the ring buffer.
     * @param {*} item - The item to be added.
     * @returns {boolean} - True if the buffer was full and an item was overwritten, false otherwise.
     */
    push(item) {
        const isFull = this._count === this._capacity;
        this._items[this._writerIndex] = item;

        this._writerIndex = (this._writerIndex + 1) % this._capacity;

        if (!isFull) {
            this._count++;
        }
        else {
            // Increment the reader index to make room for the first itme remianing in the buffer.
            this._readerIndex = (this._readerIndex + 1) % this._capacity;
        }

        // Returns if the buffer was full and an item was overwritten.
        return isFull;
    }

    /**
     * Removes and returns an item from the buffer.
     * @returns {any} The item removed from the buffer.
     * @throws {InvalidOperationError} If the buffer is empty.
     */
    pop() {
        const ret = this.tryPop();
        if (ret.success) {
            return ret.item;
        }

        throw new InvalidOperationError("Buffer is empty.");
    }

    /**
     * Retrieves the last item without removing it.
     *
     * @returns {any} The next item in the buffer.
     * @throws {InvalidOperationError} If the buffer is empty.
     */
    peekLast() {
        const ret = this.tryPeekLast();
        if (ret.success) {
            return ret.item;
        }

        throw new InvalidOperationError("Buffer is empty.");
    }

    /**
     * Tries to pop the last item from the collection.
     *
     * @returns {Object} An object with the properties 'success' and 'item'.
     * - success: A boolean indicating whether the pop operation was successful.
     * - item: The popped item, or null if the pop operation was not successful.
     */
    tryPop() {
        if (this._count > 0) {
            const item = this._items[this._readerIndex];
            this._readerIndex = (this._readerIndex + 1) % this._capacity;
            this._count--;

            return {
                success: true,
                item: item,
            };
        }
        else {
            return {
                success: false,
                item: null,
            };
        }
    }

    /**
     * Tries to peek at the last item without removing it.
     *
     * @returns {Object} An object with the properties 'success' and 'item'.
     * - success: A boolean indicating whether the peek operation was successful.
     * - item: The item at the current reader index, or null if the peek operation was not successful.
     */
    tryPeekLast() {
        if (this._count > 0) {
            const lastItemIndex = (this._writerIndex + this._capacity - 1) % this._capacity;

            return {
                success: true,
                item: this._items[lastItemIndex]
            };
        }
        else {
            return {
                success: false,
                item: null,
            };
        }
    }

    /**
     * Retrieves the first item without removing it.
     *
     * @returns {any} The first item in the buffer.
     * @throws {InvalidOperationError} If the buffer is empty.
     */
    peekFirst() {
        const ret = this.tryPeekFirst();

        if (ret.success) {
            return ret.item;
        }

        throw new InvalidOperationError("Buffer is empty.");
    }

    /**
     * Tries to peek at the first item in the collection.
     *
     * @returns {Object} An object with the success status and the first item.
     * @property {boolean} success - Indicates if the peek operation was successful.
     * @property {*} item - The first item in the collection. Returns null if the collection is empty.
     */
    tryPeekFirst() {
        if (this._count > 0) {
            const firstItemIndex = this._readerIndex;

            return {
                success: true,
                item: this._items[firstItemIndex]
            };
        }
        else {
            return {
                success: false,
                item: null,
            };
        }
    }

    /**
     * Removes and returns the first item.
     *
     * @returns {any} The first item in the buffer.
     * @throws {InvalidOperationError} If the buffer is empty.
     */
    shift() {
        const ret = this.tryShift();
        if (ret.success) {
            return ret.item;
        }

        throw new InvalidOperationError("Buffer is empty.");
    }

    /**
     * Tries to shift (removes the first item) an item from the collection.
     *
     * @returns {Object} An object with success and item properties.
     * - success: A boolean indicating if the shift was successful.
     * - item: The shifted item, or null if the shift was unsuccessful.
     */
    tryShift() {
        if (this._count > 0) {
            const firstItemIndex = this._readerIndex;
            const item = this._items[firstItemIndex];
            this._count--;

            // Increment the reader index to make room for the first itme remianing in the buffer.
            this._readerIndex = (this._readerIndex + 1) % this._capacity;

            return {
                success: true,
                item: item,
            };
        }
        else {
            return {
                success: false,
                item: null,
            };
        }
    }

    /**
     * Removes and returns the last item.
     *
     * @returns {any} The last item in the buffer.
     * @throws {InvalidOperationError} If the buffer is empty.
     */
    clear() {
        this._writerIndex = 0;
        this._readerIndex = 0;
        this._count = 0;
    }
}

export default RingBuffer;
