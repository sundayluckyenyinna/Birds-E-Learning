import WebRequestBuilder from "./WebRequestBuilder";
export default class WebRequest {
    url: string;
    method: string;
    headers: object;
    body: object;
    queryParams: object;
    constructor();
    static builder: () => WebRequestBuilder;
}
