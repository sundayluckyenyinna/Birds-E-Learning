/** eslint-disable */

export default class ZooItemKeeper
{
  private static entries: Map<Item, any> = new Map<Item, object>();
  static setItem = (item: Item, value: any): void => {
    ZooItemKeeper.entries.set(item, value);
  }
  static getItem = (item: Item): any => ZooItemKeeper.entries.get(item);
}

export enum Item{
    TEMPLATE,
    APP_CONFIG,
    MESSAGE_SOURCE,
    ACTIVE_PROFILE,
}