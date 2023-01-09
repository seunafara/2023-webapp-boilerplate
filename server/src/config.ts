import "dotenv/config"
export const PORT = process.env.PORT
export const DB_ENGINE = process.env.DB_ENGINE
export const DB_NAME = process.env.DB_NAME
export const __prod__ = process.env.NODE_ENV === "production"
