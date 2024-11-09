declare module Levelup {

  namespace CMS {
    namespace V1 {
        export namespace Content {
          export namespace CustomFields {
            export namespace DateRangeField {

              export type Key = "date_range";

              export type Input = {
                start: Date | null;
                end: Date | null;
              } | null;

              export type Output = Input;

              export type Options = BaseFieldOption<Input, false> & {};
            }
          }
        }
      }
    }
  }