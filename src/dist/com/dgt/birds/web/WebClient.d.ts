import WebRequest from "./WebRequest";
import { WebResponse } from "./WebResponse";
export default class WebClient {
    private request;
    constructor();
    static webRequest: (webRequest: WebRequest) => WebClient;
    connect(): Promise<WebResponse>;
}
