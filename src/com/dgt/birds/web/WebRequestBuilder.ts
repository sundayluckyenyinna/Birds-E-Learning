/* eslint-disable */

import WebRequest from "./WebRequest";
import WebClient from "./WebClient";

export default class WebRequestBuilder
{
    private readonly webRequest: WebRequest;
    constructor() {
        this.webRequest = new WebRequest();
    }
    url = (url: string): WebRequestBuilder => { this.webRequest.url = url; return this; }
    method = (method: string): WebRequestBuilder => { this.webRequest.method = method; return  this; }
    headers = (headers: object): WebRequestBuilder => { this.webRequest.headers = headers; return  this; }
    body = (body: object): WebRequestBuilder => { this.webRequest.body = body; return this; }
    queryParams = (queryParams: object): WebRequestBuilder => { this.webRequest.queryParams = queryParams; return this; }
    build = (): WebRequest => this.webRequest;
}