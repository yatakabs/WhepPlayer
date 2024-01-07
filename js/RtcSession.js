

export class RtcSession {
    constructor(
        videoElement,
        stream,
        peerConnection) {

        this._videoElement = videoElement;
        this._stream = stream;
        this._peerConnection = peerConnection;
    }

    get stream() {
        return this._stream;
    }

    get peerConnection() {
        return this._peerConnection;
    }

    player() {
        this._videoElement.play();
    }

    pause() {
        this._videoElement.pause();
    }

    close() {
        console.debug("RtcPlayerSession.closeAsync");
        this._peerConnection.close();
    }
}
