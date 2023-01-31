const {BaseAPI} = require("../../lib");
const routes = require("./routes.js");
const BattleLog = require("./battleLog");

module.exports = class Origins extends BaseAPI {

    /**
     * @type {BattleLog}
     */
    battleLog;

    constructor(apiKey) {
        super(apiKey, routes, "https://api-gateway.skymavis.com/origin/v2");
        this.battleLog = new BattleLog(apiKey);
    }

    getListAllRunes() {
        return this.get(
            "listAllRunes",
        )
    }

    getRuneById(id) {
        return this.get(
            "getRuneById",
            {
                path: [
                    ["id", id]
                ]
            }
        )
    }

    getListAllCharms() {
        return this.get(
            "listAllCharms",
        )
    }

    getCharmById(id) {
        return this.get(
            "getCharmById",
            {
                path: [
                    ["id", id]
                ]
            }
        )
    }

    getListAllItems() {
        return this.get(
            "listAllItems",
        )
    }

    getItemById(id) {
        return this.get(
            "getItemById",
            {
                path: [
                    ["id", id]
                ]
            }
        )
    }

    getListUserItems(userId, limit = 100, offset = 0, items = undefined) {
        return this.get(
            "listUserItems",
            {
                query: {
                    "userID": userId,
                    "limit": limit,
                    "offset": offset,
                    "items": items
                }
            }
        )
    }

    getListChapterCleared(userId) {
        return this.get(
            "listChapterCleared",
            {
                query: {
                    "userID": userId
                }
            }
        )
    }

    getListNodesCleared(userId) {
        return this.get(
            "listNodesCleared",
            {
                query: {
                    "userID": userId
                }
            }
        )
    }

    /**
     * @param userId
     * @param axieType - starter or ronin
     * @param limit
     * @param offset
     * @returns {Promise<Object>}
     */
    getListUserFighters(userId, axieType, limit = 100, offset = 0) {
        return this.get(
            "listUserFighters",
            {
                query: {
                    "userID": userId,
                    "axieType": axieType,
                    "limit": limit,
                    "offset": offset
                }
            }
        )
    }

    getListUserFightersConfig(userId, limit = 100, offset = 0) {
        return this.get(
            "listUserFightersConfigs",
            {
                query: {
                    "userID": userId,
                    "limit": limit,
                    "offset": offset
                }
            }
        )
    }

    getListLeaderboard(limit = 100, offset = 0) {
        return this.get(
            "listLeaderboard",
            {
                query: {
                    "limit": limit,
                    "offset": offset
                }
            }
        )
    }

    getListBurnedItems(userId, itemId, startAt = 0, endAt = 0) {
        return this.get(
            "listBurnedItems",
            {
                path: [
                    ["userId", userId],
                ],
                query: {
                    "itemID": itemId,
                    "startAt": startAt > 0 ? startAt : ((Date.now()) / 1000 - 86400).toFixed(0),
                    "endAt": endAt > 0 ? endAt : (Date.now() / 1000).toFixed(0)
                }
            }
        )
    }

    getListAllCards() {
        return this.get(
            "listAllCards",
        )
    }
}
