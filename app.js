import adminRoutes from "./routes/admin.js";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import commentRoutes from "./routes/comments.js";
import likeRoutes from "./routes/likes.js";
import followRoutes from "./routes/follows.js";
import notificationRoutes from "./routes/notifications.js";
import messageRoutes from "./routes/messages.js";
import stickerRoutes from "./routes/stickers.js";
import galleryRoutes from "./routes/gallery.js";
import searchRoutes from "./routes/search.js";
import exploreRoutes from "./routes/explore.js";
import themeRoutes from "./routes/themes.js";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Seguridad
app.use(helmet());

// Compresión
app.use(compression());

// CORS
app.use(cors());

// Logs
app.use(morgan("dev"));

// Body Parser
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({
    extended: true,
    limit: "20mb"
}));

// Cookies
app.use(cookieParser());

// Sesiones
app.use(session({
    secret: process.env.SESSION_SECRET || "angelspace_secret",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI
    }),
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true
    }
}));

// Archivos públicos
app.use(express.static(path.join(__dirname, "public")));
// API
app.use("/admin", adminRoutes);
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use("/comments", commentRoutes);
app.use("/likes", likeRoutes);
app.use("/follows", followRoutes);
app.use("/notifications", notificationRoutes);
app.use("/messages", messageRoutes);
app.use("/stickers", stickerRoutes);
app.use("/gallery", galleryRoutes);
app.use("/search", searchRoutes);
app.use("/explore", exploreRoutes);
app.use("/themes", themeRoutes);

// Estado de la API
app.get("/api", (req, res) => {
    res.json({
        success: true,
        name: "AngelSpace",
        version: "1.0.0",
        status: "online",
        message: "Bienvenido a la API de AngelSpace 🌸"
    });
});

// Estado del servidor
app.get("/status", (req, res) => {
    res.json({
        server: "online",
        uptime: process.uptime(),
        timestamp: new Date(),
        node: process.version
    });
});

// Ruta principal
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "index.html"));
});

// Ruta 404
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

export default app;