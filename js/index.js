import Guard from "./Guard.js";
import { RtcSession } from "./RtcSession.js";
import { DebugLogPrinter, DebugLogItem, DebugLogFlowDirections, DebugLogLevel } from "./DebugLogPrinter.js";
import { InvalidOperationError, ArgumentError } from "./Errors.js";


/**
 * Retrieves the video element with the id 'player'.
 * @returns {HTMLVideoElement} The video element.
 * @throws {Error} If the video element is not found.
 */
const getVideoElement = () => {
    const videoElement = document.getElementById("player");

    if (videoElement) {
        return videoElement;
    }

    console.error("Could not find video element");
    throw new InvalidOperationError("Could not find video element");
};


/**
 * Default options for the player.
 * @type {Object}
 * @property {String} streamUrl - URL to the stream server.
 * @property {Boolean} autoplay - Autoplay video.
 * @property {Boolean} muted - Mute video.
 * @property {Boolean} loop - Loop video.
 * @property {Number} volume - Volume of the video.
 * @property {Boolean} controls - Show controls.
 * @property {Boolean} autoReconnect - Automatically reconnect when disconnected.
 * @property {Number} reconnectInterval - Interval to reconnect in milliseconds.
 * @property {Boolean} debug - Enable debug mode.
 *
 * @default streamUrl: 'http://whip-srs-server-test2.japaneast.azurecontainer.io:1985/rtc/v1/whep/?app=live&stream=yas-test.flv'
 * @default autoplay: true
 * @default muted: false
 * @default loop: false
 * @default controls: true
 * @default volume: 1.0
 * @default autoReconnect: true
 * @default reconnectInterval: 1000
 * @default debug: false for OBS Browser Source, true for other browser.
 */
export const defaultOptions = {
    streamUrl: "http://whip-srs-server-test2.japaneast.azurecontainer.io:1985/rtc/v1/whep/?app=live&stream=yas-test.flv", // URL to the stream server
    autoplay: true,
    muted: false,
    volume: 1.0,
    loop: true,
    controls: false,
    autoReconnect: true,
    reconnectInterval: 1000,
    debug: false,
};

/**
 * The option parameters.
 */
const optionParams = Object.keys(defaultOptions);

/**
 * The option parameters with their types.
 * @type {Object[]}
 * @property {string} name - The name of the option.
 * @property {string} type - The type of the option.
 */
const optionParamsWithTypes = optionParams
    .map((param) => {
        return {
            name: param,
            type: typeof defaultOptions[param],
        };
    });

/**
 * Retrieves the type of the option.
 * @param {string} name - The name of the option.
 * @returns {string} The type of the option.
 */
const getOptionType = (name) => {
    Guard.Argument.isNotNullOrUndefined("name", name, "Name must be provided.");

    const option = optionParamsWithTypes.find((param) => {
        return param.name === name;
    });

    if (typeof option === "undefined" || option === null) {
        throw new ArgumentError("name", "Option not found.");
    }

    return option.type;
};

/**
 * Retrieves the query parameters from the current URL.
 * @param {string} [url] - The URL to retrieve the query parameters from. If not provided, the current URL is used.
 * @returns {Object} An object containing the query parameters as key-value pairs.
 * @throws {Error} If the URL is not found.
 */
export const getQueryParameters = (url) => {
    Guard.Argument.isNotNullOrUndefined("url", url, "URL must be provided");

    const queryOptions = url
        ? url.split("?")[1]
        : window.location.search;

    const params = new URLSearchParams(queryOptions);
    const options = {};

    params.forEach((value, key) => {
        options[key] = value;
    });

    return options;
};

/**
 * Tries to convert the value to the specified type.
 * @param {*} value - The value to convert.
 * @param {string} type - The type to convert to.
 * @param {*} defaultValue - The default value to return if the conversion fails.
 * @returns {*} The converted value.
 */
export const tryConvertType = (value, type, defaultValue = undefined) => {
    if (typeof value === type) {
        return value;
    }

    switch (type) {
        case "number":
            return Number(value);

        case "boolean":
            return value === "true" || value === "1" || value === "yes" || value === "on";

        case "string":
            return String(value);

        default:
            return defaultValue;
    }
};

