"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.__prod__ = exports.DB_NAME = exports.DB_ENGINE = exports.PORT = void 0;
require("dotenv/config");
exports.PORT = process.env.PORT;
exports.DB_ENGINE = process.env.DB_ENGINE;
exports.DB_NAME = process.env.DB_NAME;
exports.__prod__ = process.env.NODE_ENV === "production";
//# sourceMappingURL=config.js.map