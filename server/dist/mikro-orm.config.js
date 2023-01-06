"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./config");
const index_1 = __importDefault(require("./entities/index"));
const path_1 = __importDefault(require("path"));
exports.default = {
    migrations: {
        path: path_1.default.join(__dirname, "./migrations"),
        pathTs: path_1.default.join(__dirname, "./migrations"),
        glob: "!(*.d).{js,ts}",
    },
    entities: index_1.default,
    dbName: "webapp2",
    debug: !config_1.__prod__,
    type: "postgresql",
    allowGlobalContext: true,
};
//# sourceMappingURL=mikro-orm.config.js.map