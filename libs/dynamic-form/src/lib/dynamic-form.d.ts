type locale = string;

interface DynamicFormConfig {
  fields: Field[];
  values?: { [key: string]: any };
  // form?: any;
  locales: locale[];
}

interface FieldParent {
  key: string;
  values: any[] | boolean;
  fromParent?: boolean;
}

interface FieldValidation {
  required?: boolean;
  min?: any;
  max?: any;
  minLength?: any;
  maxLength?: any;
  pattern?: string;
  minItems?: number;
  maxItems?: number;
  allowedTypes?: string[];
}
interface FieldOptions {
  title: string;
  key: string;
  selected?: boolean;
  tooltip?: string;
  color?: string;
  hidden?: boolean;
}

type FieldTypes =
  | TextFieldTypes
  | 'textarea'
  | 'dropdown'
  | 'checkbox'
  | 'checkbox-group'
  | 'group'
  | 'repeater'
  | 'relation'
  | 'date-time'
  | 'radio'
  | 'action';

interface _FieldBase<T> {
  /* Basics */
  type: FieldTypes;
  key: string;
  title: string;
  description?: string;
  placeholder?: string;
  hint?: string;
  disabled?: boolean;
  hidden?: boolean;
  /* Advanced */
  value?: T;
  defaultValue?: T;
  // tab?: string;
  localize?: boolean;
  validation?: FieldValidation;
  parent?: FieldParent;
  /* Functions */
  asyncCondition?: (form?: any) => any;
}

/* Fields */

type TextFieldTypes =
  | 'text'
  | 'email'
  | 'tel'
  | 'number'
  | 'password'
  | 'search'
  | 'url';
interface TextField extends _FieldBase<string> {
  type: TextFieldTypes;
}
interface TextareaField extends _FieldBase<string> {
  type: 'textarea';
  layout?: 'textarea' | 'editable-div' | 'markdown';
}
interface ActionField extends _FieldBase<string> {
  type: 'action';
  attributes: any;
  button: string;
  events: {
    click: (attributes: any, prev: any) => Promise<{ data: string }>;
  };
}

interface DropdownField extends _FieldBase<string> {
  type: 'dropdown';
  options: FieldOptions[];
}

interface GroupField extends _FieldBase<object> {
  type: 'group';
  fields: () => Field[] | Field[];
}
interface RepeaterField extends _FieldBase<object[]> {
  type: 'repeater';
  fields: () => Field[] | Field[];
}

interface CheckboxField extends _FieldBase<boolean> {
  type: 'checkbox';
}
interface CheckboxGroupField extends _FieldBase<string[]> {
  type: 'checkbox-group';
  options: FieldOptions[];
}

interface RelationItem {
  key: string;
  title: string;
  typeName?: string;
}
interface RelationField extends _FieldBase<string[]> {
  type: 'relation';
  items: RelationItem[];
  actions?: {
    loadmore: () => void;
  };
}

type Field =
  | TextField
  | TextareaField
  | DropdownField
  | GroupField
  | RepeaterField
  | RelationField
  | CheckboxField
  | ActionField
  | CheckboxGroupField;
