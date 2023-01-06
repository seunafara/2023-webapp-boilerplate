"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = require("./config");
const core_1 = require("@mikro-orm/core");
const mikro_orm_config_1 = __importDefault(require("./mikro-orm.config"));
const User_1 = require("./entities/User");
const start = async () => {
    const orm = await core_1.MikroORM.init(mikro_orm_config_1.default);
    const app = (0, express_1.default)();
    const user = orm.em.create(User_1.User, {
        email: 'example@test.com',
        password: '12345678'
    });
    console.log(user);
    app.listen(config_1.PORT, () => console.log(`Server started on PORT: ${config_1.PORT}`));
};
start().catch(error => console.log(error));
//# sourceMappingURL=index.js.map