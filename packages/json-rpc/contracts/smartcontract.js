const web3 = require("web3");

/**
 * @property {string} address
 * @property {Array} abi
 * @property {web3.eth.Contract} #contract
 * @type {SmartContract}
 */
class SmartContract {
    __address__;
    __abi__;
    #contract;

    events = {};

    #setupMethods() {
        const methods = this.__abi__.filter((method) => method.type === "function");
        for (const method of methods)
            if (method.name.length > 0) {
                this[method.name] = (...args) => {
                    args = args.map(x => {
                        if (typeof x === "string" && x.startsWith("ronin:")) return x.replace("ronin:", "0x");
                        return x;
                    })
                    return this.#contract.methods[method.name](...args).call();
                }

            }

        const otherMethods = this.__abi__.filter((method) => method.type !== "function");
        for (const method of otherMethods) {

            if (method.name.length > 0)
                this.events[method.name] = this.#contract.events[method.name];
        }
    }

    constructor(rpcUrl, address, abi) {
        const ronin = new web3(rpcUrl);
        this.__address__ = address;
        this.__abi__ = abi;
        this.#contract = new ronin.eth.Contract(abi, address);
        this.#setupMethods();
        if (rpcUrl.startsWith("wss://")) {
            this.__close__ = () => {
                ronin.currentProvider.connection.close();
            }
        } else {
            this.__close__ = () => {
                console.warn("Cannot close connection, not a websocket connection")
            }
        }
    }
}

module.exports = SmartContract;
