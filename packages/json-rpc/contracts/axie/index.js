const fs = require("fs")
const SmartContract = require("../smartcontract");

const METADATA = {
    name: "Axie",
    address: "0x32950db2a7164ae833121501c797d79e7b79d74c",
    abi: JSON.parse(fs.readFileSync(__dirname + "/abi.json", "utf8").toString()),
}


class Axie extends SmartContract {
    constructor(rpcHost) {
        super(rpcHost, METADATA.address, METADATA.abi);
    }
}

module.exports.metadata = METADATA
module.exports.Axie = Axie;
