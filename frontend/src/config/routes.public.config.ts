const routes = {
  
  homepage: {
    path: "/" as const,
    title: "الرئيسية",
    ac: [] as Levelup.CMS.V1.UI.Routes.RouteItem['ac'],
    _: {
      omrah: {
        path: "/omrah" as const,
        title: "عروض العمرة",
        ac: [] as Levelup.CMS.V1.UI.Routes.RouteItem['ac'],
        _: {},
      },
      tombolas: {
        path: "/tombolas" as const,
        title: "طنبولات",
        ac: [] as Levelup.CMS.V1.UI.Routes.RouteItem['ac'],
        _: {},
      },
      bids: {
        path: "/bids" as const,
        title: "مناقصات",
        ac: [] as Levelup.CMS.V1.UI.Routes.RouteItem['ac'],
        _: {},
      },
      healthServices: {
        path: "/health-services" as const,
        title: "خدمات صحية",
        ac: [] as Levelup.CMS.V1.UI.Routes.RouteItem['ac'],
        _: {},
      },
      transportation: {
        path: "/transportation" as const,
        title: "خدمات النقل",
        ac: [] as Levelup.CMS.V1.UI.Routes.RouteItem['ac'],
        _: {},
      },
      escorts: {
        path: "/escorts" as const,
        title: "مرافقين",
        ac: [] as Levelup.CMS.V1.UI.Routes.RouteItem['ac'],
        _: {},
      },
      doctors: {
        path: "/doctors" as const,
        title: "أطباء",
        ac: [] as Levelup.CMS.V1.UI.Routes.RouteItem['ac'],
        _: {},
      },
      login: {
        path: "/login" as const,
        title: "تسجيل الدخول",
        ac: [] as Levelup.CMS.V1.UI.Routes.RouteItem['ac'],
        _: {},
      },
      rgister: {
        path: "/register" as const,
        title: "التسجيل",
        ac: [] as Levelup.CMS.V1.UI.Routes.RouteItem['ac'],
        _: {},
      },
      jobs: {
        path: "/jobs" as const,
        title: "وظائف",
        ac: [] as Levelup.CMS.V1.UI.Routes.RouteItem['ac'],
        _: {},
      },
      about: {
        path: "/about" as const,
        title: "عنا",
        ac: [] as Levelup.CMS.V1.UI.Routes.RouteItem['ac'],
        _: {},
      },
      contact: {
        path: "/contact" as const,
        title: "الاتصال بنا",
        ac: [] as Levelup.CMS.V1.UI.Routes.RouteItem['ac'],
        _: {},
      },
      
    },
  },
  
} as const;

const __routes: Levelup.CMS.V1.UI.Routes.RouteItems = routes;



export default routes;
