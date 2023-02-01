const origins = require("./packages/origins");
const explorer = require("./packages/explorer");
const jsonRpc = require("./packages/json-rpc");
const self = require("./package.json");

/**
 * @type {SkyMavisAPI}
 * @property {origins} origins
 * @property {explorer} explorer
 * @property {jsonRpc} jsonRpc
 */
class SkyMavisAPI {

    /**
     * @type {Explorer}
     */
    explorer;
    /**
     * @type {Origins}
     */
    origins;
    /**
     * @type {JsonRpc}
     */
    jsonRpc;
    constructor(apiKey, useWebsocket = false) {
        this.explorer = new explorer(apiKey);
        this.origins = new origins(apiKey);
        this.jsonRpc = new jsonRpc(apiKey, useWebsocket);
    }

    apiVersion() {
        return "1.0.1"
    }

    version() {
        return self.version
    }
}

module.exports.SkyMavisAPI = SkyMavisAPI;
