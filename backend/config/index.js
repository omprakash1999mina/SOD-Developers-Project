import dotenv  from "dotenv";
dotenv.config();

export const{
    APP_PORT,
    DEBUG_MODE,
    DB_URL,
    APP_URL,
    WEB_URL,
    JWT_SECRET,
    REFRESH_SECRET,
    
    FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN,
    FIREBASE_PROJECT_ID,
    FIREBASE_STORAGE_BUCKET,
    FIREBASE_MESSAGING_SENDER_ID,
    FIREBASE_APP_ID,
    FIREBASE_MEASUREMENT_ID,

    DISCORD_URL,
    DISCORD_WEBHOOK_ID,
    DISCORD_WEBHOOK_TOKEN,
    DISCORD_SHOULD_WAIT_FOR_RESPONSE
}= process.env;