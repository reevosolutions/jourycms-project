declare module Levelup {

	namespace CMS {
		namespace V1 {
			export namespace Content {
				export namespace CustomFields {
					export type AnyField = keyof OptionTypes;
					export type FieldType = keyof FilterMenu.OptionTypes;
					export type OptionType<FieldType> = OptionTypes[FieldType];
					type ExtendFieldProps<T> = T &
						Partial<{
						}>;

					type TOperator = 'eq' | 'ne' | 'gt' | 'lt' | 'gte' | 'lte' | 'in' | 'nin' | 'exists' | 'not_empty';
					type TConstraint<Operator extends TOperator> =
						Operator extends 'eq' | 'ne' | 'gt' | 'lt' | 'gte' | 'lte' ? {
							field: string;
							operator: Operator;
							value: any;
						} :
						Operator extends 'in' | 'nin' ? {
							field: string;
							operator: Operator;
							value: any[];
						} :
						Operator extends 'exists' | 'not_empty' ? {
							field: string;
							operator: Operator;
						} :
						never;

					type BaseFieldOption<Input, IsMulti extends boolean = false> = {
						label?: string;
						required?: boolean;
						default_value?: IsMulti extends true ? Utils.Common.MultiValue<Input> : Utils.Common.SingleValue<Input>;
						constraints?: TConstraint<TOperator>[];
					}

					type CustomFieldType =
						| 'article_object'
						| 'boolean'
						| 'checkbox'
						| 'date_range'
						| 'date'
						| 'file'
						| 'image'
						| 'number'
						| 'number_range'
						| 'radiobox'
						| 'select'
						| 'algerian_state'
						| 'algerian_city'
						| 'ksa_city'
						| 'text'
						| 'multiline_text'
						| 'rich_text'
						| 'time';



					type MetaFieldInput<T extends CustomFieldType, IsMulti extends boolean = false> =
						T extends 'article_object' ? ArticleObjectField.Input<IsMulti> :
						T extends 'boolean' ? BooleanField.Input :
						T extends 'checkbox' ? CheckboxField.Input :
						T extends 'date_range' ? DateRangeField.Input :
						T extends 'date' ? DateField.Input :
						T extends 'file' ? FileField.Input<IsMulti> :
						T extends 'image' ? ImageField.Input<IsMulti> :
						T extends 'number' ? NumberField.Input :
						T extends 'number_range' ? NumberRangeField.Input :
						T extends 'radiobox' ? RadioboxField.Input :
						T extends 'select' ? SelectField.Input<IsMulti> :
						T extends 'algerian_state' ? SelectField.Intput<IsMulti> :
						T extends 'algerian_city' ? SelectField.Intput<IsMulti> :
						T extends 'ksa_city' ? SelectField.Intput<IsMulti> :
						T extends 'text' ? TextField.Input :
						T extends 'multiline_text' ? MultiLineTextField.Input :
						T extends 'rich_text' ? RichTextField.Input :
						T extends 'time' ? TimeField.Input :
						never;

					type MetaFieldOutput<T extends CustomFieldType, IsMulti extends boolean = false> =
						T extends 'article_object' ? ArticleObjectField.Output<IsMulti> :
						T extends 'boolean' ? BooleanField.Output :
						T extends 'checkbox' ? CheckboxField.Output :
						T extends 'date_range' ? DateRangeField.Output :
						T extends 'date' ? DateField.Output :
						T extends 'file' ? FileField.Output<IsMulti> :
						T extends 'image' ? ImageField.Output<IsMulti> :
						T extends 'number' ? NumberField.Output :
						T extends 'number_range' ? NumberRangeField.Output :
						T extends 'radiobox' ? RadioboxField.Output :
						T extends 'select' ? SelectField.Output<IsMulti> :
						T extends 'algerian_state' ? SelectField.Output<IsMulti> :
						T extends 'algerian_city' ? SelectField.Output<IsMulti> :
						T extends 'ksa_city' ? SelectField.Output<IsMulti> :
						T extends 'text' ? TextField.Output :
						T extends 'multiline_text' ? MultiLineTextField.Output :
						T extends 'rich_text' ? RichTextField.Output :
						T extends 'time' ? TimeField.Output :
						never;

					type MetaField<T extends CustomFieldType, IsMulti extends boolean = false> = {
						field_key: string;
						field_label: string;
						field_type: T;
						field_options: T extends 'article_object' ? ArticleObjectField.Options<IsMulti> :
						T extends 'boolean' ? BooleanField.Options :
						T extends 'checkbox' ? CheckboxField.Options :
						T extends 'date_range' ? DateRangeField.Options :
						T extends 'date' ? DateField.Options :
						T extends 'file' ? FileField.Options<IsMulti> :
						T extends 'image' ? ImageField.Options<IsMulti> :
						T extends 'number' ? NumberField.Options :
						T extends 'number_range' ? NumberRangeField.Options :
						T extends 'radiobox' ? RadioboxField.Options :
						T extends 'select' ? SelectField.Options<IsMulti> :
						T extends 'algerian_state' ? SelectField.Options<IsMulti> :
						T extends 'algerian_city' ? SelectField.Options<IsMulti> :
						T extends 'ksa_city' ? SelectField.Options<IsMulti> :
						T extends 'text' ? TextField.Options :
						T extends 'multiline_text' ? MultiLineTextField.Options :
						T extends 'rich_text' ? RichTextField.Options :
						T extends 'time' ? TimeField.Options :
						never;
					}



					export namespace Forms {


						export type OnChangeValue<
							Option,
							IsMulti extends boolean
						> = IsMulti extends true ? Utils.Common.MultiValue<Option> : Utils.Common.SingleValue<Option>;


						export type Field<
							T extends keyof OptionTypes,
							IsMulti extends boolean = false
						> =
							| ExtendFieldProps<{
								label: string;
								isMulti?: false;
								value: Utils.Common.SingleValue<OptionType<T>>;
								type: T;
								source?:
								| string[];
							}>
							| ExtendFieldProps<{
								label: string;
								isMulti?: true;
								value: Utils.Common.MultiValue<OptionType<T>>;
								type: T;
								source?:
								| string[];
							}>;

						export type Fields<
							T extends { [field: string]: Field } = { [field: string]: Field }
						> = { [field: string]: Field };

						export type FilterValue<T> = {
							[property in keyof T]: T[property]["value"];
						};

						export type ComponentProps<
							T extends Fields = { [field: string]: Field }
						> = {
							filter: T;
							onChange: (
								value: FilterValue<T>,
								label: {
									[field: string]: {
										label: string;
										value: LabelType;
									};
								}
							) => void;
							type?: TComponentType;
							controlsPosition?: "both" | "bottom" | "top";
							className?: string;
							clearField?: (field: string) => void;
							clearAll?: () => void;
							omitFields?: Array<keyof T>;
						};

						type MetaFieldInputProps<T extends CustomFieldType, IsMulti extends boolean = false> = {
							label: string;
							required: MetaField<T, IsMulti>['field_options']['required'];
							default_value: MetaField<T, IsMulti>['field_options']['default_value'] | null;
							options: MetaField<T, IsMulti>['field_options'];
							value: MetaFieldInput<T, IsMulti>;
							onChange: (value: MetaFieldInput<T, IsMulti>) => void | PromiseLike<void>;
							metaData: {
								[key: string]: any;
							};
						}
					}
				}
			}
		}
	}
}

