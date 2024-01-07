# ObsWhepPlayer
A WHEP player web page for OBS Studio's browser source.
It automatically starts playback of a WEHP stream (sent out from another instance of OBS Studio) with no mute.

## Usage
1. Clone this repository.
2. Host the repository's root directory on a web server like `dotnet-serve`.
3. Access to the index.html with a browser.

No need of isntalling `npm` or `node.js` for using this project. As written in the [Build](#build) section, just one thing to make the app work is to host the files on a web server.

If you want to edit the source code, then you need to run `npm install` for setting up Unit Test environment.
See [Testing](#testing) section for details.

### Hosting with `dotnet-serve`
1. Install `dotnet-serve` with `dotnet tool install --global dotnet-serve`.
2. Run `dotnet serve` in the repository's root directory.
   1. If you want to use a specific port, run `dotnet serve --port <port number>`.
   2. If you want to use a specific hostname, run `dotnet serve --host <hostname>`.
   3. If you want to use a specific hostname and port, run `dotnet serve --host <hostname> --port <port number>`.
   4. If you want to open a Web Browser automatically, run `dotnet serve --open`.
   5. If you want to host it with HTTPS, run `dotnet serve --tls`. Make it sure its certificate is trusted by the Web Browser. You can use `dotnet dev-certs https --trust` to trust the certificate.
3. Access to the index.html with a browser, with some query parameters.

### Query Parameters
- `streamUrl`: The URL of the WHEP stream to open. It must be URL-encoded.
- `volume`: The volume of the audio. It must be a number between 0 and 1. (default: `1`)
- `muted`: Whether the audio is muted. It must be `true` or `false`.(default: `flase`)
- `autoplay`: Whether the video is automatically played. It must be `true` or `false`. (default: `true`)
- `loop`: Whether the video is automatically looped. It must be `true` or `false`. (default: `false`)
- `controls`: Whether the video controls are shown. It must be `true` or `false`. (default: `false`)
- `debug`: Whether the debug information is shown. It must be `true` or `false`. (default: `false`, but it's `true` when the page is **NOT** opened by OBS Studio's browser source)


### Notes
- This project utilizes JavaScript modules. You need to host the files on a web server to use them.
- Modern web browsers do not allow autoplay of media without user interaction. This application automatically mute the audio of the video element, when it's opened by Web Browser like Google Chrome, Microsoft Edge, etc.
  - When the page is opened by OBS Studio's browser source, the audio is not muted. The player automatically detects that it's opened by OBS Studio's browser source, and unmute the audio.
  - 

## Testing
This project uses Jest with Babel and jsdom, for testing.
Before running the tests, you need to install the dependencies.
`Node.js v20.10.0` is used for the initial development phase so it'd be better to use the same version of nodejs.

```sh
npm install
npm test
```

It automatically collects code coverage information and generates a coverage report in the `coverage` directory.


## Build

No need of running `npm install` or `npm run build`, as long as you don't edit the source code.
This project jsut works with the files checked into this repository. `index.html` is the entry point of this project.
