import express from "express";

const router = express.Router();

// Panel principal
router.get("/dashboard", (req, res) => {
    res.json({
        success: true,
        message: "Panel de administración"
    });
});

// Lista de usuarios
router.get("/users", (req, res) => {
    res.json({
        success: true,
        message: "Lista de usuarios"
    });
});

// Eliminar usuario
router.delete("/user/:id", (req, res) => {
    res.json({
        success: true,
        message: `Usuario ${req.params.id} eliminado`
    });
});

// Eliminar publicación
router.delete("/post/:id", (req, res) => {
    res.json({
        success: true,
        message: `Post ${req.params.id} eliminado`
    });
});

// Eliminar comentario
router.delete("/comment/:id", (req, res) => {
    res.json({
        success: true,
        message: `Comentario ${req.params.id} eliminado`
    });
});

// Banear usuario
router.post("/ban", (req, res) => {
    res.json({
        success: true,
        message: "Usuario baneado"
    });
});

// Desbanear usuario
router.post("/unban", (req, res) => {
    res.json({
        success: true,
        message: "Usuario desbaneado"
    });
});

// Destacar publicación
router.post("/feature", (req, res) => {
    res.json({
        success: true,
        message: "Publicación destacada"
    });
});

// Reportes
router.get("/reports", (req, res) => {
    res.json({
        success: true,
        message: "Lista de reportes"
    });
});

export default router;