"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.__prod__ = exports.PORT = void 0;
require("dotenv/config");
exports.PORT = process.env.PORT;
exports.__prod__ = process.env.NODE_ENV === "production";
//# sourceMappingURL=config.js.map