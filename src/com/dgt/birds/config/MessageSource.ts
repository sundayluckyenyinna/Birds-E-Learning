/* eslint-disable */
import { Injectable } from "@nestjs/common";
import * as yaml from "js-yaml";
import * as path from "path";
import * as process from "process";
import * as fs from "fs";
import ZooItemKeeper, { Item } from "./ZooItemKeeper";


@Injectable()
export default class MessageSource
{

   static prefix: string = "E";
   constructor() {}

   /**
    * Returns the record data structure from a given yaml file. In this case, the yaml file contains the messages
    * for the whole application.
    */
   public getMessageRecords = () : Record<string, any> => {
      let records: Record<string, any> = ZooItemKeeper.getItem(Item.MESSAGE_SOURCE);
      if(records === null || records === undefined || Object.keys(records).length === 0){
         const messageYamlFile : string = path.join(process.cwd(), 'resources', 'messages', 'messages.yml');
         records = yaml.load(fs.readFileSync(messageYamlFile, 'utf8'), {}) as Record<string, any>;
      }
      return records;
   }

   /**
    * Returns a specific message from the records obtained in the given yaml file.
    * @param code
    */
   public getMessage = (code: string): string => {
      return this.getMessageRecords()[MessageSource.prefix.concat(code)];
   }

   public getRawMessage = (messagePath: string): string => {
      let records = this.getMessageRecords();
      const keys: Array<string> = messagePath.trim().split('.');
      let currentValue: string | undefined = undefined;
      for(let i = 0; i < keys.length; i++){
         const currentKey: string = keys[i];
         currentValue = records[currentKey];
         if(typeof currentValue !== 'object' || currentValue === undefined)
            break;
         records = currentValue;
      }
      if(typeof currentValue === 'object')
         return undefined;
      return currentValue;
   }

   /**
    * Returns a message from a given yaml file for non-injectable classes or services.
    * @param code
    */
   public static getMessage = (code: string): string => {
      const messageSource: MessageSource = new MessageSource();
      return messageSource.getMessage(MessageSource.prefix.concat(code));
   }
}