/**
 * Retrieves an option value based on the provided parameter.
 * The parameter is retrieved from the following sources, in order:
 * 1. Data attribute on the video element
 * 2. URL parameter
 * 3. Default value
 *
 * @param {string} name - The name of the option.
 * @param {string} type - The type of the option.
 * @param {Object} defaultOptions - The default options.
 *
 * @throws {ArgumentNullError} If the name, type, or defaultOptions are null or undefined.
 *
 * @returns {string|null} - The value of the option, or null if not found.
 */
export const getOption = (name, type, defaultOptions) => {
    console.debug(`getOption ${name}, ${type}`);
    Guard.Argument.isNotNullOrUndefined("name", name, "Name must be provided");
    Guard.Argument.isNotNullOrUndefined("type", type, "Type must be provided");
    Guard.Argument.isNotNullOrUndefined("defaultOptions", defaultOptions, "Default options must be provided");

    // Gets option from data attribute
    try {
        const rawDataValue = getVideoElement().dataset[name];

        if (typeof rawDataValue !== "undefined" && rawDataValue !== null) {
            const value = tryConvertType(rawDataValue, type);
            if (typeof value !== "undefined" && value !== null) {
                console.debug(`Found option ${name}=${value} in data attribute`);
                return value;
            }
            else {
                console.warn(`Failed to convert option ${name}=${rawDataValue} to type ${type}`);
            }
        }
    }
    catch (error) {
        console.warn("Failed to get data attribute. Name: " + name, error);
    }

    // Gets option from URL parameter
    try {
        const url = window.location.href;
        const queryParameters = getQueryParameters(url);
        const rawValue = queryParameters[name];

        if (typeof rawValue !== "undefined" && rawValue !== null) {
            const value = tryConvertType(rawValue, type);

            if (typeof value !== "undefined" && value !== null) {
                console.debug(`Found option ${name}=${value} in URL parameter`);
                return value;
            }
            else if (rawValue !== null) {
                console.debug(`Failed to convert option ${name}=${rawValue} to type ${type}`);
            }
        }
    }
    catch (error) {
        console.warn("Failed to get URL parameter. Name: " + name, error);
    }

    // Gets option from default value, as fallback
    const defaultValue = defaultOptions[name];
    if (typeof defaultValue === "undefined" || defaultValue === null) {
        // Option not found in default options
        console.warn(`Option ${name} not found in default options`);
        return null;
    }

    console.debug(`Using default option ${name}=${defaultValue} as fallback`);
    return defaultValue;
};

/**
 * Retrieves the options from the URL parameters.
 *
 * @param {Object} defaultOptions - The default options as the fallback.
 * @returns {Object} The options object containing the parsed URL parameters.
 */
const getOptions = (defaultOptions) => {
    return optionParams.reduce(
        (options, param) => {
            const type = getOptionType(param);
            const value = getOption(param, type, defaultOptions);

            if (typeof value !== "undefined") {
                options[param] = value;
            }
            else {
                options[param] = defaultOptions[param];
            }

            return options;
        },
        {});
};

/**
 * Starts the WEHP stream.
 *
 * @param {MediaStream} stream - The stream to play the WEHP stream in.
 * @param {Object} options - The options for configuring the player.
 *
 * @returns {RTCPeerConnection} The peer connection.
 *
 * @throws {ArgumentNullError} If the stream or options are null or undefined.
 * @throws {Error} If there is an error starting the stream.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/MediaSource
 * @see https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection
 */
