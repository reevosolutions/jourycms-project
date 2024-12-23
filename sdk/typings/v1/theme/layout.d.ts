

declare module JouryCMS {
  export namespace Theme {
    export type LayoutProps = {
      route: Levelup.CMS.V1.UI.Routes.RouteItem;
      headerControls?: {
        path?: string;
        onClick?: ()=>void | PromiseLike<void>;
        title: string;
        icon?: Levelup.CMS.V1.UI.IconType;
        ac?: ()=>boolean;
      }[]
      children: React.ReactNode;
      className?: string;
    }
  }
}