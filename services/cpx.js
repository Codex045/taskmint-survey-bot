import crypto from "crypto";
import config from "../config.js";

export function createSurveyLink(user) {

    const userId = String(user.id);

    const username = encodeURIComponent(
        user.username || user.first_name || "User"
    );

    // Email is optional for CPX
    const email = "";

    // CPX Secure Hash
    const secureHash = crypto
        .createHash("md5")
        .update(`${userId}-${config.CPX_SECURITY_HASH}`)
        .digest("hex");

    return `https://offers.cpx-research.com/index.php?app_id=${config.CPX_APP_ID}` +
        `&ext_user_id=${userId}` +
        `&secure_hash=${secureHash}` +
        `&username=${username}` +
        `&email=${email}` +
        `&subid_1=telegram` +
        `&subid_2=taskmint`;
}

export function verifyPostback(transId, hash) {

    const verify = crypto
        .createHash("md5")
        .update(`${transId}-${config.CPX_SECURITY_HASH}`)
        .digest("hex");

    return verify === hash;

}
