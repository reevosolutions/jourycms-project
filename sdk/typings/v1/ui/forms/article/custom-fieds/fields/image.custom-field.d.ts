declare module Levelup {

  namespace CMS {
    namespace V1 {
      export namespace UI {
        export namespace Forms {
          export namespace CustomFields {
            export namespace ImageField {

              export type Key = "image";

              export type Input<IsMulti extends boolean = false> = IsMulti extends true ? Utils.Common.FileAttribute[] : Utils.Common.FileAttribute | null;

              export type Output<IsMulti extends boolean = false> = IsMulti extends true ? Utils.Common.FileAttribute[] : Utils.Common.FileAttribute | null;

              export type Options<IsMulti extends boolean = false> = BaseFieldOption<Input, IsMulti> & {
                multiple: IsMulti;
              }
            }
          }
        }
      }
    }
  }
}