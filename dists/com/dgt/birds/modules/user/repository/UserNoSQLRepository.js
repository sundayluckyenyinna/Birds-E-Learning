"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
(0, common_1.Injectable)();
class UserNoSQLRepository {
    async createUser(user) {
        return Promise.resolve(undefined);
    }
}
exports.default = UserNoSQLRepository;
//# sourceMappingURL=UserNoSQLRepository.js.map