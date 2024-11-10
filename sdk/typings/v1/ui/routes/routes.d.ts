declare module Levelup {
  namespace CMS {
    namespace V1 {
      export namespace UI {
        export namespace Routes {

          type TACAction = "read" | "create" | "update" | "delete" | "manage";

          type TMenuSlotName = "articleTypes";
          type TMenuSlotResultReturnType = {
            [id: string]: Levelup.CMS.V1.UI.Routes.RouteItem;
          };
          type TMenuSlotResultFunction<T extends TMenuSlotName> =
            T extends "articleTypes"
            ? (
              types: Levelup.CMS.V1.Content.Entity.ArticleType[],
            ) => Promise<TMenuSlotResultReturnType>
            : () => Promise<TMenuSlotResultReturnType>;

          type TMenuSlot<T extends TMenuSlotName> = () => {
            slot: T;
            result: TMenuSlotResultFunction<T>;
          };

          type RouteItem = {
            path: `/${string}`;
            title: string;
            menuTitle?: string;
            icon?: IconType;
            ac: (
              | `${string}.${TACAction}`
              | ((config: { extensions: string[] }) => boolean)
            )[];
            tutorialLink?: string;
            description?: string;
            hideOnMenu?: boolean;
            isNew?: boolean;
            isUpdated?: boolean;
            _?: {
              [Key: string]: RouteItem;
            };
            // placeholder?: SubroutesPlaceholder;
          };

          // type RouteSlot = (entity: string) =>

          type RouteItems = {
            [id: string]: RouteItem | TMenuSlot<TMenuSlotName>;
          };
        }
      }
    }
  }
}
