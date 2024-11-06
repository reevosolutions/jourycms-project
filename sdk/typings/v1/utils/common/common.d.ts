declare module Levelup {
  namespace CMS {
    namespace V1 {
      namespace Utils {
        namespace Common {
          type ID = string;
          type TrackingID = string;
          type Code = string;
          type LetterCode = string;
          type NumberCode = string;
          type LocationAdministrativeCode = string;
          type Slug = string;
          type Name = string;
          type Time = `${string}:${string}`;
          /**
           * @description Location [longitude, latitude]
           */
          type Location = [number, number];
          type FileAttribute = {
            id: string | null;
            url: string | null;
          } | null;

          type TLabelValue<T = string> = {
            value: T;
            label: string;
          }

          type SocialNetworks =
            | "facebook"
            | "youtube"
            | "linkedin"
            | "instagram"
            | "viber"
            | "whatsapp"
            | "twitter"
            | "reddit"
            | "tiktok"
            | "snapchat";

          export type TDay =
            | "sunday"
            | "monday"
            | "tuesday"
            | "wednesday"
            | "thursday"
            | "friday"
            | "saturday";
        }
      }
    }
  }
}
