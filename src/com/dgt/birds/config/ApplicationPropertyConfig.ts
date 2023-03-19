/* eslint-disable */
import * as yaml from "js-yaml";
import * as fs from "fs";
import * as path from "path";
import { DynamicModule, Injectable, Logger } from "@nestjs/common";
import * as process from "process";
import { ConfigModule } from "@nestjs/config";
import ZooItemKeeper, { Item } from "./ZooItemKeeper";

@Injectable()
export default class ApplicationPropertyConfig
{

   static logger: Logger = new Logger("Birds-E-Learning");
   static profile: string;
    static ApplicationProperties = (): DynamicModule => {
      return ConfigModule.forRoot({
        load: [ApplicationPropertyConfig.loadPropertiesOrFail],
        isGlobal: true,
        cache: true
      });
  }

  static loadPropertiesOrFail = (): Record<string, any> => {
      const mainResourceYamlFile: string = "application.yml";
      const allResourceFiles: Array<string> = ApplicationPropertyConfig.getAllResources();
      if(!allResourceFiles.includes(mainResourceYamlFile)){
        throw Error('No main resource found: Could not find mandatory application.yaml file!')
      }
      const allYamlFiles: Array<string> = allResourceFiles.filter(file => file.endsWith(".yml"));
      const mainResourceFileDoc: Record<string, any> = ApplicationPropertyConfig.getRecordsFromResourceYamlFile(mainResourceYamlFile);
      const activeProfile: string = mainResourceFileDoc.birds.profiles.active || 'default';
      if(activeProfile === 'default'){
        return mainResourceFileDoc;
      }
      const propertyFilePath: string = ['application', '-', activeProfile.trim(), '.yml'].join('');
      if(!allYamlFiles.includes(propertyFilePath)) {
        throw Error('Could not find property file: '.concat(propertyFilePath).concat(' due to profile: ').concat(activeProfile).concat(' set in ').concat(mainResourceYamlFile).concat(' file'));
      }

      ZooItemKeeper.setItem(Item.ACTIVE_PROFILE, activeProfile);
      ApplicationPropertyConfig.profile = activeProfile;
      return ApplicationPropertyConfig.getRecordsFromResourceYamlFile(propertyFilePath);
  }

  private static getRecordsFromResourceYamlFile = (fileName: string): Record<string, any> => {
      const appConfigRecords: Record<string, any> = yaml.load(fs.readFileSync(ApplicationPropertyConfig
              .getResource(fileName), 'utf8')) as Record<string, any>;
      ZooItemKeeper.setItem(Item.APP_CONFIG, appConfigRecords);
      return appConfigRecords;
  }

  private static getResource = (resourceFile: string) : string => {
      return path.join(ApplicationPropertyConfig.getResourceDir(), resourceFile);
  }
  private static getResourceDir = (): string => {
     return path.join(process.cwd(), 'resources');
  }
  private static getAllResources = () : Array<string> => {
     return fs.readdirSync(ApplicationPropertyConfig.getResourceDir(), 'utf8');
  }

  public static getProperty = (property: string): string => {
      let records: Record<string, any> = ZooItemKeeper.getItem(Item.APP_CONFIG);
      if(records === null || records === undefined || Object.keys(records).length === 0){
        records = ApplicationPropertyConfig.loadPropertiesOrFail();
      }
      const keys: Array<string> = property.trim().split('.');
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

}

interface ConfigModuleOptions {
  load: Record<string, any>,
  cache: boolean,
  isGlobal: boolean
}