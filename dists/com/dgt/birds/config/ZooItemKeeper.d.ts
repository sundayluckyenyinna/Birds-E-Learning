export default class ZooItemKeeper {
    private static entries;
    static setItem: (item: Item, value: any) => void;
    static getItem: (item: Item) => any;
}
export declare enum Item {
    TEMPLATE = 0,
    APP_CONFIG = 1,
    MESSAGE_SOURCE = 2,
    ACTIVE_PROFILE = 3
}