export const startWhepStream = async (stream, options) => {
    Guard.Argument.isNotNullOrUndefined("stream", stream, "Stream must be provided");
    Guard.Argument.isNotNullOrUndefined("options", options, "Options must be provided");

    const streamUrl = options.streamUrl;

    // Plays WEHP stream in video element using MediaSource API with RTCPeerConnection
    const peerConnection = new RTCPeerConnection(null);
    peerConnection.addTransceiver("video", { direction: "recvonly" });
    peerConnection.addTransceiver("audio", { direction: "recvonly" });

    peerConnection.ontrack = (event) => {
        console.debug("ontrack", event);
        stream.addTrack(event.track);
    };

    const offer = await peerConnection.createOffer();
    peerConnection.setLocalDescription(offer);

    console.debug("offer", offer);
    const answer = await fetch(streamUrl, {
        method: "POST",
        body: offer.sdp,
        headers: {
            "Content-Type": "application/sdp"
        },
        cache: "no-cache",
        mode: "cors",
    });

    console.debug("Successfully fetched answer");
    const answerSdp = await answer.text();
    console.debug("answerSdp", answerSdp);

    const remoteSessionDescriptor = new RTCSessionDescription({
        type: "answer",
        sdp: answerSdp
    });

    await peerConnection.setRemoteDescription(remoteSessionDescriptor);


    peerConnection.oniceconnectionstatechange = (event) => {
        if (peerConnection.iceConnectionState === "disconnected") {
            console.warn("RTC connection disconnected");

            // Automatically reconnect when disconnected, if option is set
            // Auto-reconnect interval can be set with reconnect-interval option
            const reconnect = options["auto-reconnect"] || true;
            const reconnectInterval = options["reconnect-interval"] || 1000;
            if (reconnect) {
                setTimeout(() => {
                    startWhepStream(options);
                }, reconnectInterval);
            }
        }
        else {
            console.debug("RTC connection state change", event, peerConnection.iceConnectionState);
        }
    };

    peerConnection.onicecandidate = (event) => {
        console.debug("onicecandidate", event);
    };

    peerConnection.onicegatheringstatechange = (event) => {
        console.debug("onicegatheringstatechange", event);
    };

    peerConnection.onnegotiationneeded = (event) => {
        console.debug("onnegotiationneeded", event);
    };

    peerConnection.onsignalingstatechange = (event) => {
        console.debug("onsignalingstatechange", event);
    };

    return peerConnection;
};



/**
 * Applies the specified options to the player.
 * @param {Object} player - The player object, of HTMLVideoElement, to apply options to.
 * @param {Object} options - The options to apply.
 *
 * @throws {ArgumentNullError} If the player or options are null or undefined.
 */
export const applyPlayerOptions = (player, options) => {
    Guard.Argument.isNotNullOrUndefined("player", player, "Player must be provided");
    Guard.Argument.isNotNullOrUndefined("options", options, "Options must be provided");


    if (typeof options.autoplay !== "undefined") {
        player.autoplay = options.autoplay;
        console.debug(`Set autoplay to ${options.autoplay}`);
    }

    if (typeof options.muted !== "undefined") {
        player.muted = options.muted;
        console.debug(`Set muted to ${options.muted}`);
    }

    if (typeof options.loop !== "undefined") {
        player.loop = options.loop;
        console.debug(`Set loop to ${options.loop}`);
    }

    if (typeof options.controls !== "undefined") {
        player.controls = options.controls;
        console.debug(`Set controls to ${options.controls}`);
    }

    if (typeof options.volume !== "undefined") {
        player.volume = options.volume;
        console.debug(`Set volume to ${options.volume}`);
    }

    // Debug mode
    if (typeof options.debug !== "undefined" && options.debug === true) {
        console.debug("Debug mode enabled");
        const debugContainer = document.getElementById("debug-container");
        // const debugMonitor = document.getElementById("debug-monitor");
        // const debugControls = document.getElementById("debug-controls");

        debugContainer.style.visibility = "visible";

        const debugOptionsElement = document.getElementById("debug-monitor-options");
        if (typeof debugOptionsElement !== "undefined") {
            debugOptionsElement.style.visibility = "visible";

            optionParams
                .filter((key) => {
                    return typeof options[key] !== "undefined";
                })
                .map((key) => {
                    return {
                        name: key,
                        value: options[key],
                    };
                })
                .forEach((option) => {
                    const optionElement = document.createElement(
                        "li",
                        {
                            id: `debug-monitor-option-${option.name}`,
                            class: "option-item",
                        });
                    optionElement.classList.add("option-item");


                    const optionNameElement = document.createElement("span");
                    optionNameElement.classList.add("option-name");
                    optionNameElement.innerText = option.name;

                    const optionValueElement = document.createElement("span");
                    optionValueElement.classList.add("option-value");
                    optionValueElement.innerText = option.value;

                    optionElement.appendChild(optionNameElement);
                    optionElement.appendChild(optionValueElement);

                    debugOptionsElement.appendChild(optionElement);
                });
        }


        // const debugControlsElement = document.getElementById('debug-controls-options');
        // if (typeof debugControlsElement !== 'undefined') {
        //     debugControlsElement.style.visibility = 'visible';
        // }

        const debugLogsElement = document.getElementById("debug-monitor-logs");
        if (typeof debugLogsElement !== "undefined") {
            // debugLogsElement.style.visibility = 'visible';
            setupDebugLog(debugLogsElement);
        }
    }
};


