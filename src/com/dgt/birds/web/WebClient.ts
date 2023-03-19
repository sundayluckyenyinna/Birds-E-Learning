/* eslint-disable */

import WebRequest from "./WebRequest";
import { WebResponse } from "./WebResponse";
import axios from "axios";
import WebRequestBuilder from "./WebRequestBuilder";

export default class WebClient
{
    private request: WebRequest;
    constructor() {
    }
    static  webRequest = (webRequest: WebRequest): WebClient => {
        const client: WebClient = new WebClient();
        client.request = webRequest;
        return client;
    }
    async connect(): Promise<WebResponse> {
        return await axios({
            url: this.request.url,
            method: this.request.method,
            headers: this.request.headers,
            data: this.request.body,
            params: this.request.queryParams
        }) as WebResponse;
    }
}
