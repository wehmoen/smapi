const {BaseAPI} = require("../../../lib");
const routes = require("./routes.js");

module.exports = class BattleLog extends BaseAPI {
    constructor(apiKey) {
        super(apiKey, routes, "https://api-gateway.skymavis.com/x");
    }

    getBattleLogByUserId(userId, logType = "pvp", limit = 100, page = 1) {
        return this.get(
            "getBattleLogByUserId",
            {
                query: {
                    client_id: userId,
                    type: logType,
                    limit,
                    page
                }
            }
        )
    }

    getEsportsBattleLogByUserId(userId, logType = "pvp", limit = 100, page = 1) {
        return this.get(
            "getEsportsBattleLogByUserId",
            {
                query: {
                    client_id: userId,
                    type: logType,
                    limit,
                    page
                }
            }
        )
    }

    /**
     * @description Creates a battle replay link.
     * @param platform The platform: origin, beta or esport
     * @param battleId
     * @param userId
     */
    replayUrl(platform, battleId, userId = undefined) {
        const queryParameter = {
            f: "rpl",
            q: battleId
        }

        if (userId) {
            queryParameter["userId"] = userId;
        }

        const searchParams = (new URLSearchParams(queryParameter)).toString();

        switch (platform) {
            case "origin":
                return `https://storage.googleapis.com/origin-production/origin.html?${searchParams}`;
            case "beta":
                return `https://storage.googleapis.com/origin-production/origin-beta.html?${searchParams}`;
            case "esport":
                return `https://storage.googleapis.com/origin-production/origin-esport.html?${searchParams}`;
            default:
                throw new Error("Invalid platform");
        }
    }
}
