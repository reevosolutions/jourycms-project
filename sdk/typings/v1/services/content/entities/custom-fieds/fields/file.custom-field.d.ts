
declare module Levelup {

  namespace CMS {
    namespace V1 {
        export namespace Content {
          export namespace CustomFields {
            export namespace FileField {

              export type Key = "file";

              export type Input<IsMulti extends boolean = false> = IsMulti extends true ? Utils.Common.FileAttribute[] : Utils.Common.FileAttribute | null;

              export type Output<IsMulti extends boolean = false> = IsMulti extends true ? Utils.Common.FileAttribute[] : Utils.Common.FileAttribute | null;

              export type Options<IsMulti extends boolean = false> = BaseFieldOption<Input, IsMulti> & {
                multiple: IsMulti;
                accept: ("text" | "audio" | "excel" | "word" | "pdf" | "images" | "videos" | "compressed")[]
              }
            }
          }
        }
      }
    }
  }