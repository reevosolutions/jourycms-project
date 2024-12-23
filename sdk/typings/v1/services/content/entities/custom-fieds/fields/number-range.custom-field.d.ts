declare module Levelup {

  namespace CMS {
    namespace V1 {
        export namespace Content {
          export namespace CustomFields {
            export namespace NumberField {

              export type Key = "number_range";

              export type Input = {
                start: number | null;
                end: number | null;
              } | null;

              export type Output = Input;

              export type Options = BaseFieldOption<Input, false> & {
                min: number;
                max: number;
              }
            }
          }
        }
      }
    }
  }