

declare module JouryCMS {
  export namespace Theme {
    export type LayoutProps = {
      route: Levelup.CMS.V1.UI.Routes.RouteItem;
      children: React.ReactNode;
    }
  }
}