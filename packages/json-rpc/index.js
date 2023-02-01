const {BaseAPI} = require("../../lib");
const routes = require("./routes.js");

const Axie = require("./contracts/axie");

module.exports = class JsonRpc extends BaseAPI {

    #requestCounter = 0;
    contracts = {};

    constructor(apiKey, useWebsocket = false) {
        let RPC = "https://rpc2.ronin.rest"
        super(apiKey, routes, RPC, true);

        if (useWebsocket) {
            RPC = RPC.replace("https://", "wss://") + "/ronin-mainnet/ws"
        } else {
            RPC += "/ronin-mainnet"
        }

        this.contracts.Axie = new Axie.Axie(RPC);
    }

    static fixPrefix(address) {
        return address.replace("ronin:", "0x");
    }

    #createRPCRequest(method, params) {
        return {
            jsonrpc: "2.0",
            id: this.#requestCounter++,
            method,
            params,
        };
    }

    async #RPCResponse(response) {
        response = await response;
        if (response.error) {
            throw new Error(response.error.message);
        }
        return response.result;
    }

    /**
     * @description Gets the chainID of the network. Called "version" in the API documentation.
     * @returns {Promise<Object>}
     */
    chainId() {
        return this.#RPCResponse(
            this.post(
                "mainnet",
                {
                    body: this.#createRPCRequest("net_version", []),
                }
            )
        )
    }

    nodeVersion() {
        return this.#RPCResponse(
            this.post(
                "mainnet",
                {
                    body: this.#createRPCRequest("web3_clientVersion", []),
                }
            )
        )
    }

    gasPrice() {
        return this.#RPCResponse(
            this.post(
                "mainnet",
                {
                    body: this.#createRPCRequest("eth_gasPrice", []),
                }
            )
        )
    }

    estimateGas(from, to, value, data) {
        return this.#RPCResponse(
            this.post(
                "mainnet",
                {
                    body: this.#createRPCRequest("eth_estimateGas", [{
                        from: JsonRpc.fixPrefix(from),
                        to: JsonRpc.fixPrefix(to),
                        value,
                        data,
                    }]),
                }
            )
        )
    }

    getBalance(address, block = "latest") {
        return this.#RPCResponse(
            this.post(
                "mainnet",
                {
                    body: this.#createRPCRequest("eth_getBalance", [JsonRpc.fixPrefix(address), block]),
                }
            )
        )
    }

    getCode(address, block = "latest") {
        return this.#RPCResponse(
            this.post(
                "mainnet",
                {
                    body: this.#createRPCRequest("eth_getCode", [JsonRpc.fixPrefix(address), block]),
                }
            )
        )
    }

    getTransactionCount(address, block = "latest") {
        return this.#RPCResponse(
            this.post(
                "mainnet",
                {
                    body: this.#createRPCRequest("eth_getTransactionCount", [JsonRpc.fixPrefix(address), block]),
                }
            )
        )
    }

    getTransactionByHash(hash) {
        return this.#RPCResponse(
            this.post(
                "mainnet",
                {
                    body: this.#createRPCRequest("eth_getTransactionByHash", [hash]),
                }
            )
        )
    }

    getTransactionReceipt(hash) {
        return this.#RPCResponse(
            this.post(
                "mainnet",
                {
                    body: this.#createRPCRequest("eth_getTransactionReceipt", [hash]),
                }
            )
        )
    }

    getBlockByNumber(block, includeTransactions = false) {
        return this.#RPCResponse(
            this.post(
                "mainnet",
                {
                    body: this.#createRPCRequest("eth_getBlockByNumber", [block, includeTransactions]),
                }
            )
        )
    }

    getCurrentBlock() {
        return this.#RPCResponse(
            this.post(
                "mainnet",
                {
                    body: this.#createRPCRequest("eth_blockNumber", []),
                }
            )
        )
    }

    sendRawTransaction(data) {
        return this.#RPCResponse(
            this.post(
                "mainnet",
                {
                    body: this.#createRPCRequest("eth_sendRawTransaction", [data]),
                }
            )
        )
    }

    call(params = []) {
        return this.#RPCResponse(
            this.post(
                "mainnet",
                {
                    body: this.#createRPCRequest("eth_call", params),
                }
            )
        )
    }


}
