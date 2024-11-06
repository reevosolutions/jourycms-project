declare module Levelup {

  namespace CMS {
    namespace V1 {
      export namespace UI {
        export namespace Forms {
          export namespace CustomFields {
            export namespace NumberField {

              export type Key = "number";

              export type Input = number | null;

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
}