"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const WebRequest_1 = require("./WebRequest");
class WebRequestBuilder {
    constructor() {
        this.url = (url) => { this.webRequest.url = url; return this; };
        this.method = (method) => { this.webRequest.method = method; return this; };
        this.headers = (headers) => { this.webRequest.headers = headers; return this; };
        this.body = (body) => { this.webRequest.body = body; return this; };
        this.queryParams = (queryParams) => { this.webRequest.queryParams = queryParams; return this; };
        this.build = () => this.webRequest;
        this.webRequest = new WebRequest_1.default();
    }
}
exports.default = WebRequestBuilder;
//# sourceMappingURL=WebRequestBuilder.js.map