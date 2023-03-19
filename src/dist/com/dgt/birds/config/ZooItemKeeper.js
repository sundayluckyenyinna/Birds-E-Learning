"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Item = void 0;
class ZooItemKeeper {
}
exports.default = ZooItemKeeper;
ZooItemKeeper.entries = new Map();
ZooItemKeeper.setItem = (item, value) => {
    ZooItemKeeper.entries.set(item, value);
};
ZooItemKeeper.getItem = (item) => ZooItemKeeper.entries.get(item);
var Item;
(function (Item) {
    Item[Item["TEMPLATE"] = 0] = "TEMPLATE";
    Item[Item["APP_CONFIG"] = 1] = "APP_CONFIG";
    Item[Item["MESSAGE_SOURCE"] = 2] = "MESSAGE_SOURCE";
    Item[Item["ACTIVE_PROFILE"] = 3] = "ACTIVE_PROFILE";
})(Item = exports.Item || (exports.Item = {}));
//# sourceMappingURL=ZooItemKeeper.js.map