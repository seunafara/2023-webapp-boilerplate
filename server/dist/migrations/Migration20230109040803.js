"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20230109040803 = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20230109040803 extends migrations_1.Migration {
    async up() {
        this.addSql('create table "user" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "email" text not null, "password" text not null);');
        this.addSql('alter table "user" add constraint "user_email_unique" unique ("email");');
    }
}
exports.Migration20230109040803 = Migration20230109040803;
//# sourceMappingURL=Migration20230109040803.js.map