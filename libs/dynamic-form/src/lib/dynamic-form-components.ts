import { ActionComponentConfig } from './action/action.config';
import { CheckboxGroupComponentConfig } from './checkbox-group/checkbox-group.config';
import { CheckboxComponentConfig } from './checkbox/checkbox.config';
import { ChipsComponentConfig } from './chips/chips.config';
import { ColorComponentConfig } from './color/color.config';
import { DateComponentConfig } from './date/date.config';
import { DropdownComponentConfig } from './dropdown/dropdown.config';
import { DynamicFormFieldComponentConfig } from './dynamic-form.types';
import { FileComponentConfig } from './file/file.config';
import { GroupComponentConfig } from './group/group.config';
import { InfoComponentConfig } from './info/info.config';
import { MarkdownComponentConfig } from './markdown/markdown.config';
import { RadioComponentConfig } from './radio/radio.config';
import { RepeaterComponentConfig } from './repeater/repeater.config';
import { TextComponentConfigs } from './text/text.config';
import { TextareaComponentConfig } from './textarea/action.config';

export class DynamicFormComponents {
  /* Default components */
  private defaultComponents: DynamicFormFieldComponentConfig[] = [
    ...TextComponentConfigs,
    TextareaComponentConfig,
    RepeaterComponentConfig,
    GroupComponentConfig,
    ActionComponentConfig,
    CheckboxComponentConfig,
    CheckboxGroupComponentConfig,
    ChipsComponentConfig,
    ColorComponentConfig,
    DateComponentConfig,
    DropdownComponentConfig,
    FileComponentConfig,
    InfoComponentConfig,
    MarkdownComponentConfig,
    RadioComponentConfig,
  ];

  constructor(private components: DynamicFormFieldComponentConfig[] = []) {}

  public getComponentConfig(key: string): DynamicFormFieldComponentConfig {
    const components = [...this.components, ...this.defaultComponents];
    const keyMatch = components.find((component) => component.key === key);
    if (keyMatch) {
      return keyMatch;
    }
    return null;
  }
}