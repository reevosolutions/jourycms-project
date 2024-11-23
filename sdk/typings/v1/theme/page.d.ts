

declare module JouryCMS {
  export namespace Theme {
    export type PageProps = {
      route: Levelup.CMS.V1.UI.Routes.RouteItem;
      headerControls?: {
        path?: string;
        onClick?: ()=>void | PromiseLike<void>;
        title: string;
        icons?: Levelup.CMS.V1.UI.IconType
      }[]
    }
  }
}