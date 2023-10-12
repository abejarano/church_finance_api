import { AggregateRoot } from "../../shared";
import { OptionModuleDTO } from "./types/option-module.type";

export class SystemModule extends AggregateRoot {
  private id?: string;
  private name: string;
  private description: string;
  private isActive: boolean;
  private createdAt: Date;
  private options: OptionModuleDTO[];

  static create(
    name: string,
    description: string,
    isActive: boolean,
    createdAt: Date,
    options: OptionModuleDTO[],
  ): SystemModule {
    const systemModule = new SystemModule();
    systemModule.name = name;
    systemModule.description = description;
    systemModule.isActive = isActive;
    systemModule.createdAt = createdAt;
    systemModule.options = options;
    return systemModule;
  }

  getName(): string {
    return this.name;
  }
  addOption(option: OptionModuleDTO): SystemModule {
    this.options.push(option);
    return this;
  }

  getId(): string {
    return this.id;
  }

  static fromPrimitives(plainData: any): SystemModule {
    const systemModule = new SystemModule();
    systemModule.id = plainData.id;
    systemModule.name = plainData.name;
    systemModule.description = plainData.description;
    systemModule.isActive = plainData.isActive;
    systemModule.createdAt = plainData.createdAt;
    systemModule.options = plainData.options;
    return systemModule;
  }

  toPrimitives(): any {
    return {
      name: this.name,
      description: this.description,
      isActive: this.isActive,
      createdAt: this.createdAt,
      options: this.options,
    };
  }
}
