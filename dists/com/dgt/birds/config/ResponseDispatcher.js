"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
class ResponseDispatcher {
}
exports.default = ResponseDispatcher;
ResponseDispatcher.respond = (response, responseDto) => {
    return response.status(responseDto.httpStatus || common_1.HttpStatus.OK).json(responseDto);
};
//# sourceMappingURL=ResponseDispatcher.js.map