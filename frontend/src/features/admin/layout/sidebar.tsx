"use client";

import React, { useCallback, useEffect, useState } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/customized.sidebar";
import initLogger, { LoggerContext } from "@/lib/logging";
import { adminRoutes } from "@/config";
import mock from "@/lib/mock/generators";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { LuChevronDown } from "react-icons/lu";
import { filterRoutes } from "@/lib/routes";

const logger = initLogger(LoggerContext.COMPONENT, "AdminSidebar");

type Props = {};

const AdminSidebar: React.FC<Props> = () => {
  /* -------------------------------------------------------------------------- */
  /*                                    TOOLS                                   */
  /* -------------------------------------------------------------------------- */
  const router = useRouter();
  /* -------------------------------------------------------------------------- */
  /*                                    STATE                                   */
  /* -------------------------------------------------------------------------- */
  const [routes, setRoutes] = useState<{
    [id: string]: Levelup.CMS.V1.UI.Routes.RouteItem;
  }>({});
  /* -------------------------------------------------------------------------- */
  /*                                   METHODS                                  */
  /* -------------------------------------------------------------------------- */
  const buildMenu = useCallback(async () => {
    logger.value("adminRoutes", adminRoutes);

    let _routes: {
      [id: string]: Levelup.CMS.V1.UI.Routes.RouteItem;
    } = {};

    for (const routeKey of Object.keys(adminRoutes)) {
      if (
        typeof adminRoutes[routeKey as keyof typeof adminRoutes] === "function"
      ) {
        const slotResult: ReturnType<
          Levelup.CMS.V1.UI.Routes.TMenuSlot<Levelup.CMS.V1.UI.Routes.TMenuSlotName>
        > = (adminRoutes[routeKey as keyof typeof adminRoutes] as any)();
        /**
         * Handle the articleTypes slot
         * TODO: Add more slot handlers here
         */
        if (slotResult.slot === "articleTypes") {
          const types =
            mock.content.seedTypes() as Levelup.CMS.V1.Content.Entity.ArticleType[];
          logger.value("seed", types);
          const res = await slotResult.result(types);
          _routes = { ..._routes, ...res };
        }
      } else {
        _routes = {
          ..._routes,
          [routeKey]: adminRoutes[routeKey as keyof typeof adminRoutes] as any,
        };
      }
    }

    /**
     * Check Access Control
     */
    logger.value("_routes", _routes);

    _routes = filterRoutes(_routes, {
      extensions: ["forms"],
    });
    /**
     * Set state object
     */
    setRoutes(_routes);
  }, []);
  /* -------------------------------------------------------------------------- */
  /*                                   EFFECTS                                  */
  /* -------------------------------------------------------------------------- */
  useEffect(() => {
    logger.info("AdminSidebar mounted");
    buildMenu();
  }, []);

  /* -------------------------------------------------------------------------- */
  /*                                   RETURN                                   */
  /* -------------------------------------------------------------------------- */
  return (
    <Sidebar>
      <SidebarHeader>header</SidebarHeader>
      <SidebarContent className="gap-0">
        {Object.keys(routes).map(key => {
          const route = routes[key];
          return (
            <Collapsible key={key} className="group/collapsible">
              <SidebarGroup>
                <SidebarGroupLabel asChild>
                  <CollapsibleTrigger className="text-start text-base font-bold text-primary-700 transition-all duration-200 hover:bg-primary-100 hover:text-primary-900 hocus:text-primary-900">
                    <span className="flex items-center gap-3 text-base font-bold text-text-600">
                      {route.icon && (
                        <route.icon className="h-5 w-5 opacity-50" />
                      )}
                      <span>{route.menuTitle || route.title}</span>
                    </span>
                    <LuChevronDown className="ms-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                  </CollapsibleTrigger>
                </SidebarGroupLabel>
                <CollapsibleContent>
                  <SidebarGroupContent className="ps-3 pt-2">
                    <SidebarMenu>
                      {Object.keys(route._ || {}).map(subKey => {
                        const subRoute = route._?.[subKey];
                        return subRoute ? (
                          <SidebarMenuItem key={subKey}>
                            <Link href={subRoute.path}>
                              <SidebarMenuButton>
                                {subRoute.icon && (
                                  <subRoute.icon className="opacity-50" />
                                )}
                                <span>
                                  {subRoute.menuTitle || subRoute.title}
                                </span>
                              </SidebarMenuButton>
                            </Link>
                          </SidebarMenuItem>
                        ) : null;
                      })}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </CollapsibleContent>
              </SidebarGroup>
            </Collapsible>
          );
        })}
      </SidebarContent>
    </Sidebar>
  );
};

export default AdminSidebar;
