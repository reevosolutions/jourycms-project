declare module Levelup {

  namespace CMS {
    namespace V1 {
      export namespace Content {
        export namespace CustomFields {
          export namespace RichTextField {

            export type Key = "rich_text";

            export type Input = string | null;

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