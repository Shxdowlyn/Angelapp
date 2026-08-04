export default {

    app: {
        name: process.env.APP_NAME || "AngelSpace",
        url: process.env.APP_URL || "http://localhost:3000",
        port: Number(process.env.PORT) || 3000
    },

    uploads: {
        directory: process.env.UPLOAD_DIR || "uploads",
        avatars: process.env.AVATAR_DIR || "uploads/avatars",
        posts: process.env.POST_DIR || "uploads/posts",
        drawings: process.env.DRAWING_DIR || "uploads/drawings",
        stickers: process.env.STICKER_DIR || "uploads/stickers"
    },

    security: {
        jwtSecret: process.env.JWT_SECRET,
        sessionSecret: process.env.SESSION_SECRET
    },

    moderation: {
        enabled:
            process.env.AUTO_MODERATION === "true",

        profanityFilter:
            process.env.PROFANITY_FILTER === "true"
    }

};