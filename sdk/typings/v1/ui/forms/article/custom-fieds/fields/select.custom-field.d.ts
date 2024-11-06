declare module Levelup {

  namespace CMS {
    namespace V1 {
      export namespace UI {
        export namespace Forms {
          export namespace CustomFields {
            export namespace SelectField {


              export type Key = "select";

              export type Input<IsMulti extends boolean = false> = IsMulti extends true ? string[] : string | null;

              export type Output<IsMulti extends boolean = false> = IsMulti extends true ? Utils.Common.TLabelValue[] : Utils.Common.TLabelValue | null;

              export type Options<IsMulti extends boolean = false> = BaseFieldOption<Input<IsMulti>, IsMulti> & {
                multiple?: IsMulti;
                choices: MultiValue<Utils.Common.TLabelValue>
              }
            }
          }
        }
      }
    }
  }
}