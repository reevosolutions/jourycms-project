declare module Levelup {

	namespace CMS {
		namespace V1 {
			export namespace Content {
				export namespace CustomFields {
					export namespace BooleanField {

						export type Key = "boolean";

						export type Input = boolean;

						export type Output = boolean;

						export type Options = BaseFieldOption<Input, false> & {
						}
					}
				}
			}
		}
	}
}