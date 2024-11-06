import { adminRoutes } from "@/config";

export function filterRoutes(
  routes: { [key: string]: Levelup.CMS.V1.UI.Routes.RouteItem },
  config: {
    extensions: string[];
    user?: Levelup.CMS.V1.Users.Entity.ExposedUser;
  },
): { [key: string]: Levelup.CMS.V1.UI.Routes.RouteItem } {
  const filteredRoutes: { [key: string]: Levelup.CMS.V1.UI.Routes.RouteItem } =
    {};

  for (const [key, route] of Object.entries(routes)) {
    const isDynamic = route.path.includes("/:"); // Skip dynamic routes
    if (isDynamic) continue;
    // Check if `hideOnMenu` is true or if any custom function in `ac` returns false
    const hasAccess = route.ac.every(
      accessCondition =>
        typeof accessCondition === "function" ? accessCondition(config) : true, // TODO: Add support 'entity.create' and 'entity.update' permissions
    );

    if (!route.hideOnMenu && hasAccess) {
      // Recursively filter child routes if `_` property exists
      const children = route._ ? filterRoutes(route._, config) : undefined;

      filteredRoutes[key] = {
        ...route,
        ...(children && Object.keys(children).length > 0
          ? { _: children }
          : {}),
      };
    }
  }

  return filteredRoutes;
}



export const getRouteTree = (childNode: Levelup.CMS.V1.UI.Routes.RouteItem, customRoutes: Levelup.CMS.V1.UI.Routes.RouteItems) => {
  const findParents = (currentNode: Levelup.CMS.V1.UI.Routes.RouteItem, path: Levelup.CMS.V1.UI.Routes.RouteItem[] = []): Levelup.CMS.V1.UI.Routes.RouteItem[] | null => {
    const currentPath = [...path, currentNode];
    if (currentNode?.path === childNode.path) {
      return currentPath;
    }
    if (currentNode?._) {
      for (const key in currentNode._) {
        const child = currentNode._[key];
        const found = findParents(child, currentPath);
        if (found) {
          return found;
        }
      }
    }
    return null;
  };

  const result: Levelup.CMS.V1.UI.Routes.RouteItem[][] = [];

  if (!childNode) return [];

  const routes = customRoutes;

  for (const key in routes) {
    const found = findParents((routes as any)[key]);
    if (found) {
      result.push(found);
    }
  }

  return result[0] || [];
};


export const setPathParams = (path: string, params?: { [K: string]: string | null | undefined }) => {
  if (!Object.keys(params || {})) return path;
  return Object.keys(params || {}).reduce((prev, curr) => prev.replaceAll(`:${curr}`, (params as any)[curr]), path);
};

