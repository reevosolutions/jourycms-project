
// 
const routes = {
  homepage: {
    path: "/" as const,
    title: "الرئيسية",
    ac: [] as Levelup.CMS.V1.UI.Routes.RouteItem["ac"],
    _: {
      omrah: {
        path: "/omrah" as const,
        title: "عروض العمرة",
        ac: [] as Levelup.CMS.V1.UI.Routes.RouteItem["ac"],
        _: {
          paged: {
            path: "/omrah/:page" as const,
            title: "عروض العمرة",
            ac: [] as Levelup.CMS.V1.UI.Routes.RouteItem["ac"],
            _: {},
          },
        },
      },
      hajj: {
        path: "/hajj" as const,
        title: "عروض الحج",
        ac: [] as Levelup.CMS.V1.UI.Routes.RouteItem["ac"],
        _: {
          paged: {
            path: "/hajj/:page" as const,
            title: "عروض الحج",
            ac: [] as Levelup.CMS.V1.UI.Routes.RouteItem["ac"],
            _: {},
          },
        },
      },
      visa: {
        path: "/visa" as const,
        title: "تأشيرة السعودية",
        ac: [] as Levelup.CMS.V1.UI.Routes.RouteItem["ac"],
        _: {
          paged: {
            path: "/visa/:page" as const,
            title: "تأشيرة السعودية",
            ac: [] as Levelup.CMS.V1.UI.Routes.RouteItem["ac"],
            _: {},
          },
        },
      },
      hotels: {
        path: "/hotels" as const,
        title: "فناق الحرمين",
        ac: [] as Levelup.CMS.V1.UI.Routes.RouteItem["ac"],
        _: {
          paged: {
            path: "/hotels/:page" as const,
            title: "فناق الحرمين",
            ac: [] as Levelup.CMS.V1.UI.Routes.RouteItem["ac"],
            _: {},
          },
        },
      },
      tombolas: {
        path: "/tombolas" as const,
        title: "طمبولات",
        ac: [] as Levelup.CMS.V1.UI.Routes.RouteItem["ac"],
        _: {
          paged: {
            path: "/tombolas/:page" as const,
            title: "طمبولات",
            ac: [] as Levelup.CMS.V1.UI.Routes.RouteItem["ac"],
            _: {},
          },
        },
      },
      bids: {
        path: "/bids" as const,
        title: "مناقصات",
        ac: [] as Levelup.CMS.V1.UI.Routes.RouteItem["ac"],
        _: {
          paged: {
            path: "/bids/:page" as const,
            title: "مناقصات",
            ac: [] as Levelup.CMS.V1.UI.Routes.RouteItem["ac"],
            _: {},
          },
        },
      },
      healthServices: {
        path: "/health-services" as const,
        title: "خدمات صحية",
        ac: [] as Levelup.CMS.V1.UI.Routes.RouteItem["ac"],
        _: {
          paged: {
            path: "/health-services/:page" as const,
            title: "خدمات صحية",
            ac: [] as Levelup.CMS.V1.UI.Routes.RouteItem["ac"],
            _: {},
          },
        },
      },
      transportationServices: {
        path: "/transportation-services" as const,
        title: "خدمات النقل",
        ac: [] as Levelup.CMS.V1.UI.Routes.RouteItem["ac"],
        _: {
          paged: {
            path: "/transportation-services/:page" as const,
            title: "خدمات النقل",
            ac: [] as Levelup.CMS.V1.UI.Routes.RouteItem["ac"],
            _: {},
          },
        },
      },
      escorts: {
        path: "/escorts" as const,
        title: "مرافقين",
        ac: [] as Levelup.CMS.V1.UI.Routes.RouteItem["ac"],
        _: {
          pages: {
            path: "/escorts/:page" as const,
            title: "مرافقين",
            ac: [] as Levelup.CMS.V1.UI.Routes.RouteItem["ac"],
            _: {},
          },
        },
      },
      doctors: {
        path: "/doctors" as const,
        title: "أطباء",
        ac: [] as Levelup.CMS.V1.UI.Routes.RouteItem["ac"],
        _: {
          paged: {
            path: "/doctors/:page" as const,
            title: "أطباء",
            ac: [] as Levelup.CMS.V1.UI.Routes.RouteItem["ac"],
            _: {},
          },
        },
      },

      jobs: {
        path: "/jobs" as const,
        title: "وظائف",
        ac: [] as Levelup.CMS.V1.UI.Routes.RouteItem["ac"],
        _: {
          paged: {
            path: "/jobs/:page" as const,
            title: "وظائف",
            ac: [] as Levelup.CMS.V1.UI.Routes.RouteItem["ac"],
            _: {},
          },
        },
      },

      search: {
        path: "/search" as const,
        title: "نتائج البحث",
        ac: [] as Levelup.CMS.V1.UI.Routes.RouteItem["ac"],
        _: {},
      },

      about: {
        path: "/about" as const,
        title: "عنا",
        ac: [] as Levelup.CMS.V1.UI.Routes.RouteItem["ac"],
        _: {},
      },
      contact: {
        path: "/contact" as const,
        title: "الاتصال بنا",
        ac: [] as Levelup.CMS.V1.UI.Routes.RouteItem["ac"],
        _: {},
      },
      login: {
        path: "/login" as const,
        title: "تسجيل الدخول",
        ac: [] as Levelup.CMS.V1.UI.Routes.RouteItem["ac"],
        _: {},
      },
      rgister: {
        path: "/register" as const,
        title: "التسجيل",
        ac: [] as Levelup.CMS.V1.UI.Routes.RouteItem["ac"],
        _: {},
      },
      myAccount: {
        path: "/account" as const,
        title: "حسابي",
        ac: [] as Levelup.CMS.V1.UI.Routes.RouteItem["ac"],
        _: {
          offers: {
            path: "/account/offers" as const,
            title: "عروض الوكالة",
            ac: [] as Levelup.CMS.V1.UI.Routes.RouteItem["ac"],
            _: {},
          },
          newOffer: {
            path: "/account/new-offer" as const,
            title: "عرض جديد",
            ac: [] as Levelup.CMS.V1.UI.Routes.RouteItem["ac"],
            _: {},
          },
          editOffer: {
            path: "/account/edit-offer/:id" as const,
            title: "تحرير عرض",
            ac: [] as Levelup.CMS.V1.UI.Routes.RouteItem["ac"],
            _: {},
          },
          editAccount: {
            path: "/account/edit" as const,
            title: "تحرير الملف الشخصي",
            ac: [] as Levelup.CMS.V1.UI.Routes.RouteItem["ac"],
            _: {},
          },
        },
      },
    },
  },
} as const;

const __routes: Levelup.CMS.V1.UI.Routes.RouteItems = routes;



export default routes;
