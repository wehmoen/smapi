const {BaseAPI} = require("../../lib");
const routes = require("./routes.js");

module.exports = class Explorer extends BaseAPI {
    constructor(apiKey) {
        super(apiKey, routes, "https://api-gateway.skymavis.com/explorer");
    }

    #fixPrefix(address) {
        return address.replace("ronin:", "0x");
    }

    getLatestBlocks(from = 0, size = 100) {
        return this.get(
            "getLatestBlocks",
            {
                query: {
                    from,
                    size
                }
            }
        )
    }

    getBlockInfo(blockNumber) {
        return this.get(
            "getBlockInfo",
            {
                path: [
                    ["block_number", blockNumber]
                ]
            }
        )
    }

    getLatestBlockNumber() {
        return this.get(
            "getLatestBlockNumber",
        )
    }

    getTransactionByHash(txHash) {
        return this.get(
            "getTransactionByHash",
            {
                path: [
                    ["tx_hash", txHash]
                ]
            }
        )
    }

    getTransactionsByAddress(address, from = 0, size = 100) {
        return this.get(
            "getTransactionsByAddress",
            {
                path: [
                    ["address", this.#fixPrefix(address)]
                ],
                query: {
                    from,
                    size
                }
            }
        )
    }

    getLatestTransactions(address, from = undefined, size = undefined, blockHash = undefined) {
        return this.get(
            "getLatestTransactions",
            {
                query: {
                    from_address: this.#fixPrefix(address),
                    from,
                    size,
                    block: blockHash
                }
            }
        )
    }

    getInternalTransactionByHash(txHash, size = 100, offset = 0) {
        return this.get(
            "getInternalTransactionByHash",
            {
                path: [
                    ["tx_hash", txHash]
                ],
                query: {
                    size,
                    offset
                }
            }
        )
    }

    getLatestTokenTransfers(tokenAddress, tokenType = "ERC20", size = 100, offset = 0) {
        return this.get(
            "getLatestTokenTransfers",
            {
                query: {
                    token_address: tokenAddress,
                    token_type: tokenType,
                    size,
                    from: offset
                }
            }
        )
    }

    getTokenTransfersByContractAddress(contractAddress, size = 100, offset = 0) {
        return this.get(
            "getTokenTransfersByContractAddress",
            {
                path: [
                    ["contract_address", contractAddress]
                ],
                query: {
                    size,
                    from: offset
                }
            }
        )
    }

    getAllContractsByType(tokenType = "ERC20") {
        return this.get(
            "getAllContractsByType",
            {
                path: [
                    ["token_type", tokenType]
                ]
            }
        )
    }

    getContractInfo(contractAddress) {
        return this.get(
            "getContractInfo",
            {
                path: [
                    ["contract_address", contractAddress]
                ]
            }
        )
    }

    getHoldersByTokenAddress(tokenAddress, size = 100, offset = 0) {
        return this.get(
            "getHoldersByTokenAddress",
            {
                path: [
                    ["token_address", tokenAddress]
                ],

                query: {
                    size,
                    from: offset
                }
            }
        )
    }

    getValidators(sort = "last_block", order = "asc", size = 100, offset = 0) {
        return this.get(
            "getValidators",
            {
                query: {
                    sort,
                    order,
                    size,
                    from: offset
                }
            }
        )
    }

    getValidatorStats(validatorAddress) {
        return this.get(
            "getValidatorStats",
            {
                path: [
                    ["validator_address", this.#fixPrefix(validatorAddress)]
                ]
            }
        )
    }

    getValidatorInfo() {
        return this.get(
            "getValidatorInfo"
        )
    }

    getAllAdressesByBalance(size = 100, offset = 0) {
        return this.get(
            "getAllAddressesByBalance",
            {
                query: {
                    size,
                    from: offset
                }
            }
        )
    }

    getAddressInfo(address) {
        return this.get(
            "getAddressInfo",
            {
                path: [
                    ["address", this.#fixPrefix(address)]
                ]
            }
        )
    }

    getTokenBalancesByAddress(address, tokenType = undefined, size = 100, offset = 0) {
        return this.get(
            "getTokenBalancesByAddress",
            {
                path: [
                    ["address", this.#fixPrefix(address)]
                ],
                query: {
                    token_type: tokenType,
                    size,
                    from: offset
                }
            }
        )
    }

    /**
     *
     * @param address
     * @param size
     * @param offset
     * @returns {Promise<Object>}
     * @deprecated use getTokenBalancesByAddress instead
     */
    getTokenBalancesByAddressWithDetailedERC1155(address, size = 100, offset = 0) {
        return this.get(
            "getTokenBalancesByAddressWithDetailedERC1155",
            {
                path: [
                    ["address", this.#fixPrefix(address)],
                ],
                query: {
                    size,
                    from: offset
                }
            }
        )
    }
}
