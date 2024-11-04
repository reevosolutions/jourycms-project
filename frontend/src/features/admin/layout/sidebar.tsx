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
import { ROUTES } from "@/config";
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
    [id: string]: Levelup.CMS.V1.UI.Admin.RouteItem;
  }>({});
  /* -------------------------------------------------------------------------- */
  /*                                   METHODS                                  */
  /* -------------------------------------------------------------------------- */
  const buildMenu = useCallback(async () => {
    logger.value("ROUTES", ROUTES);

    let _routes: {
      [id: string]: Levelup.CMS.V1.UI.Admin.RouteItem;
    } = {};

    for (const routeKey of Object.keys(ROUTES)) {
      if (typeof ROUTES[routeKey as keyof typeof ROUTES] === "function") {
        const slotResult: ReturnType<
          Levelup.CMS.V1.UI.Admin.TMenuSlot<Levelup.CMS.V1.UI.Admin.TMenuSlotName>
        > = (ROUTES[routeKey as keyof typeof ROUTES] as any)();
        /**
         * Handle the articleTypes slot
         * TODO: Add more slot handlers here
         */
        if (slotResult.slot === "articleTypes") {
          const types = mock.content.articleTypes(5);
          const res = await slotResult.result(types);
          _routes = { ..._routes, ...res };
        }
      } else {
        _routes = {
          ..._routes,
          [routeKey]: ROUTES[routeKey as keyof typeof ROUTES] as any,
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
                  <CollapsibleTrigger>
                    <span className="flex items-center gap-3 text-start text-base font-bold text-primary-700">
                      {route.icon && <route.icon />}
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
                                {subRoute.icon && <subRoute.icon />}
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
