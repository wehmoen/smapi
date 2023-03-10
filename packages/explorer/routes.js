module.exports = new Map([
    ["getLatestBlocks", "blocks"],
    ["getBlockInfo", "block/:block_number"],
    ["getLatestBlockNumber", "blocks/latest"],
    ["getTransactionByHash", "tx/:tx_hash"],
    ["getTransactionsByAddress", "txs/:address"],
    ["getLatestTransactions", "txs"],
    ["getInternalTransactionByHash", "tx/:tx_hash/internal"],
    ["getLatestTokenTransfers", "tokentxs"],
    ["getTokenTransfersByContractAddress", "tokentxs/:contract_address"],
    ["getAllContractsByType", "tokens/:token_type"],
    ["getContractInfo", "token/:contract_address"],
    ["getHoldersByTokenAddress", "tokenholders/:token_address"],
    ["getValidators", "validators"],
    ["getValidatorStats", "validatorstats/:validator_address"],
    ["getValidatorInfo", "naming"],
    ["getAllAddressesByBalance", "addresses/wealthiest"],
    ["getAddressInfo", "address/:address"],
    ["getTokenBalancesByAddress", "tokenbalances/:address"],
    ["getTokenBalancesByAddressWithDetailedERC1155", "tokenbalances/:address/ERC721"],
]);
