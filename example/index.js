const SMAPI = require("../index.js");

const API = new SMAPI.SkyMavisAPI("YOUR_API_KEY");

const EXAMPLE_ADDRESS = "ronin:feae9fe11170fc19b6f40796fd1debfa360daacc";
const EXAMPLE_CLIENT_ID = "1ec9eb6f-53d1-6d8c-a60c-31212e9282bd";

(async () => {

    const API_VERSION = API.apiVersion();
    const VERSION = API.version();

    console.log("==== API Version ====\n");

    console.log(`API Version: ${API_VERSION}`);
    console.log(`Version: ${VERSION}`);

    console.log("\n==== JSON RPC ====\n");

    const CHAIN_ID = await API.jsonRpc.chainId();
    const NODE_VERSION = await API.jsonRpc.nodeVersion();
    const GAS_PRICE = await API.jsonRpc.gasPrice();
    const TRANSACTION_COUNT = await API.jsonRpc.getTransactionCount(EXAMPLE_ADDRESS);
    console.log(`Transaction count for address ${EXAMPLE_ADDRESS}: ${TRANSACTION_COUNT}`);

    console.log(`Chain ID: ${CHAIN_ID}`);
    console.log(`Node Version: ${NODE_VERSION}`);
    console.log(`Gas Price: ${parseInt(GAS_PRICE, 16) / 10 ** 9} Gwei`);

    console.log("\n==== Origins ====\n");

    const USER_FIGHTERS = await API.origins.getListUserFighters(EXAMPLE_CLIENT_ID, "ronin");
    console.log(`User Fighters: ${USER_FIGHTERS._metadata.total}`);

    const BATTLE_LOGS = await API.origins.battleLog.getBattleLogByUserId(EXAMPLE_CLIENT_ID);
    if (BATTLE_LOGS.battles.length > 0) {
        const battle = BATTLE_LOGS.battles[0];
        console.log(`Latest battle: ${(new Date(battle.created_at * 1000)).toISOString()} ==> REPLAY: ${API.origins.battleLog.replayUrl("origin", battle.battle_uuid)}`);
    }

    console.log("\n==== Explorer ====\n");

    const RON_BALANCE = await API.explorer.getAddressInfo(EXAMPLE_ADDRESS);
    const BALANCE = (parseInt(RON_BALANCE.balance) / 10 ** 18).toFixed(4);
    console.log(`Balance for address ${EXAMPLE_ADDRESS}: ${BALANCE} RON`);

})();
