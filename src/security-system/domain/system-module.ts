import { AggregateRoot, IdentifyEntity } from "../../shared";
import { OptionModuleDTO } from "./types/option-module.type";
import * as console from "console";

export class SystemModule extends AggregateRoot {
  private id?: string;
  private systemModuleId: string;
  private name: string;
  private description: string;
  isActive: boolean;
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
    systemModule.systemModuleId = IdentifyEntity.get();
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

  disable(): SystemModule {
    this.isActive = false;
    return this;
  }

  enable(): SystemModule {
    this.isActive = true;
    return this;
  }

  deleteOption(optionName: string): SystemModule {
    this.options = this.options.filter((option) => option.name !== optionName);
    return this;
  }

  disableOption(optionName: string): SystemModule {
    this.options = this.options.map((option) => {
      if (option.name === optionName) {
        option.isActive = false;
      }
      return option;
    });
    return this;
  }

  enableOption(optionName: string): SystemModule {
    this.options = this.options.map((option) => {
      if (option.name === optionName) {
        option.isActive = true;
      }
      return option;
    });
    return this;
  }

  findOption(optionName: string): OptionModuleDTO | undefined {
    return this.options.find((option) => option.name === optionName);
  }

  getSystemModuleId(): string {
    return this.systemModuleId;
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
      systemModuleId: this.systemModuleId,
      name: this.name,
      description: this.description,
      isActive: this.isActive,
      createdAt: this.createdAt,
      options: this.options,
    };
  }
}
