declare module Levelup {

  namespace CMS {
    namespace V1 {
        export namespace Content {
          export namespace CustomFields {
            export namespace DateField {

              export type Key = "date";

              export type Input = Date | null;

              export type Output = Input;

              export type Options = BaseFieldOption<Input, false> & {};
            }
          }
        }
      }
    }
  }