import express from "express";
import http from "http";
import { Server } from "socket.io";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: process.env.SOCKET_CORS_ORIGIN || "*",
        methods: ["GET", "POST"]
    }
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Base de datos
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log("🟢 MongoDB conectado"))
.catch(err => console.error("🔴 Error MongoDB:", err));

// Middlewares
app.use(helmet());
app.use(compression());
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI
    }),
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}));

// Archivos públicos
app.use(express.static(path.join(__dirname, "public")));

// Vistas
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "index.html"));
});

// Socket.IO
io.on("connection", socket => {

    console.log(`🟢 Usuario conectado: ${socket.id}`);

    socket.on("chat message", data => {
        io.emit("chat message", data);
    });

    socket.on("typing", user => {
        socket.broadcast.emit("typing", user);
    });

    socket.on("disconnect", () => {
        console.log(`🔴 Usuario desconectado: ${socket.id}`);
    });

});

// Ruta no encontrada
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Página no encontrada."
    });
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`
╔════════════════════════════════════╗
║        🌸 AngelSpace Server 🌸      ║
╠════════════════════════════════════╣
║ Estado : Online                   ║
║ Puerto : ${PORT}
║ Modo   : ${process.env.NODE_ENV}
╚════════════════════════════════════╝
`);
});