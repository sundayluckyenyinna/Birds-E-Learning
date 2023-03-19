"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var MessageSource_1;
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const yaml = require("js-yaml");
const path = require("path");
const process = require("process");
const fs = require("fs");
const ZooItemKeeper_1 = require("./ZooItemKeeper");
let MessageSource = MessageSource_1 = class MessageSource {
    constructor() {
        this.getMessageRecords = () => {
            let records = ZooItemKeeper_1.default.getItem(ZooItemKeeper_1.Item.MESSAGE_SOURCE);
            if (records === null || records === undefined || Object.keys(records).length === 0) {
                const messageYamlFile = path.join(process.cwd(), 'resources', 'messages', 'messages.yml');
                records = yaml.load(fs.readFileSync(messageYamlFile, 'utf8'), {});
            }
            return records;
        };
        this.getMessage = (code) => {
            return this.getMessageRecords()[MessageSource_1.prefix.concat(code)];
        };
        this.getRawMessage = (messagePath) => {
            let records = this.getMessageRecords();
            const keys = messagePath.trim().split('.');
            let currentValue = undefined;
            for (let i = 0; i < keys.length; i++) {
                const currentKey = keys[i];
                currentValue = records[currentKey];
                if (typeof currentValue !== 'object' || currentValue === undefined)
                    break;
                records = currentValue;
            }
            if (typeof currentValue === 'object')
                return undefined;
            return currentValue;
        };
    }
};
MessageSource.prefix = "E";
MessageSource.getMessage = (code) => {
    const messageSource = new MessageSource_1();
    return messageSource.getMessage(MessageSource_1.prefix.concat(code));
};
MessageSource = MessageSource_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], MessageSource);
exports.default = MessageSource;
//# sourceMappingURL=MessageSource.js.map