declare module Levelup {
  namespace CMS {
    namespace V1 {
      export namespace UI {
        export namespace Admin {
          type IconType = (props: {
            className?: string | undefined;
            height?: number | string | undefined;
            id?: string | undefined;
            lang?: string | undefined;
            max?: number | string | undefined;
            media?: string | undefined;
            method?: string | undefined;
            min?: number | string | undefined;
            name?: string | undefined;
            style?: CSSProperties | undefined;
            target?: string | undefined;
            type?: string | undefined;
            width?: number | string | undefined;
            children?: React.ReactNode;
            size?: string | number;
            color?: string;
            title?: string;
          }) => JSX.Element;

          type TACAction = "read" | "create" | "update" | "delete" | "manage";

          type TMenuSlotName = "articleTypes";
          type TMenuSlotResultReturnType = {
            [id: string]: Levelup.CMS.V1.UI.Admin.RouteItem;
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
