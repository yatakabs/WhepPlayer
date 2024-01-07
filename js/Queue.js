import { InvalidOperationError } from "./Errors.js";
import RingBuffer from "./RingBuffer.js";
import Guard from "./Guard.js";


/**
 * Represents a queue data structure.
 * @class
 */
class Queue {
    /**
     * Creates a new Queue object with the specified capacity.
     *
     * @constrauctor
     * @param {number} capacity - The maximum number of elements that the queue can hold.
     * @throws {ArgumentError} If capacity is not a number.
     * @throws {ArgumentError} If capacity is not an integer.
     * @throws {ArgumentOutOfRangeError} If capacity is less than 1.
     */
    constructor(capacity) {
        Guard.Argument.isFinitePositiveInteger("capacity", capacity, `Capacity must be a finite positive integer. Given: ${capacity}`);
        Guard.Argument.isSafeInteger("capacity", capacity, `Capacity must be a safe integer. Given: ${capacity}`);

        this._capacity = capacity;
        this._buffer = new RingBuffer(capacity);
    }

    /**
     * Gets the capacity of the queue.
     * @returns {number} The capacity of the queue.
     */
    get capacity() {
        return this._capacity;
    }

    /**
     * Gets the items in the queue.
     * @returns {Array} The items in the queue.
     */
    get items() {
        return this._buffer.items.slice();
    }

    /**
     * Gets the count of items in the queue.
     * @returns {number} The count of items in the queue.
     */
    get count() {
        return this._buffer.count;
    }

    /**
     * Adds an item to the queue.
     * If the queue is full, the first item is removed and overwritten.
     * This method always succeeds. Use tryEnqueue to check if the queue is full.
     *
     * @param {*} item - The item to be added to the queue.
     * @returns {*} - The added item.
     */
    enqueue(item) {
        this._buffer.push(item);
        return item;
    }

    /**
     * Retrieves the first item from the queue without removing it.
     * @returns {*} The first item in the queue.
     */
    peek() {
        if (this.count === 0) {
            throw new InvalidOperationError("Queue is empty.");
        }

        return this._buffer.peekFirst();
    }

    /**
     * Tries to peek at the first item in the queue without removing it.
     *
     * @returns {Object} An object with the success status and the first item.
     * @property {boolean} success - Indicates if the peek operation was successful.
     * @property {*} item - The first item in the queue. Returns null if the queue is empty.
     */
    tryPeek() {
        return this._buffer.tryPeekFirst();
    }

    /**
     * Removes and returns the first item from the queue.
     *
     * @returns {*} The first item in the queue.
     * @throws {InvalidOperationError} If the queue is empty.
     */
    dequeue() {
        if (this.count === 0) {
            throw new InvalidOperationError("Queue is empty.");
        }

        return this._buffer.shift();
    }

    /**
     * Tries to dequeue an item from the queue.
     * @returns {any} The dequeued item.
     */
    tryDequeue() {
        return this._buffer.tryShift();
    }

    /**
     * Clears the queue by removing all items.
     */
    clear() {
        this._buffer.clear();
    }
}

export default Queue;
