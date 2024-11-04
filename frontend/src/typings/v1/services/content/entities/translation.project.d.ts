declare module Levelup {
  namespace CMS {
    namespace V1 {
      namespace Content {
        /**
         * SubDomain Translation
         */
        export namespace Translation {
          /**
           * @description Service Entity
           */
          export namespace Entity {
            export type TLanguageCode =
              | "zh"
              | "es"
              | "en"
              | "hi"
              | "ar"
              | "bn"
              | "pt"
              | "ru"
              | "ja"
              | "de"
              | "ko"
              | "fr"
              | "tr"
              | "vi"
              | "ur"
              | "it"
              | "th"
              | "gu"
              | "pl"
              | "uk"
              | "ro"
              | "nl"
              | "el"
              | "sv"
              | "sr"
              | "hu"
              | "fa"
              | "cs"
              | "fi"
              | "sk"
              | "da"
              | "bg"
              | "no"
              | "he"
              | "id"
              | "ms"
              | "lv"
              | "lt"
              | "et"
              | "hr"
              | "sl"
              | "mt"
              | "is"
              | "ga"
              | "mk"
              | "cy"
              | "ne"
              | "ml"
              | "kn"
              | "mr"
              | "ta"
              | "te"
              | "pa"
              | "sw"
              | "ka"
              | "am"
              | "ti"
              | "xh"
              | "zu"
              | "yi"
              | "so"
              | "sn"
              | "ny"
              | "st"
              | "tn"
              | "ts"
              | "ss"
              | "ve"
              | "nr";

            export interface Project
              extends Utils.Entity.General.ICreatable,
                Utils.Entity.General.IHasSearchMeta {
              _id: Utils.Common.ID;
              name: string;
              description: string;
              languages: LanguageCode[];
              default_language: LanguageCode;
            }
          }
        }
      }
    }
  }
}
