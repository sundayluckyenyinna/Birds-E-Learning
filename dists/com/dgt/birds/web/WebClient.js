"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
class WebClient {
    constructor() {
    }
    async connect() {
        return await (0, axios_1.default)({
            url: this.request.url,
            method: this.request.method,
            headers: this.request.headers,
            data: this.request.body,
            params: this.request.queryParams
        });
    }
}
exports.default = WebClient;
WebClient.webRequest = (webRequest) => {
    const client = new WebClient();
    client.request = webRequest;
    return client;
};
//# sourceMappingURL=WebClient.js.map