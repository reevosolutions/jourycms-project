import {
  LuCog,
  LuFileCog,
  LuFiles,
  LuFileText,
  LuGlobe,
  LuLayoutTemplate,
  LuList,
  LuMessageSquare,
  LuNetwork,
  LuPencil,
  LuPencilLine,
  LuPlus,
  LuSubtitles,
  LuUserCircle,
  LuUsers,
  LuUsers2,
} from "react-icons/lu";

const routes = {
  // articles: {
  //   path: "/admin/articles" as const,
  //   title: "Articles",
  //   icon: LuFileText,
  //   ac: ["articles.read" ] as any[],
  //   _: {
  //     list: {
  //       path: "/admin/articles" as const,
  //       title: "All Articles",
  //       icon: LuList,
  //       ac: ["articles.read" ] as any[],
  //     },
  //     create: {
  //       path: "/admin/articles/new" as const,
  //       title: "Create Article",
  //       ac: ["articles.create" ] as any[],
  //       icon: LuPlus,
  //     },
  //     edit: {
  //       path: "/admin/articles/edit/:id" as const,
  //       title: "Edit Article",
  //       ac: ["articles.update" ] as any[],
  //       hideOnMenu: true,
  //       icon: LuPencilLine,
  //     },
  //   },
  // },

  articleTypesSlot: () => {
    return {
      slot: "articleTypes" as const,
      result: async (types: Levelup.CMS.V1.Content.Entity.ArticleType[]) => {
        const res: { [id: string]: Levelup.CMS.V1.UI.Admin.RouteItem } =
          types.reduce(
            (prev, type) => ({
              ...prev,
              [type._id]: {
                path: `/admin/articles/types/${type.slug}` as const,
                title: type.labels.plural,
                icon: LuFileText,
                ac: [`${type.labels.plural}.read`] as any[],
                _: {
                  list: {
                    path: `/admin/articles/types/${type.slug}` as const,
                    title: type.labels.list,
                    icon: LuList,
                    ac: [`${type.labels.plural}.read`] as any[],
                  },
                  create: {
                    path: `/admin/articles/new/${type.slug}` as const,
                    title: type.labels.create,
                    ac: [`${type.labels.plural}.create`] as any[],
                    icon: LuPlus,
                  },
                  edit: {
                    path: "/admin/articles/edit/:id" as const,
                    title: type.labels.edit,
                    ac: [`${type.labels.plural}.update`] as any[],
                    hideOnMenu: true,
                    icon: LuPencilLine,
                  },
                },
              },
            }),
            {},
          );
        return res;
      },
    };
  },
  types: {
    path: "/admin/types" as const,
    title: "Content Types",
    icon: LuFileCog,
    ac: ["types.read"] as any[],
    _: {
      list: {
        path: "/admin/types" as const,
        title: "All Content Types",
        ac: ["types.read"] as any[],
        icon: LuList,
      },
      create: {
        path: "/admin/types/new" as const,
        title: "Create Content Type",
        ac: ["types.create"] as any[],
        icon: LuPlus,
      },
      edit: {
        path: "/admin/types/edit/:id" as const,
        title: "Edit Content Type",
        ac: ["types.update"] as any[],
        hideOnMenu: true,
        icon: LuPencil,
      },
    },
  },
  taxonomy: {
    path: "/admin/taxonomy" as const,
    title: "Taxonomy",
    icon: LuNetwork,
    ac: ["taxonomy.read"] as any[],
    _: {
      list: {
        path: "/admin/taxonomy" as const,
        title: "All Taxonomy",
        ac: ["taxonomy.read"] as any[],
        icon: LuList,
      },
      create: {
        path: "/admin/taxonomy/new" as const,
        title: "Create Taxonomy",
        ac: ["taxonomy.create"] as any[],
        icon: LuPlus,
      },
      edit: {
        path: "/admin/taxonomy/edit/:id" as const,
        title: "Edit Taxonomy",
        ac: ["taxonomy.update"] as any[],
        hideOnMenu: true,
        icon: LuPencil,
      },
    },
  },
  comments: {
    path: "/admin/comments" as const,
    title: "Comments",
    icon: LuSubtitles,
    ac: ["comments.manage"] as any[],
    _: {
      list: {
        path: "/admin/comments" as const,
        title: "All Comments",
        ac: ["comments.manage"] as any[],
        icon: LuList,
      },
      edit: {
        path: "/admin/comments/edit/:id" as const,
        title: "Edit Comment",
        ac: ["comments.update"] as any[],
        hideOnMenu: true,
        icon: LuPencil,
      },
    },
  },
  forms: {
    path: "/admin/forms" as const,
    title: "Forms",
    icon: LuLayoutTemplate,
    ac: [
      "forms.manage",
      (config: { extensions: string[] }) =>
        !!config.extensions.includes("forms"),
    ] as any[],
    _: {
      list: {
        path: "/admin/forms" as const,
        title: "All Forms",
        ac: ["forms.manage"] as any[],
        icon: LuList,
      },
      create: {
        path: "/admin/forms/new" as const,
        title: "Create Form",
        ac: ["forms.manage"] as any[],
        icon: LuPlus,
      },
      edit: {
        path: "/admin/forms/edit/:id" as const,
        title: "Edit Form",
        ac: ["forms.manage"] as any[],
        hideOnMenu: true,
        icon: LuPencil,
      },
      entries: {
        path: "/admin/forms/entries/:id" as const,
        title: "Form Entries",
        ac: ["forms.entries.read"] as any[],
        hideOnMenu: true,
        icon: LuMessageSquare,
      },
    },
  },
  users: {
    path: "/admin/users" as const,
    title: "Users",
    icon: LuUsers,
    ac: ["users.read"] as any[],
    _: {
      list: {
        path: "/admin/users" as const,
        title: "All users",
        ac: ["users.read"] as any[],
        icon: LuList,
      },
      create: {
        path: "/admin/users/new" as const,
        title: "Add User",
        ac: ["users.create"] as any[],
        icon: LuPlus,
      },
      edit: {
        path: "/admin/users/edit/:id" as const,
        title: "Update User Profile",
        ac: ["users.update"] as any[],
        hideOnMenu: true,
        icon: LuPencil,
      },
    },
  },
  account: {
    path: "/admin/account" as const,
    title: "Account",
    icon: LuUserCircle,
    ac: ["my-account.manage"] as any[],
    _: {
      identity: {
        path: "/admin/account" as const,
        title: "My Profile",
        ac: ["my-account.manage"] as any[],
        icon: LuPencilLine,
      },
    },
  },
  settings: {
    path: "/admin/settings" as const,
    title: "Settings",
    icon: LuCog,
    ac: ["website.manage"] as any[],
    _: {
      identity: {
        path: "/admin/settings/identity" as const,
        title: "Website Identity",
        ac: ["website.manage"] as any[],
        icon: LuGlobe,
      },
      content: {
        path: "/admin/settings/content" as const,
        title: "Content Settings",
        ac: ["website.manage"] as any[],
        icon: LuFiles,
      },
      users: {
        path: "/admin/settings/users" as const,
        title: "Members Settings",
        ac: ["users.create"] as any[],
        icon: LuUsers2,
      },
    },
  },
} as const;

const __routes: Levelup.CMS.V1.UI.Admin.RouteItems = routes;

export default routes;
