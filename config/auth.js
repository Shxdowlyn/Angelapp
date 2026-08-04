import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

// Crear token
export function createToken(user) {

    return jwt.sign(
        {
            id: user._id,
            username: user.username
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRES || "7d"
        }
    );

}

// Verificar token
export function verifyToken(token) {

    return jwt.verify(
        token,
        process.env.JWT_SECRET
    );

}

// Hashear contraseña
export async function hashPassword(password) {

    return await bcrypt.hash(
        password,
        SALT_ROUNDS
    );

}

// Comparar contraseña
export async function comparePassword(password, hash) {

    return await bcrypt.compare(
        password,
        hash
    );

}