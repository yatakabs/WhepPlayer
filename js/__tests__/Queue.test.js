import {
    ArgumentError,
    ArgumentOutOfRangeError,
    InvalidOperationError
} from "../Errors.js";

import Queue from "../Queue.js";
import { describe, expect, it, beforeEach, afterEach } from "@jest/globals";

describe("Queue", () => {
    let queue;

    beforeEach(() => {
        queue = new Queue(3);
    });

    afterEach(() => {
        queue = null;
    });


    describe("e2e", () => {
        it("should enqueue items correctly", () => {
            queue.enqueue("item1");
            queue.enqueue("item2");
            queue.enqueue("item3");

            expect(queue.count).toBe(3);
            expect(queue.items).toEqual(["item1", "item2", "item3"]);
        });

        it("should throw an error when dequeuing from an empty queue", () => {
            expect(() => {
                queue.dequeue();
            }).toThrow(InvalidOperationError);
        });

        it("should dequeue items correctly", () => {
            queue.enqueue("item1");
            queue.enqueue("item2");
            queue.enqueue("item3");

            const item1 = queue.dequeue();
            const item2 = queue.dequeue();
            const item3 = queue.dequeue();

            expect(item1).toBe("item1");
            expect(item2).toBe("item2");
            expect(item3).toBe("item3");
            expect(queue.count).toBe(0);
            expect(queue.items).toEqual([]);
        });

        it("should try to dequeue items correctly", () => {
            queue.enqueue("item1");
            queue.enqueue("item2");
            queue.enqueue("item3");

            const ret1 = queue.tryDequeue();
            const ret2 = queue.tryDequeue();
            const ret3 = queue.tryDequeue();
            const ret4 = queue.tryDequeue();

            expect(ret1.success).toBe(true);
            expect(ret1.item).toBe("item1");
            expect(ret2.success).toBe(true);
            expect(ret2.item).toBe("item2");
            expect(ret3.success).toBe(true);
            expect(ret3.item).toBe("item3");
            expect(ret4.success).toBe(false);
            expect(ret4.item).toBeNull();
            expect(queue.count).toBe(0);
            expect(queue.items).toEqual([]);
        });

        it("should return undefined when trying to dequeue from an empty queue", () => {
            const ret = queue.tryDequeue();

            expect(ret.success).toBe(false);
            expect(ret.item).toBeNull();
        });

        it("should peek at the oldest item correctly", () => {
            queue.enqueue("item1");
            queue.enqueue("item2");
            queue.enqueue("item3");

            const firstItem = queue.peek();

            expect(firstItem).toBe("item1");
            expect(queue.count).toBe(3);
            expect(queue.items).toEqual(["item1", "item2", "item3"]);
        });

        it("should try to peek at the oldest item correctly", () => {
            queue.enqueue("item1");
            queue.enqueue("item2");
            queue.enqueue("item3");

            const ret = queue.tryPeek();

            expect(ret.success).toBe(true);
            expect(ret.item).toBe("item1");
            expect(queue.count).toBe(3);
            expect(queue.items).toEqual(["item1", "item2", "item3"]);
        });

        it("should return undefined when trying to peek at the oldest item from an empty queue", () => {
            const ret = queue.tryPeek();

            expect(ret.success).toBe(false);
            expect(ret.item).toBeNull();
        });

        it("should clear the queue correctly", () => {
            queue.enqueue("item1");
            queue.enqueue("item2");
            queue.enqueue("item3");

            queue.clear();

            expect(queue.count).toBe(0);
            expect(queue.items).toEqual([]);
        });
    });

    describe("constructor", () => {
        it("should throw an error when capacity is not a number", () => {
            expect(() => {
                new Queue("not a number");
            }).toThrow(ArgumentError);
        });

        it("should throw an error when capacity is not a positive number", () => {
            expect(() => {
                new Queue(-1);
            }).toThrow(ArgumentOutOfRangeError);
        });

        it("should throw an error when capacity is not an integer", () => {
            expect(() => {
                new Queue(1.5);
            }).toThrow(ArgumentError);
        });

        it("should throw an error when capacity is zero", () => {
            expect(() => {
                new Queue(0);
            }).toThrow(ArgumentOutOfRangeError);
        });

        it("should throw an error when capacity is NaN", () => {
            expect(() => {
                new Queue(NaN);
            }).toThrow(ArgumentOutOfRangeError);
        });

        it("should throw an error when capacity is Infinity", () => {
            expect(() => {
                new Queue(Infinity);
            }).toThrow(ArgumentOutOfRangeError);
        });

        it("should throw an error when capacity is -Infinity", () => {
            expect(() => {
                new Queue(-Infinity);
            }).toThrow(ArgumentOutOfRangeError);
        });

        it("should throw an error when capacity is greater than Number.MAX_SAFE_INTEGER", () => {
            expect(() => {
                new Queue(Number.MAX_SAFE_INTEGER + 1);
            }).toThrow(ArgumentOutOfRangeError);
        });

        it("should create a queue when capacity is a positive integer", () => {
            expect(() => {
                new Queue(1);
            }).not.toThrow();
        });

        it("should throw an error when capacity is a positive integer string", () => {
            expect(() => {
                new Queue("1");
            }).toThrow();
        });
    });

    describe("capacity", () => {
        it("should have the correct capacity", () => {
            expect(queue.capacity).toBe(3);
        });

        it("should be empty initially", () => {
            expect(queue.count).toBe(0);
            expect(queue.items).toEqual([]);
        });

        it("should be empty after clearing", () => {
            queue.clear();
            expect(queue.count).toBe(0);
            expect(queue.items).toEqual([]);
        });

        it("should be empty after dequeuing all items", () => {
            queue.enqueue("item1");
            queue.enqueue("item2");
            queue.enqueue("item3");
            queue.dequeue();
            queue.dequeue();
            queue.dequeue();

            expect(queue.count).toBe(0);
            expect(queue.items).toEqual([]);
        });
    });

    describe("items", () => {
        it("should return the correct items", () => {
            queue.enqueue("item1");
            queue.enqueue("item2");
            queue.enqueue("item3");

            expect(queue.items).toEqual(["item1", "item2", "item3"]);
        });

        it("should return the correct items after dequeuing", () => {
            queue.enqueue("item1");
            queue.enqueue("item2");
            queue.enqueue("item3");
            queue.dequeue();

            expect(queue.items).toEqual(["item2", "item3"]);
        });

        it("should return the correct items after dequeuing all items", () => {
            queue.enqueue("item1");
            queue.enqueue("item2");
            queue.enqueue("item3");
            queue.dequeue();
            queue.dequeue();
            queue.dequeue();

            expect(queue.items).toEqual([]);
        });

        it("should return the correct items after clearing", () => {
            queue.enqueue("item1");
            queue.enqueue("item2");
            queue.enqueue("item3");
            queue.clear();

            expect(queue.items).toEqual([]);
        });

        it("should return the correct items after wrapping around", () => {
            queue.enqueue("item1");
            queue.enqueue("item2");
            queue.enqueue("item3");
            queue.dequeue();
            queue.enqueue("item4");

            expect(queue.items).toEqual(["item2", "item3", "item4"]);
        });

        it("should return the correct items after wrapping around and dequeuing", () => {
            queue.enqueue("item1");
            queue.enqueue("item2");
            queue.enqueue("item3");
            queue.dequeue();
            queue.enqueue("item4");
            queue.dequeue();

            expect(queue.items).toEqual(["item3", "item4"]);
        });

        it("should return the correct items after wrapping around and dequeuing all items", () => {
            queue.enqueue("item1");
            queue.enqueue("item2");
            queue.enqueue("item3");
            queue.dequeue();
            queue.enqueue("item4");
            queue.dequeue();
            queue.dequeue();

            expect(queue.items).toEqual(["item4"]);
        });

        it("should return the correct items after wrapping around and clearing", () => {
            queue.enqueue("item1");
            queue.enqueue("item2");
            queue.enqueue("item3");
            queue.dequeue();
            queue.enqueue("item4");
            queue.clear();

            expect(queue.items).toEqual([]);
        });

        it("should return the correct items after wrapping around multiple times", () => {
            queue.enqueue("item1");
            queue.enqueue("item2");
            queue.enqueue("item3");
            queue.dequeue();
            queue.enqueue("item4");
            queue.dequeue();
            queue.enqueue("item5");
            queue.dequeue();
            queue.enqueue("item6");

            expect(queue.items).toEqual(["item4", "item5", "item6"]);
        });

        it("should return the correct items after wrapping around multiple times and dequeuing", () => {
            queue.enqueue("item1");
            queue.enqueue("item2");
            queue.enqueue("item3");
            queue.dequeue();
            queue.enqueue("item4");
            queue.dequeue();
            queue.enqueue("item5");
            queue.dequeue();
            queue.enqueue("item6");
            queue.dequeue();
            queue.dequeue();

            expect(queue.items).toEqual(["item6"]);
        });

        it("should return the correct items after wrapping around multiple times and clearing", () => {
            queue.enqueue("item1");
            queue.enqueue("item2");
            queue.enqueue("item3");
            queue.dequeue();
            queue.enqueue("item4");
            queue.dequeue();
            queue.enqueue("item5");
            queue.dequeue();
            queue.enqueue("item6");
            queue.clear();

            expect(queue.items).toEqual([]);
        });

        it("should return the correct items after wrapping around multiple times and dequeuing all items", () => {
            queue.enqueue("item1");
            queue.enqueue("item2");
            queue.enqueue("item3");
            queue.dequeue();
            queue.enqueue("item4");
            queue.dequeue();
            queue.enqueue("item5");
            queue.dequeue();
            queue.enqueue("item6");
            queue.dequeue();
            queue.dequeue();
            queue.dequeue();

            expect(queue.items).toEqual([]);
        });

        it("should return the correct items after wrapping around multiple times and dequeuing all items and enqueueuing new items", () => {
            queue.enqueue("item1");
            queue.enqueue("item2");
            queue.enqueue("item3");
            queue.dequeue();
            queue.enqueue("item4");
            queue.dequeue();
            queue.enqueue("item5");
            queue.dequeue();
            queue.enqueue("item6");
            queue.dequeue();
            queue.dequeue();
            queue.dequeue();
            queue.enqueue("item7");
            queue.enqueue("item8");
            queue.enqueue("item9");

            expect(queue.items).toEqual(["item7", "item8", "item9"]);
        });
    });

    describe("count", () => {
        it("should return the correct count", () => {
            queue.enqueue("item1");
            queue.enqueue("item2");
            queue.enqueue("item3");

            expect(queue.count).toBe(3);
        });

        it("should return the correct count not exceeding the capacity", () => {
            queue.enqueue("item1");
            queue.enqueue("item2");
            queue.enqueue("item3");
            queue.enqueue("item4");

            expect(queue.count).toBe(3);
        });

        it("should return the correct count after dequeuing", () => {
            queue.enqueue("item1");
            queue.enqueue("item2");
            queue.enqueue("item3");
            queue.dequeue();

            expect(queue.count).toBe(2);
        });

        it("should return the correct count after dequeuing all items", () => {
            queue.enqueue("item1");
            queue.enqueue("item2");
            queue.enqueue("item3");
            queue.dequeue();
            queue.dequeue();
            queue.dequeue();

            expect(queue.count).toBe(0);
        });

        it("should return the correct count after clearing", () => {
            queue.enqueue("item1");
            queue.enqueue("item2");
            queue.enqueue("item3");
            queue.clear();

            expect(queue.count).toBe(0);
        });

        it("should return the correct count after wrapping around", () => {
            queue.enqueue("item1");
            queue.enqueue("item2");
            queue.enqueue("item3");
            queue.dequeue();
            queue.enqueue("item4");

            expect(queue.count).toBe(3);
        });

        it("should return the correct count after wrapping around and dequeuing", () => {
            queue.enqueue("item1");
            queue.enqueue("item2");
            queue.enqueue("item3");
            queue.dequeue();
            queue.enqueue("item4");
            queue.dequeue();

            expect(queue.count).toBe(2);
        });

        it("should return the correct count after wrapping around and dequeuing all items", () => {
            queue.enqueue("item1");
            queue.enqueue("item2");
            queue.enqueue("item3");
            queue.dequeue();
            queue.enqueue("item4");
            queue.dequeue();
            queue.dequeue();

            expect(queue.count).toBe(1);
        });

        it("should return the correct count after wrapping around and clearing", () => {
            queue.enqueue("item1");
            queue.enqueue("item2");
            queue.enqueue("item3");
            queue.dequeue();
            queue.enqueue("item4");
            queue.clear();

            expect(queue.count).toBe(0);
        });

        it("should return the correct count after wrapping around multiple times", () => {
            queue.enqueue("item1");
            queue.enqueue("item2");
            queue.enqueue("item3");
            queue.dequeue();
            queue.enqueue("item4");
            queue.dequeue();
            queue.enqueue("item5");
            queue.dequeue();
            queue.enqueue("item6");

            expect(queue.count).toBe(3);
        });

        it("should return the correct count after wrapping around multiple times and dequeuing", () => {
            queue.enqueue("item1");
            queue.enqueue("item2");
            queue.enqueue("item3");
            queue.dequeue();
            queue.enqueue("item4");
            queue.dequeue();
            queue.enqueue("item5");
            queue.dequeue();
            queue.enqueue("item6");
            queue.dequeue();
            queue.dequeue();

            expect(queue.count).toBe(1);
        });
    });

    describe("enqueue", () => {
        it("should return the added item", () => {
            const item = queue.enqueue("item1");

            expect(item).toBe("item1");
        });

        it("should enqueue items correctly", () => {
            queue.enqueue("item1");
            queue.enqueue("item2");
            queue.enqueue("item3");

            expect(queue.count).toBe(3);
            expect(queue.items).toEqual(["item1", "item2", "item3"]);
        });

        it("should queue a new item and automatically dequeue the first item when queue is full", () => {
            queue.enqueue("item1");
            queue.enqueue("item2");
            queue.enqueue("item3");
            queue.enqueue("item4");

            expect(queue.count).toBe(3);
            expect(queue.items).toEqual(["item2", "item3", "item4"]);
        });

        it.each([
            ["item1"],
            [undefined],
            [null],
            [{}],
            [[]],
        ])("should not throw when enqueuing %p", (item) => {
            expect(() => {
                queue.enqueue(item);
            }).not.toThrow();
        });
    });

    describe("peek", () => {
        it("should return the first item", () => {
            queue.enqueue("item1");
            queue.enqueue("item2");
            queue.enqueue("item3");

            const firstItem = queue.peek();

            expect(firstItem).toBe("item1");
        });

        it("should throw an error when peeking at the first item of an empty queue", () => {
            expect(() => {
                queue.peek();
            }).toThrow(InvalidOperationError);
        });

        it("should return the first item after dequeuing", () => {
            queue.enqueue("item1");
            queue.enqueue("item2");
            queue.enqueue("item3");
            queue.dequeue();

            const firstItem = queue.peek();

            expect(firstItem).toBe("item2");
        });

        it("should throw an error after dequeuing all items", () => {
            queue.enqueue("item1");
            queue.enqueue("item2");
            queue.enqueue("item3");
            queue.dequeue();
            queue.dequeue();
            queue.dequeue();

            expect(() => {
                queue.peek();
            }).toThrow(InvalidOperationError);
        });

        it("should throw an error when after clearing", () => {
            queue.enqueue("item1");
            queue.enqueue("item2");
            queue.enqueue("item3");
            queue.clear();

            expect(() => {
                queue.peek();
            }).toThrow(InvalidOperationError);
        });

        it("should return the first item after wrapping around", () => {
            queue.enqueue("item1");
            queue.enqueue("item2");
            queue.enqueue("item3");
            queue.dequeue();
            queue.enqueue("item4");

            const firstItem = queue.peek();

            expect(firstItem).toBe("item2");
        });

        it("should return the first item after wrapping around and dequeuing", () => {
            queue.enqueue("item1");
            queue.enqueue("item2");
            queue.enqueue("item3");
            queue.dequeue();
            queue.enqueue("item4");
            queue.dequeue();

            const firstItem = queue.peek();

            expect(firstItem).toBe("item3");
        });
    });

    describe("tryPeek", () => {
        it("should return the first item", () => {
            queue.enqueue("item1");
            queue.enqueue("item2");
            queue.enqueue("item3");

            const ret = queue.tryPeek();

            expect(ret.success).toBe(true);
            expect(ret.item).toBe("item1");
        });

        it("should return false when trying to peek at the first item of an empty queue", () => {
            const ret = queue.tryPeek();

            expect(ret.success).toBe(false);
            expect(ret.item).toBeNull();
        });

        it("should return the first item after dequeuing", () => {
            queue.enqueue("item1");
            queue.enqueue("item2");
            queue.enqueue("item3");
            queue.dequeue();

            const ret = queue.tryPeek();

            expect(ret.success).toBe(true);
            expect(ret.item).toBe("item2");
        });

        it("should return false after dequeuing all items", () => {
            queue.enqueue("item1");
            queue.enqueue("item2");
            queue.enqueue("item3");
            queue.dequeue();
            queue.dequeue();
            queue.dequeue();

            const ret = queue.tryPeek();

            expect(ret.success).toBe(false);
            expect(ret.item).toBeNull();
        });

        it("should return false when after clearing", () => {
            queue.enqueue("item1");
            queue.enqueue("item2");
            queue.enqueue("item3");
            queue.clear();

            const ret = queue.tryPeek();

            expect(ret.success).toBe(false);
            expect(ret.item).toBeNull();
        });

        it("should return the first item after wrapping around", () => {
            queue.enqueue("item1");
            queue.enqueue("item2");
            queue.enqueue("item3");
            queue.dequeue();
            queue.enqueue("item4");

            const ret = queue.tryPeek();

            expect(ret.success).toBe(true);
            expect(ret.item).toBe("item2");
        });

        it("should return the first item after wrapping around and dequeuing", () => {
            queue.enqueue("item1");
            queue.enqueue("item2");
            queue.enqueue("item3");
            queue.dequeue();
            queue.enqueue("item4");
            queue.dequeue();

            const ret = queue.tryPeek();

            expect(ret.success).toBe(true);
            expect(ret.item).toBe("item3");
        });

    });

    describe("dequeue", () => {
        it("should return the first item", () => {
            queue.enqueue("item1");
            queue.enqueue("item2");
            queue.enqueue("item3");

            const firstItem = queue.dequeue();

            expect(firstItem).toBe("item1");
        });

        it("should throw an error when dequeuing from an empty queue", () => {
            expect(() => {
                queue.dequeue();
            }).toThrow(InvalidOperationError);
        });

        it("should return the first item after dequeuing", () => {
            queue.enqueue("item1");
            queue.enqueue("item2");
            queue.enqueue("item3");
            queue.dequeue();

            const firstItem = queue.dequeue();

            expect(firstItem).toBe("item2");
        });

        it("should throw an error after dequeuing all items", () => {
            queue.enqueue("item1");
            queue.enqueue("item2");
            queue.enqueue("item3");
            queue.dequeue();
            queue.dequeue();
            queue.dequeue();

            expect(() => {
                queue.dequeue();
            }).toThrow(InvalidOperationError);
        });

        it("should throw an error when after clearing", () => {
            queue.enqueue("item1");
            queue.enqueue("item2");
            queue.enqueue("item3");
            queue.clear();

            expect(() => {
                queue.dequeue();
            }).toThrow(InvalidOperationError);
        });

        it("should return the first item after wrapping around", () => {
            queue.enqueue("item1");
            queue.enqueue("item2");
            queue.enqueue("item3");
            queue.dequeue();
            queue.enqueue("item4");

            const firstItem = queue.dequeue();

            expect(firstItem).toBe("item2");
        });

        it("should return the first item after wrapping around and dequeuing", () => {
            queue.enqueue("item1");
            queue.enqueue("item2");
            queue.enqueue("item3");
            queue.dequeue();
            queue.enqueue("item4");
            queue.dequeue();

            const firstItem = queue.dequeue();

            expect(firstItem).toBe("item3");
        });
    });

    describe("tryDequeue", () => {
        it("should return the first item", () => {
            queue.enqueue("item1");
            queue.enqueue("item2");
            queue.enqueue("item3");

            const ret = queue.tryDequeue();

            expect(ret.success).toBe(true);
            expect(ret.item).toBe("item1");
        });

        it("should return false when trying to dequeue from an empty queue", () => {
            const ret = queue.tryDequeue();

            expect(ret.success).toBe(false);
            expect(ret.item).toBeNull();
        });

        it("should return the first item after dequeuing", () => {
            queue.enqueue("item1");
            queue.enqueue("item2");
            queue.enqueue("item3");
            queue.dequeue();

            const ret = queue.tryDequeue();

            expect(ret.success).toBe(true);
            expect(ret.item).toBe("item2");
        });

        it("should return false after dequeuing all items", () => {
            queue.enqueue("item1");
            queue.enqueue("item2");
            queue.enqueue("item3");
            queue.dequeue();
            queue.dequeue();
            queue.dequeue();

            const ret = queue.tryDequeue();

            expect(ret.success).toBe(false);
            expect(ret.item).toBeNull();
        });

        it("should return false when after clearing", () => {
            queue.enqueue("item1");
            queue.enqueue("item2");
            queue.enqueue("item3");
            queue.clear();

            const ret = queue.tryDequeue();

            expect(ret.success).toBe(false);
            expect(ret.item).toBeNull();
        });

        it("should return the first item after wrapping around", () => {
            queue.enqueue("item1");
            queue.enqueue("item2");
            queue.enqueue("item3");
            queue.dequeue();
            queue.enqueue("item4");

            const ret = queue.tryDequeue();

            expect(ret.success).toBe(true);
            expect(ret.item).toBe("item2");
        });

        it("should return the first item after wrapping around and dequeuing", () => {
            queue.enqueue("item1");
            queue.enqueue("item2");
            queue.enqueue("item3");
            queue.dequeue();
            queue.enqueue("item4");
            queue.dequeue();

            const ret = queue.tryDequeue();

            expect(ret.success).toBe(true);
            expect(ret.item).toBe("item3");
        });
    });

    describe("clear", () => {
        it("should clear the queue correctly", () => {
            queue.enqueue("item1");
            queue.enqueue("item2");
            queue.enqueue("item3");

            queue.clear();

            expect(queue.count).toBe(0);
            expect(queue.items).toEqual([]);
        });

        it("should clear the queue correctly after dequeuing", () => {
            queue.enqueue("item1");
            queue.enqueue("item2");
            queue.enqueue("item3");
            queue.dequeue();

            queue.clear();

            expect(queue.count).toBe(0);
            expect(queue.items).toEqual([]);
        });

        it("should clear the queue correctly after dequeuing all items", () => {
            queue.enqueue("item1");
            queue.enqueue("item2");
            queue.enqueue("item3");
            queue.dequeue();
            queue.dequeue();
            queue.dequeue();

            queue.clear();

            expect(queue.count).toBe(0);
            expect(queue.items).toEqual([]);
        });

        it("should clear the queue correctly after wrapping around", () => {
            queue.enqueue("item1");
            queue.enqueue("item2");
            queue.enqueue("item3");
            queue.dequeue();
            queue.enqueue("item4");

            queue.clear();

            expect(queue.count).toBe(0);
            expect(queue.items).toEqual([]);
        });

        it("should clear the queue correctly after wrapping around and dequeuing", () => {
            queue.enqueue("item1");
            queue.enqueue("item2");
            queue.enqueue("item3");
            queue.dequeue();
            queue.enqueue("item4");
            queue.dequeue();

            queue.clear();

            expect(queue.count).toBe(0);
            expect(queue.items).toEqual([]);
        });

        it("should clear the queue correctly after wrapping around and dequeuing all items", () => {
            queue.enqueue("item1");
            queue.enqueue("item2");
            queue.enqueue("item3");
            queue.dequeue();
            queue.enqueue("item4");
            queue.dequeue();
            queue.dequeue();

            queue.clear();

            expect(queue.count).toBe(0);
            expect(queue.items).toEqual([]);
        });
    });
});
