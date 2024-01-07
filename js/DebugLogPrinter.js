import Guard from "./Guard.js";
import Queue from "./Queue.js";
import Value from "./Value.js";

export const DebugLogFlowDirections = {
    TopToBottom: "top-to-bottom",
    BottomToTop: "bottom-to-top",
};

export const DebugLogLevel = {
    Debug: "debug",
    Trace: "trace",
    Info: "info",
    Warning: "warning",
    Error: "error",

    toShort(level) {
        switch (level) {
            case DebugLogLevel.Debug:
                return "DEBG";
            case DebugLogLevel.Trace:
                return "TRCE";
            case DebugLogLevel.Info:
                return "INFO";
            case DebugLogLevel.Warning:
                return "WARN";
            case DebugLogLevel.Error:
                return "EROR";
            default:
                return "UNKN";
        }
    }
};

export class DebugLogItem {
    constructor(
        timestamp,
        level,
        message,
        id = null) {
        this._timestamp = timestamp;
        this._level = level;
        this._message = message;

        this._id = id || crypto.randomUUID();
    }

    get id() {
        return this._id;
    }

    get timestamp() {
        return this._timestamp;
    }

    get level() {
        return this._level;
    }

    get message() {
        return this._message;
    }
}

export class DebugLogPrinter {

    /**
     * Creates a new instance of the class.
     *
     * @param {HTMLOListElement} debugLogListElement
     */
    constructor(
        document,
        debugLogListElement,
        flowDirection = DebugLogFlowDirections.TopToBottom,
        maxLines = 35,
        showTimestamp = true) {
        Guard.Argument.isNotNullOrUndefined("document", document, "Document must be provided.");
        Guard.Argument.isNotNullOrUndefined("debugLogListElement", debugLogListElement, "List element must be provided.");
        // Guard.Argument.isOfType('debugLogListElement', debugLogListElement, 'HTMLUListElement', 'List element must be a <ul> element.');
        Guard.Argument.isAnyOf("flowDirection", flowDirection, Object.values(DebugLogFlowDirections), "Specified direction is not valid.");



        this._document = document;
        this._debugLogListElement = debugLogListElement;
        this._flowDirection = flowDirection;
        this._maxLines = maxLines;
        this._showTimestamp = showTimestamp;

        this._queue = new Queue(maxLines);
    }

    get flowDirection() {
        return this._flowDirection;
    }

    get maxLines() {
        return this._maxLines;
    }

    get showTimestamp() {
        return this._showTimestamp;
    }

    get logItems() {
        return this._logItems;
    }

    get logListElement() {
        return this._logListElement;
    }

    appendLog(logItem) {
        Guard.Argument.isNotNullOrUndefined("logItem", logItem, "Log item must be provided.");
        Guard.Argument.isOfType("logItem", logItem, DebugLogItem, "Log item must be of type DebugLogItem.");

        this._queue.enqueue(Value.isNullOrUndefined(logItem.id)
            ? new DebugLogItem(
                logItem.timestamp,
                logItem.level,
                logItem.message,
                crypto.randomUUID())
            : logItem);

        this.print();
    }

    print(document) {
        const items = this._queue.items;
        // items.sort((a, b) => a.timestamp - b.timestamp);

        // Take only the last maxLines items
        const itemsToPrint = items
            .slice(-this._maxLines)
            .map(x => {
                return {
                    item: x,
                    listElementId: `debug-log-item-${x.id}`
                };
            });

        // Removes all items from the list view that are not in the itemsToPrint list.
        // Filter items which are not in the list view.
        const listItems = Array.from(this._debugLogListElement.querySelectorAll("li"));
        const listItemsToRemove = listItems
            .filter(li => !itemsToPrint.find(p => p.listElementId === li.id));

        const itemsToAdd = itemsToPrint
            .filter(p => !listItems.find(li => li.id === p.listElementId));


        // Removes items from the list view
        listItemsToRemove
            .forEach(li => li.remove());


        // Adds items to the list view
        itemsToAdd
            .forEach(x => {
                const item = x.item;
                const listElementId = x.listElementId;

                const lineElement = this._document.createElement("li");
                lineElement.id = listElementId;
                lineElement.classList.add("debug-log-item");

                const timestampElement = this._document.createElement("span");
                timestampElement.classList.add("timestamp");
                timestampElement.classList.add("debug-log-element");
                timestampElement.textContent = item.timestamp.toLocaleString(
                    undefined,
                    {
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                        fractionalSecondDigits: 3,
                    });

                const levelElement = this._document.createElement("span");
                levelElement.classList.add("level");
                levelElement.classList.add(item.level);
                levelElement.classList.add("debug-log-element");
                levelElement.textContent = DebugLogLevel.toShort(item.level);

                const messageElement = this._document.createElement("span");
                messageElement.classList.add("message");
                messageElement.classList.add("debug-log-element");
                messageElement.textContent = item.message;

                lineElement.appendChild(timestampElement);
                lineElement.appendChild(levelElement);
                lineElement.appendChild(messageElement);

                // Adds the item respecting the flow direction
                if (this._flowDirection === DebugLogFlowDirections.TopToBottom) {
                    this._debugLogListElement.prepend(lineElement);
                }
                else {
                    this._debugLogListElement.appendChild(lineElement);
                }
            });
    }
}
