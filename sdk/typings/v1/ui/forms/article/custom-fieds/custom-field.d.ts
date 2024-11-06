declare module Levelup {

	namespace CMS {
		namespace V1 {
			export namespace UI {
				export namespace Forms {
					export namespace CustomFields {

						export type AnyField = keyof OptionTypes;
						export type FieldType = keyof FilterMenu.OptionTypes;
						export type OptionType<FieldType> = OptionTypes[FieldType];


						export type OnChangeValue<
							Option,
							IsMulti extends boolean
						> = IsMulti extends true ? MultiValue<Option> : SingleValue<Option>;

						type ExtendFieldProps<T> = T &
							Partial<{
								role_group:
								| Levelup.CMS.V1.Auth.Entity.TRoleGroup
								| Levelup.CMS.V1.Auth.Entity.TRoleGroup[];
							}>;

						export type Field<
							T extends keyof OptionTypes,
							IsMulti extends boolean = false
						> =
							| ExtendFieldProps<{
								label: string;
								isMulti?: false;
								value: SingleValue<OptionType<T>>;
								type: T;
								source?:
								| "companies"
								| "offices"
								| "users"
								| "deliverers"
								| "roles"
								| "permissions"
								| "productCategories"
								| "warehouses"
								| "vehicleTypes"
								| "stores"
								| string[];
							}>
							| ExtendFieldProps<{
								label: string;
								isMulti?: true;
								value: MultiValue<OptionType<T>>;
								type: T;
								source?:
								| "companies"
								| "offices"
								| "users"
								| "deliverers"
								| "roles"
								| "permissions"
								| "productCategories"
								| "warehouses"
								| "vehicleTypes"
								| "stores"
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





						export type SingleValue<Option> = Option | null;
						export type MultiValue<Option> = Option[];




						type BaseFieldOption<Input, IsMulti extends boolean = false> = {
							label?: string;
							required?: boolean;
							default_value?: IsMulti extends true ? MultiValue<Input> : SingleValue<Input>;
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
							| 'radiobox'
							| 'select'
							| 'text'
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
							T extends 'radiobox' ? RadioboxField.Input :
							T extends 'select' ? SelectField.Input<IsMulti> :
							T extends 'text' ? TextField.Input :
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
							T extends 'radiobox' ? RadioboxField.Output :
							T extends 'select' ? SelectField.Output<IsMulti> :
							T extends 'text' ? TextField.Output :
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
							T extends 'radiobox' ? RadioboxField.Options :
							T extends 'select' ? SelectField.Options<IsMulti> :
							T extends 'text' ? TextField.Options :
							T extends 'time' ? TimeField.Options :
							never;
						}

						type MetaFieldInputProps<T extends CustomFieldType, IsMulti extends boolean = false> = {
							label: string;
							required: MetaField<T, IsMulti>['field_options']['required'];
							default_value: MetaField<T, IsMulti>['field_options']['default_value'] | null;
							options: MetaField<T, IsMulti>['field_options'];
							value: MetaFieldInput<T, IsMulti>;
							onChange: (value: MetaFieldInput<T, IsMulti>) => void | PromiseLike<void>;
						}
					}
				}
			}
		}
	}
}

