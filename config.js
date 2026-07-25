import "dotenv/config";

export default {

    BOT_TOKEN: process.env.BOT_TOKEN,

    ADMIN_ID: process.env.ADMIN_ID,

    CPX_APP_ID: process.env.CPX_APP_ID,

    CPX_SECURITY_HASH: process.env.CPX_SECURITY_HASH,

    PORT: process.env.PORT || 3000,

    MIN_WITHDRAW: 2500,

    REFERRAL_REWARD: 50

};
