function filterRoutes(
  routes: { [key: string]: Levelup.CMS.V1.UI.Admin.RouteItem },
  config: {
    extensions: string[];
    user?: Levelup.CMS.V1.Users.Entity.ExposedUser;
  },
): { [key: string]: Levelup.CMS.V1.UI.Admin.RouteItem } {
  const filteredRoutes: { [key: string]: Levelup.CMS.V1.UI.Admin.RouteItem } =
    {};

  for (const [key, route] of Object.entries(routes)) {
    const isDynamic = route.path.includes("/:"); // Skip dynamic routes
    if(isDynamic) continue;
    // Check if `hideOnMenu` is true or if any custom function in `ac` returns false
    const hasAccess = route.ac.every(
      accessCondition =>
        typeof accessCondition === "function" ? accessCondition(config) : true, // TODO: Add support 'entity.create' and 'entity.update' permissions
    );

    if (!route.hideOnMenu && hasAccess ) {
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


export default filterRoutes;