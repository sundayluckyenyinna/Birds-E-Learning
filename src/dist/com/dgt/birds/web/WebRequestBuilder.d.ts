import WebRequest from "./WebRequest";
export default class WebRequestBuilder {
    private readonly webRequest;
    constructor();
    url: (url: string) => WebRequestBuilder;
    method: (method: string) => WebRequestBuilder;
    headers: (headers: object) => WebRequestBuilder;
    body: (body: object) => WebRequestBuilder;
    queryParams: (queryParams: object) => WebRequestBuilder;
    build: () => WebRequest;
}
