import { AggregateRoot } from "../../Shared/domain";
import { OptionModuleDTO } from "./types/option-module.type";
import { IdentifyEntity } from "../../Shared/adapter";

export class SystemModule extends AggregateRoot {
  private id?: string;
  private systemModuleId: string;
  private name: string;
  private description: string;
  isActive: boolean;
  private createdAt: Date;
  private options?: OptionModuleDTO[];

  static create(
    name: string,
    description: string,
    isActive: boolean,
  ): SystemModule {
    const systemModule = new SystemModule();
    systemModule.name = name;
    systemModule.description = description;
    systemModule.isActive = isActive;
    systemModule.createdAt = new Date();

    systemModule.systemModuleId = IdentifyEntity.get();
    return systemModule;
  }

  setDescription(description: string): SystemModule {
    this.description = description;
    return this;
  }

  setName(name: string): SystemModule {
    this.name = name;
    return this;
  }

  getName(): string {
    return this.name;
  }

  addOrUpdateOption(option: OptionModuleDTO): OptionModuleDTO {
    if (!this.options) {
      const o = { ...option, optionModuleId: IdentifyEntity.get() };
      this.options = [o];
      return o;
    }

    const optionFound = this.options.find(
      (optionModule) => optionModule.optionModuleId === option.optionModuleId,
    );

    if (optionFound) {
      optionFound.description = option.description;
      optionFound.isActive = option.isActive;
      optionFound.name = option.name;
      return optionFound;
    }

    const o = { ...option, optionModuleId: IdentifyEntity.get() };
    this.options.push(o);

    return o;
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

  getOptionModule(): OptionModuleDTO[] {
    return this.options;
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
    systemModule.systemModuleId = plainData.systemModuleId;

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
