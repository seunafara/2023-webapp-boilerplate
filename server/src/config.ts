import "dotenv/config"
export const PORT = process.env.PORT
export const __prod__ = process.env.NODE_ENV === "production"