/**
 * Initializes the player with the provided video element and options.
 * @param {HTMLVideoElement} videoElement - The video element to be used by the player.
 * @param {Object} options - The options for configuring the player.
 *
 * @returns {RtcSession} The player session.
 *
 * @throws {ArgumentNullError} If the video element or options are null or undefined.
 */
export const initializeRtcSession = async (videoElement, options) => {
    console.debug("initializePlayer");

    Guard.Argument.isNotNullOrUndefined("videoElement", videoElement, "Video element must be provided");
    Guard.Argument.isNotNullOrUndefined("options", options, "Options must be provided");

    try {
        applyPlayerOptions(videoElement, options);
    }
    catch (error) {
        console.error("Failed to apply options.", error);
        throw error;
    }

    try {
        const stream = new MediaStream();

        const peerConnection = await startWhepStream(stream, options);
        console.debug("Successfully initialized RTC session.", peerConnection, stream);

        videoElement.srcObject = stream;
        return new RtcSession(videoElement, stream, peerConnection);
    }
    catch (error) {
        console.error("Failed to initialize RTC session.", error);
        throw error;
    }
};

if (typeof window !== "undefined" && window.document) {
    console.debug("Running in browser");

    window.onload = async () => {
        console.debug("window.onload");

        const options = getOptions(defaultOptions);
        console.debug("options", options);

        // Apply options to video element
        const videoElement = getVideoElement();
        if (!videoElement) {
            throw new Error("Video element not found");
        }

        try {
            applyPlayerOptions(videoElement, options);
        }
        catch (error) {
            console.error("Failed to apply options.", error);
            throw error;
        }

        // Check if the browser is an instance of OBS Studio's CEF browser
        const userAgent = navigator.userAgent;
        const isOBS = userAgent.includes("OBS");
        if (isOBS) {
            console.debug("OBS Studio detected");

            // OBS Studio does not support autoplay
            const options = getOptions(defaultOptions);
            if (options.autoplay) {
                window.session = startPlayback(options);
            }
        }
        else {
            options.debug = true;
            console.debug("OBS Studio not detected");

            if (options.autoplay) {
                console.info("Autoplay enabled, muting video as a workaround for browsers that do not support autoplay with audio.");
                options.muted = true;
                window.session = startPlayback(options);
            }
        }

    };
}

