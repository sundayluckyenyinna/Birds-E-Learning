export default class MessageSource {
    static prefix: string;
    constructor();
    getMessageRecords: () => Record<string, any>;
    getMessage: (code: string) => string;
    getRawMessage: (messagePath: string) => string;
    static getMessage: (code: string) => string;
}
