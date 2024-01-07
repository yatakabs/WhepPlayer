import RingBuffer from "../RingBuffer";
import { describe, expect, test, beforeEach } from "@jest/globals";

describe("RingBuffer", () => {
    let ringBuffer;

    beforeEach(() => {
        ringBuffer = new RingBuffer(3);
    });

    test("should have the correct capacity", () => {
        expect(ringBuffer.capacity).toBe(3);
    });

    test("should have count 0 when initialized", () => {
        expect(ringBuffer.count).toBe(0);
    });

    test("should push items to the buffer", () => {
        ringBuffer.push(1);
        ringBuffer.push(2);
        ringBuffer.push(3);

        expect(ringBuffer.count).toBe(3);
        expect(ringBuffer.items).toEqual([1, 2, 3]);
    });

    test("should push items to the buffer", () => {
        ringBuffer.push(1);
        ringBuffer.push(2);
        ringBuffer.push(3);

        expect(ringBuffer.count).toBe(3);
        expect(ringBuffer.items).toEqual([1, 2, 3]);
    });

    test("should return true when buffer was full before and overwritten", () => {
        ringBuffer.push(1);
        ringBuffer.push(2);
        ringBuffer.push(3);
        const isOverwritten = ringBuffer.push(4);

        expect(isOverwritten).toBe(true);
    });

    test("should return false when buffer was not full before and no overwritten", () => {
        ringBuffer.push(1);
        ringBuffer.push(2);
        const isOverwritten = ringBuffer.push(3);

        expect(isOverwritten).toBe(false);
    });

    test("should pop items from the buffer", () => {
        ringBuffer.push(1);
        ringBuffer.push(2);
        ringBuffer.push(3);

        const item = ringBuffer.pop();

        expect(item).toBe(1);
        expect(ringBuffer.count).toBe(2);
        expect(ringBuffer.items).toEqual([2, 3]);
    });

    test("should throw an error when popping from an empty buffer", () => {
        expect(() => {
            ringBuffer.pop();
        }).toThrow("Buffer is empty.");
    });

    test("should peek at the last item without removing it", () => {
        ringBuffer.push(1);
        ringBuffer.push(2);
        ringBuffer.push(3);

        const item = ringBuffer.peekLast();

        expect(item).toBe(3);
        expect(ringBuffer.count).toBe(3);
        expect(ringBuffer.items).toEqual([1, 2, 3]);
    });

    test("should throw an error when peeking at the last item of an empty buffer", () => {
        expect(() => {
            ringBuffer.peekLast();
        }).toThrow("Buffer is empty.");
    });

    test("should try to pop the last item from the buffer", () => {
        ringBuffer.push(1);
        ringBuffer.push(2);
        ringBuffer.push(3);

        const ret = ringBuffer.tryPop();

        expect(ret.success).toBe(true);
        expect(ret.item).toBe(1);
        expect(ringBuffer.count).toBe(2);
        expect(ringBuffer.items).toEqual([2, 3]);
    });

    test("should return false when trying to pop from an empty buffer", () => {
        const ret = ringBuffer.tryPop();

        expect(ret.success).toBe(false);
        expect(ret.item).toBeNull();
    });

    test("should try to peek at the last item without removing it", () => {
        ringBuffer.push(1);
        ringBuffer.push(2);
        ringBuffer.push(3);

        const ret = ringBuffer.tryPeekLast();

        expect(ret.success).toBe(true);
        expect(ret.item).toBe(3);
        expect(ringBuffer.count).toBe(3);
        expect(ringBuffer.items).toEqual([1, 2, 3]);
    });

    test("should return false when trying to peek at the last item of an empty buffer", () => {
        const ret = ringBuffer.tryPeekLast();

        expect(ret.success).toBe(false);
        expect(ret.item).toBeNull();
    });

    test("should peek at the first item without removing it", () => {
        ringBuffer.push(1);
        ringBuffer.push(2);
        ringBuffer.push(3);

        const item = ringBuffer.peekFirst();

        expect(item).toBe(1);
        expect(ringBuffer.count).toBe(3);
        expect(ringBuffer.items).toEqual([1, 2, 3]);
    });

    test("should throw an error when peeking at the first item of an empty buffer", () => {
        expect(() => {
            ringBuffer.peekFirst();
        }).toThrow("Buffer is empty.");
    });

    test("should try to peek at the first item in the buffer", () => {
        ringBuffer.push(1);
        ringBuffer.push(2);
        ringBuffer.push(3);

        const ret = ringBuffer.tryPeekFirst();

        expect(ret.success).toBe(true);
        expect(ret.item).toBe(1);
        expect(ringBuffer.count).toBe(3);
        expect(ringBuffer.items).toEqual([1, 2, 3]);
    });

    test("should return false when trying to peek at the first item of an empty buffer", () => {
        const ret = ringBuffer.tryPeekFirst();



        expect(ret.success).toBe(false);
        expect(ret.item).toBeNull();
    });

    test("should shift (remove the first item) from the buffer", () => {
        ringBuffer.push(1);
        ringBuffer.push(2);
        ringBuffer.push(3);

        const item = ringBuffer.shift();

        expect(item).toBe(1);
        expect(ringBuffer.count).toBe(2);
        expect(ringBuffer.items).toEqual([2, 3]);
    });

    test("should throw an error when shifting from an empty buffer", () => {
        expect(() => {
            ringBuffer.shift();
        }).toThrow("Buffer is empty.");
    });

    test("should try to shift (remove the first item) from the buffer", () => {
        ringBuffer.push(1);
        ringBuffer.push(2);
        ringBuffer.push(3);

        const ret = ringBuffer.tryShift();

        expect(ret.success).toBe(true);
        expect(ret.item).toBe(1);
        expect(ringBuffer.count).toBe(2);
        expect(ringBuffer.items).toEqual([2, 3]);
    });

    test("should return false when trying to shift from an empty buffer", () => {
        const ret = ringBuffer.tryShift();

        expect(ret.success).toBe(false);
        expect(ret.item).toBeNull();
    });

    test("should return the correct count", () => {
        const ringBuffer = new RingBuffer(3);
        expect(ringBuffer.count).toBe(0);

        ringBuffer.push(1);
        expect(ringBuffer.count).toBe(1);

        ringBuffer.push(2);
        expect(ringBuffer.count).toBe(2);

        ringBuffer.pop();
        expect(ringBuffer.count).toBe(1);

        ringBuffer.shift();
        expect(ringBuffer.count).toBe(0);
    });
});