const setupDebugLog = (debugLogListElement) => {
    const debugLogPrinter = new DebugLogPrinter(
        document,
        debugLogListElement,
        DebugLogFlowDirections.TopToBottom);
    // const debugLogOptionsElement = document.getElementById('debug-monitor-options');
    // const debugLogOptions = {
    // monitorElement: debugLogOptionsElement,
    // };


    // intercept console.log
    const originalLog = console.log;
    console.log = (message, ...optionParams) => {
        const debuglogItem = new DebugLogItem(
            new Date(),
            DebugLogLevel.Info,
            message,
            generateUuid()
        );

        debugLogPrinter.appendLog(debuglogItem);
        originalLog(message, ...optionParams);
    };

    // intercept console.debug
    const originalDebug = console.debug;
    console.debug = (message, ...optionParams) => {
        const debuglogItem = new DebugLogItem(
            new Date(),
            DebugLogLevel.Debug,
            message,
            generateUuid()
        );

        debugLogPrinter.appendLog(debuglogItem);
        originalDebug(message, ...optionParams);
    };

    // intercept console.info
    const originalInfo = console.info;
    console.info = (message, ...optionParams) => {
        const debuglogItem = new DebugLogItem(
            new Date(),
            DebugLogLevel.Info,
            message,
            generateUuid()
        );

        debugLogPrinter.appendLog(debuglogItem);
        originalInfo(message, ...optionParams);
    };

    // intercept console.warn
    const originalWarn = console.warn;
    console.warn = (message, ...optionParams) => {
        const debuglogItem = new DebugLogItem(
            new Date(),
            DebugLogLevel.Warning,
            message,
            generateUuid()
        );

        debugLogPrinter.appendLog(debuglogItem);
        originalWarn(message, ...optionParams);
    };

    // intercept console.error
    const originalError = console.error;
    console.error = (message, ...optionParams) => {
        const debuglogItem = new DebugLogItem(
            new Date(),
            DebugLogLevel.Error,
            message,
            generateUuid()
        );

        debugLogPrinter.appendLog(debuglogItem);
        originalError(message, ...optionParams);
    };

    // intercept console.trace
    const originalTrace = console.trace;
    console.trace = (message, ...optionParams) => {
        const debuglogItem = new DebugLogItem(
            new Date(),
            DebugLogLevel.Trace,
            message,
            generateUuid()
        );

        debugLogPrinter.appendLog(debuglogItem);
        originalTrace(message, ...optionParams);
    };

    console.log("Setup debug log");

    return {
        debugLogPrinter,
    };
};


export const startPlayback = async (options = null) => {
    console.debug("startPlayback");



    if (!options) {
        console.debug("No options provided, loading options...");
        options = getOptions(defaultOptions);

        console.debug("Options loaded.", options);
    }

    const videoElement = getVideoElement();
    if (!videoElement) {
        throw new InvalidOperationError("Video element not found.");
    }

    return await startPlaybackAsync(options, videoElement);

};

export async function startPlaybackAsync(
    options,
    videoElement) {
    console.debug("startPlaybackAsync");
    Guard.Argument.isNotNullOrUndefined("options", options, "Options must be provided");
    Guard.Argument.isNotNullOrUndefined("videoElement", videoElement, "Video element must be provided");

    try {
        const oldSession = window.session;
        if (oldSession instanceof RtcSession) {
            console.info("Closing old session...");
            oldSession.close();

            console.info("Old session closed.");
        }
        else {
            console.info("No old session to close.");
        }
    }
    catch (error) {
        console.error("Failed to close old session.", error);
    }


    try {
        console.debug("Applying options...", options);
        applyPlayerOptions(videoElement, options);

        console.debug("Options applied.");
    }
    catch (error) {
        console.error("Failed to apply options.", error);
        throw error;
    }

    try {
        console.debug("Initializing player...");

        const session = await initializeRtcSession(videoElement, options);
        window.session = session;

        console.debug("Player initialized.");
        console.debug("Stream", session.stream);
        console.debug("Peer connection", session.peerConnection);
    }
    catch (error) {
        console.error("Failed to initialize player.", error);
        throw error;
    }

    try {
        console.debug("Starting playback...");
        await videoElement.play();

        console.info("Successfully started playback");

    }
    catch (error) {
        console.error("Failed to play video.", error);
        throw error;
    }
}


/**
 * Generates a UUID (Universally Unique Identifier).
 * It generates a random UUID using the crypto.randomUUID() function, if available.
 * Otherwise, it falls back to generating a random UUID using Math.random().
 *
 * HTTPS is required to use crypto.randomUUID().
 * It is available in almost all the modern Web browsers, but only when using HTTPS.
 * Thus, when using HTTP, it will fall back to using Math.random().
 *
 * @param {boolean} [forceJsRandom=false] - Whether to force the use of Math.random() for generating the UUID.
 * @returns {string} The generated UUID.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Crypto/randomUUID
 */
export const generateUuid = (forceJsRandom = false) => {
    // Use generateUuid() when available, if not, fallback to Math.random().
    if (!forceJsRandom && typeof crypto !== "undefined" && typeof randomUUID === "function") {
        return crypto.randomUUID();
    }

    // https://stackoverflow.com/a/2117523/1233379
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
        const r = Math.random() * 16 | 0;
        const v = c === "x"
            ? r
            : (r & 0x3 | 0x8);

        return v.toString(16);
    });
};
