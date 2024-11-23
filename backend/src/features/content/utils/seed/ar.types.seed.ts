import medical_specialities from "./medical-specialities.config";

const custom_meta_fields = {
  // trips
  entry_point: {
    field_key: "entry_point",
    field_label: "الدخول",
    field_type: "select" as const,
    field_options: {
      choices: [
        {
          value: "mekkah",
          label: "مكة المكرة",
        },
        {
          value: "medina",
          label: "المدينة المنورة",
        },
      ],
      multiple: false,
    },
  },
  medina_mekkah: {
    field_key: "medina_mekkah",
    field_label: "المدينة - مكة",
    field_type: "select" as const,
    field_options: {
      choices: [
        {
          value: "mekkah",
          label: "مكة المكرمة",
        },
        {
          value: "medina",
          label: "المدينة المنورة",
        },
      ],
      multiple: false,
    },
  } as Levelup.CMS.V1.Content.CustomFields.MetaField<"select">,

  price: {
    field_key: "price",
    field_label: "السعر",
    field_type: "number" as const,
    field_options: {
      min: 0,
    },
  } as Levelup.CMS.V1.Content.CustomFields.MetaField<"number">,
  experience_years: {
    field_key: "experience_years",
    field_label: "سنوات الخبرة",
    field_type: "number" as const,
    field_options: {
      min: 0,
    },
  } as Levelup.CMS.V1.Content.CustomFields.MetaField<"number">,
  shrines: {
    field_key: "shrines",
    field_label: "المزارات",
    field_type: "article_object" as const,
    field_options: {
      type: "shrine",
      multiple: true,
      filter: {},
    },
  } as Levelup.CMS.V1.Content.CustomFields.MetaField<"article_object", true>,
  departure_airoport: {
    field_key: "departure_airoport",
    field_label: "مطار الإقلاع",
    field_type: "article_object" as const,
    field_options: {
      type: "airoport",
      multiple: false,
      filter: {
        "meta_fields.country": "dz",
      },
    },
  } as Levelup.CMS.V1.Content.CustomFields.MetaField<"article_object">,
  arrival_airoport: {
    field_key: "arrival_airoport",
    field_label: "مطار الوصول",
    field_type: "article_object" as const,
    field_options: {
      type: "airoport",
      multiple: false,
      filter: {
        "meta_fields.country": "ksa",
      },
    },
  } as Levelup.CMS.V1.Content.CustomFields.MetaField<"article_object">,
  airelines_company: {
    field_key: "airelines_company",
    field_label: "شركة الطيران",
    field_type: "article_object" as const,
    field_options: {
      type: "airelines-company",
      multiple: false,
    },
  },
  trip_type: {
    field_key: "trip_type",
    field_label: "نوع الرحلة",
    field_type: "select" as const,
    field_options: {
      choices: [
        {
          value: "economy",
          label: "اقتصادي",
        },
        {
          value: "premium_economy",
          label: "اقتصادي مميز",
        },
        {
          value: "business",
          label: "رجال الأعمال",
        },
        {
          value: "first_class",
          label: "الدرجة الأولى",
        },
      ],
    },
  },
  trip_duration: {
    field_key: "trip_duration",
    field_label: "مدة الرحلة",
    field_type: "select" as const,
    field_options: {
      choices: [
        {
          value: "15",
          label: "15 يوم",
        },
        {
          value: "21",
          label: "21 يوم",
        },
        {
          value: "30",
          label: "30 يوم",
        },
        {
          value: "45",
          label: "45 يوم",
        },
      ],
      multiple: false,
    },
  } as Levelup.CMS.V1.Content.CustomFields.MetaField<"select", false>,
  flight_number: {
    field_key: "flight_number",
    field_label: "رقم الرحلة",
    field_type: "text" as const,
    field_options: {
      min: 0,
      max: 255,
    },
  } as Levelup.CMS.V1.Content.CustomFields.MetaField<"text">,
  flight_date: {
    field_key: "flight_date",
    field_label: "تاريخ الرحلة",
    field_type: "date" as const,
    field_options: {
      format: "YYYY-MM-DD",
    },
  } as Levelup.CMS.V1.Content.CustomFields.MetaField<"date">,
  start_date: {
    field_key: "start_date",
    field_label: "تاريخ البداية",
    field_type: "date" as const,
    field_options: {
      format: "YYYY-MM-DD",
    },
  } as Levelup.CMS.V1.Content.CustomFields.MetaField<"date">,
  end_date: {
    field_key: "end_date",
    field_label: "تاريخ النهاية",
    field_type: "date" as const,
    field_options: {
      format: "YYYY-MM-DD",
    },
  } as Levelup.CMS.V1.Content.CustomFields.MetaField<"date">,
  flight_time: {
    field_key: "flight_time",
    field_label: "توقيت الرحلة",
    field_type: "time" as const,
    field_options: {
      format: "HH:mm",
    },
  } as Levelup.CMS.V1.Content.CustomFields.MetaField<"time">,
  agency: {
    field_key: "agency",
    field_label: "الوكالة",
    field_type: "article_object" as const,
    field_options: {
      type: "agency",
      multiple: false,
    },
  } as Levelup.CMS.V1.Content.CustomFields.MetaField<"article_object", false>,
  hotel: {
    field_key: "hotel",
    field_label: "الفندق",
    field_type: "article_object" as const,
    field_options: {
      type: "hotel",
      multiple: false,
    },
  } as Levelup.CMS.V1.Content.CustomFields.MetaField<"article_object", false>,
  mekkah_hotel: {
    field_key: "mekkah_hotel",
    field_label: "فندق مكة",
    field_type: "article_object" as const,
    field_options: {
      type: "hotel",
      multiple: false,
    },
  } as Levelup.CMS.V1.Content.CustomFields.MetaField<"article_object", false>,
  medina_hotel: {
    field_key: "medina_hotel",
    field_label: "فندق المدينة",
    field_type: "article_object" as const,
    field_options: {
      type: "hotel",
      multiple: false,
    },
  } as Levelup.CMS.V1.Content.CustomFields.MetaField<"article_object", false>,

  ramdhan_trip: {
    field_key: "ramdhan_trip",
    field_label: "عمرة رمضان",
    field_type: "boolean" as const,
    field_options: {
      default: false,
    },
  } as Levelup.CMS.V1.Content.CustomFields.MetaField<"boolean">,
  subsistence_at_mekkah: {
    field_key: "subsistence_at_mekkah",
    field_label: "الإعاشة في مكة",
    field_type: "checkbox" as const,
    field_options: {
      choices: [
        {
          value: "breakfast",
          label: "فطور الصباح",
        },
        {
          value: "lunch",
          label: "غداء",
        },
        {
          value: "dinner",
          label: "عشاء",
        },
        {
          value: "iftar",
          label: "إفطار",
        },
        {
          value: "sohor",
          label: "سحور",
        },
      ],
    },
  } as Levelup.CMS.V1.Content.CustomFields.MetaField<"checkbox">,
  subsistence_at_medina: {
    field_key: "subsistence_at_medina",
    field_label: "الإعاشة في المدينة",
    field_type: "checkbox" as const,
    field_options: {
      choices: [
        {
          value: "breakfast",
          label: "فطور الصباح",
        },
        {
          value: "lunch",
          label: "غداء",
        },
        {
          value: "dinner",
          label: "عشاء",
        },
        {
          value: "iftar",
          label: "إفطار",
        },
        {
          value: "sohor",
          label: "سحور",
        },
      ],
    },
  } as Levelup.CMS.V1.Content.CustomFields.MetaField<"checkbox">,
  shrines_at_mekkah: {
    field_key: "shrines_at_mekkah",
    field_label: "المزارات في مكة",
    field_type: "article_object" as const,
    field_options: {
      type: "shrine",
      multiple: true,
      filter: {
        "meta_fields.medina_mekkah": "mekkah",
      },
    },
  },
  shrines_at_medina: {
    field_key: "shrines_at_medina",
    field_label: "المزارات في المدينة",
    field_type: "article_object" as const,
    field_options: {
      type: "shrine",
      multiple: true,
      filter: {
        "meta_fields.medina_mekkah": "medina",
      },
    },
  },

  // hotels
  hotel_rating: {
    field_key: "hotel_rating",
    field_label: "تقييم الفندق",
    field_type: "select" as const,
    field_options: {
      choices: [
        {
          value: "1",
          label: "1 نجمة",
        },
        {
          value: "2",
          label: "2 نجمة",
        },
        {
          value: "3",
          label: "3 نجمة",
        },
        {
          value: "4",
          label: "4 نجمة",
        },
        {
          value: "5",
          label: "5 نجمة",
        },
      ],
      multiple: false,
    },
  },
  distance_to_haram: {
    field_key: "distance_to_haram",
    field_label: "المسافة إلى الحرم",
    field_type: "number" as const,
    field_options: {
      min: 0,
    },
  } as Levelup.CMS.V1.Content.CustomFields.MetaField<"number">,
  transportation_to_haram: {
    field_key: "transportation_to_haram",
    field_label: "النقل إلى الحرم",
    field_type: "select" as const,
    field_options: {
      choices: [
        {
          value: "walk",
          label: "مشي",
        },
        {
          value: "bus",
          label: "باص",
        },
        {
          value: "car",
          label: "سيارة",
        },
      ],
      multiple: false,
    },
  },
  hotel_services: {
    field_key: "hotel_services",
    field_label: "خدمات الفندق",
    field_type: "select" as const,
    field_options: {
      choices: [
        {
          value: "room_service",
          label: "خدمة الغرف",
        },
        {
          value: "restaurant",
          label: "مطعم",
        },
        {
          value: "gym",
          label: "صالة رياضية",
        },
        {
          value: "pool",
          label: "مسبح",
        },
      ],
      multiple: true,
    },
  },

  country: {
    field_key: "country",
    field_label: "الدولة",
    field_type: "select" as const,
    field_options: {
      choices: [
        {
          value: "dz",
          label: "الجزائر",
        },
        {
          value: "ksa",
          label: "المملكة العربية السعودية",
        },
      ],
      multiple: false,
    },
  },
  algerian_state: {
    field_key: "state",
    field_label: "الولاية",
    field_type: "algerian_state" as const,
    field_options: {
      choices: [],
      multiple: false,
      constraints: [
        {
          field: "country",
          operator: "eq",
          value: "dz",
        },
      ],
    },
  } as Levelup.CMS.V1.Content.CustomFields.MetaField<"algerian_state", false>,
  algerian_city: {
    field_key: "city",
    field_label: "المدينة",
    field_type: "algerian_city" as const,
    field_options: {
      choices: [],
      multiple: false,
      constraints: [
        {
          field: "country",
          operator: "eq",
          value: "dz",
        },
        {
          field: "state",
          operator: "not_empty",
        },
      ],
    },
  } as Levelup.CMS.V1.Content.CustomFields.MetaField<"algerian_city", false>,
  ksa_city: {
    field_key: "ksa_city",
    field_label: "المدينة",
    field_type: "ksa_city" as const,
    field_options: {
      choices: [],
      multiple: false,
      constraints: [
        {
          field: "country",
          operator: "eq",
          value: "ksa",
        },
      ],
    },
  } as Levelup.CMS.V1.Content.CustomFields.MetaField<"ksa_city", false>,

  // agencies
  logo: {
    field_key: "logo",
    field_label: "اللوغو",
    field_type: "image" as const,
    field_options: {
      multiple: false,
    },
  },
  gallery: {
    field_key: "gallery",
    field_label: "الصور",
    field_type: "image" as const,
    field_options: {
      multiple: true,
    },
  },

  // members
  avatar: {
    field_key: "avatar",
    field_label: "صورة البروفايل",
    field_type: "image" as const,
    field_options: {
      multiple: false,
    },
  },
  medical_speciality: {
    field_key: "medical_speciality",
    field_label: "التخصص",
    field_type: "select" as const,
    field_options: {
      choices: medical_specialities,
      multiple: false,
    },
  },
  sex: {
    field_key: "sex",
    field_label: "الجنس",
    field_type: "select" as const,
    field_options: {
      choices: [
        {
          value: "male",
          label: "ذكر"
        },
        {
          value: "female",
          label: "أنثى"
        },
      ],
      multiple: false,
    },
  },
};

const _articleTypesSeedData = {
  custom_meta_fields,
  types: [
    {
      slug: "blog",
      name: "blog",
      labels: {
        singular: "مقال",
        plural: "مقالات",
        list: "كل المقالات",
        create: "أضف مقال",
        edit: "تحرير المقال",
        delete: "إزالة المقال",
      },
      description: "وصف مقال",
      description_unformatted: "وصف مقال",
      description_structured: {},
      custom_meta_fields: Object.values(custom_meta_fields),
    },
    {
      slug: "omrah",
      name: "omrah",
      labels: {
        singular: "عرض عمرة",
        plural: "عروض العمرة",
        list: "كل عروض العمرة",
        create: "أضف عرض عمرة",
        edit: "تحرير عرض عمرة",
        delete: "إزالة عرض عمرة",
      },
      description: "وصف عرض العمرة",
      description_unformatted: "وصف عرض العمرة",
      description_structured: {},
      custom_meta_fields: [
        custom_meta_fields.agency,
        custom_meta_fields.trip_duration,
        custom_meta_fields.airelines_company,
        custom_meta_fields.departure_airoport,
        custom_meta_fields.arrival_airoport,
        custom_meta_fields.flight_number,
        custom_meta_fields.flight_date,
        custom_meta_fields.flight_time,
        custom_meta_fields.trip_type,
        custom_meta_fields.entry_point,
        custom_meta_fields.price,
        custom_meta_fields.ramdhan_trip,
        custom_meta_fields.shrines_at_mekkah,
        custom_meta_fields.shrines_at_medina,
        custom_meta_fields.mekkah_hotel,
        custom_meta_fields.medina_hotel,
        custom_meta_fields.subsistence_at_mekkah,
        custom_meta_fields.subsistence_at_medina,
      ],
    },
    {
      slug: "shrine",
      name: "shrine",
      labels: {
        singular: "مزار",
        plural: "مزارات",
        list: "كل المزارات",
        create: "أضف مزار",
        edit: "تحرير المزار",
        delete: "إزالة المزار",
      },
      description: "وصف مزار",
      description_unformatted: "وصف مزار",
      description_structured: {},
      custom_meta_fields: [custom_meta_fields.medina_mekkah],
    },
    {
      slug: "airelines-company",
      name: "airelines company",
      labels: {
        singular: "شركة طيران",
        plural: "شركات الطيران",
        list: "كل شركات الطيران",
        create: "أضف شركة طيران",
        edit: "تحرير شركة الطيران",
        delete: "إزالة شركة الطيران",
      },
      description: "وصف شركة طيران",
      description_unformatted: "وصف شركة طيران",
      description_structured: {},
      custom_meta_fields: [
        custom_meta_fields.country,
        custom_meta_fields.algerian_state,
        custom_meta_fields.algerian_city,
        custom_meta_fields.ksa_city,
      ],
    },
    {
      slug: "hotel",
      name: "hotel",
      labels: {
        singular: "فندق",
        plural: "فنادق",
        list: "كل الفنادق",
        create: "أضف فندق",
        edit: "تحرير الفندق",
        delete: "إزالة الفندق",
      },
      description: "وصف فندق",
      description_unformatted: "وصف فندق",
      description_structured: {},
      custom_meta_fields: [
        custom_meta_fields.logo,
        custom_meta_fields.country,
        custom_meta_fields.algerian_state,
        custom_meta_fields.algerian_city,
        custom_meta_fields.ksa_city,
        custom_meta_fields.medina_mekkah,
        custom_meta_fields.hotel_rating,
        custom_meta_fields.distance_to_haram,
        custom_meta_fields.transportation_to_haram,
        custom_meta_fields.hotel_services,
      ],
    },
    {
      slug: "airoport",
      name: "airoport",
      labels: {
        singular: "مطار",
        plural: "مطارات",
        list: "كل المطارات",
        create: "أضف مطار",
        edit: "تحرير المطار",
        delete: "إزالة المطار",
      },
      description: "وصف مطار",
      description_unformatted: "وصف مطار",
      description_structured: {},
      custom_meta_fields: [
        custom_meta_fields.country,
        custom_meta_fields.algerian_state,
        custom_meta_fields.algerian_city,
        custom_meta_fields.ksa_city,
      ],
    },
    {
      slug: "gift",
      name: "gift",
      labels: {
        singular: "هدية",
        plural: "هدايا",
        list: "كل الهدايا",
        create: "أضف هدية",
        edit: "تحرير الهدية",
        delete: "إزالة الهدية",
      },
      description: "وصف هدية",
      description_unformatted: "وصف هدية",
      description_structured: {},
      custom_meta_fields: [custom_meta_fields.price],
    },
    {
      slug: "agency",
      name: "agency",
      labels: {
        singular: "وكالة سياحة",
        plural: "وكالات السياحة",
        list: "كل وكالات السياحة",
        create: "أضف وكالة سياحة",
        edit: "تحرير وكالة السياحة",
        delete: "إزالة وكالة السياحة",
      },
      description: "وصف وكالة سياحة",
      description_unformatted: "وصف وكالة سياحة",
      description_structured: {},
      custom_meta_fields: [
        custom_meta_fields.logo,
        custom_meta_fields.country,
        custom_meta_fields.algerian_state,
        custom_meta_fields.algerian_city,
        custom_meta_fields.ksa_city,
        custom_meta_fields.gallery,
      ],
    },
    {
      slug: "doctor",
      name: "doctor",
      labels: {
        singular: "طبيب",
        plural: "أطباء",
        list: "كل الأطباء",
        create: "أضف طبيب",
        edit: "تحرير الطبيب",
        delete: "إزالة الطبيب",
      },
      description: "وصف طبيب",
      description_unformatted: "وصف طبيب",
      description_structured: {},
      custom_meta_fields: [
        custom_meta_fields.avatar,
        custom_meta_fields.sex,
        custom_meta_fields.medical_speciality,
        custom_meta_fields.experience_years,
        custom_meta_fields.country,
        custom_meta_fields.algerian_state,
        custom_meta_fields.algerian_city,
        custom_meta_fields.ksa_city,
      ],
    },
    {
      slug: "escort",
      name: "escort",
      labels: {
        singular: "مرافق",
        plural: "مرافقين",
        list: "كل المرافقين",
        create: "أضف مرافق",
        edit: "تحرير المرافق",
        delete: "إزالة المرافق",
      },
      description: "وصف مرافق",
      description_unformatted: "وصف مرافق",
      description_structured: {},
      custom_meta_fields: [
        custom_meta_fields.avatar,
        custom_meta_fields.sex,
        custom_meta_fields.experience_years,
        custom_meta_fields.country,
        custom_meta_fields.algerian_state,
        custom_meta_fields.algerian_city,
        custom_meta_fields.ksa_city,
      ],
    },
    {
      slug: "tombola",
      name: "tombola",
      labels: {
        singular: "طومبولا",
        plural: "طومبولات",
        list: "كل الطومبولات",
        create: "أضف طومبولا",
        edit: "تحرير الطومبولا",
        delete: "إزالة الطومبولا",
      },
      description: "وصف الطومبولا",
      description_unformatted: "وصف الطومبولا",
      description_structured: {},
      custom_meta_fields: [
        custom_meta_fields.agency,
        custom_meta_fields.start_date,
        custom_meta_fields.end_date,
      ],
    },
    {
      slug: "job-offer",
      name: "job-offer",
      labels: {
        singular: "عرض عمل",
        plural: "عروض العمل",
        list: "كل عروض العمل",
        create: "أضف عرض عمل",
        edit: "تحرير عرض العمل",
        delete: "إزالة عرض العمل",
      },
      description: "وصف عرض العمل",
      description_unformatted: "وصف عرض العمل",
      description_structured: {},
      custom_meta_fields: [
        custom_meta_fields.agency,
        custom_meta_fields.experience_years,
      ],
    },
    {
      slug: "bid",
      name: "bid",
      labels: {
        singular: "مناقصة",
        plural: "مناقصات",
        list: "كل المناقصات",
        create: "أضف مناقصة",
        edit: "تحرير المناقصة",
        delete: "إزالة المناقصة",
      },
      description: "وصف المناقصة",
      description_unformatted: "وصف المناقصة",
      description_structured: {},
      custom_meta_fields: [
        custom_meta_fields.country,
        custom_meta_fields.algerian_state,
        custom_meta_fields.algerian_city,
        custom_meta_fields.ksa_city,
        custom_meta_fields.start_date,
        custom_meta_fields.end_date,
      ],
    },
    {
      slug: "health-service",
      name: "health-service",
      labels: {
        singular: "خدمة صحية",
        plural: "خدمات صحية",
        list: "كل الخدمات الصحية",
        create: "أضف خدمة صحية",
        edit: "تحرير الخدمة الصحية",
        delete: "إزالة الخدمة الصحية",
      },
      description: "وصف الخدمة الصحية",
      description_unformatted: "وصف الخدمة الصحية",
      description_structured: {},
      custom_meta_fields: [
        custom_meta_fields.country,
        custom_meta_fields.algerian_state,
        custom_meta_fields.algerian_city,
        custom_meta_fields.ksa_city,
      ],
    },
    {
      slug: "transportation-service",
      name: "transportation-service",
      labels: {
        singular: "خدمة النقل",
        plural: "خدمات النقل",
        list: "كل خدمات النقل",
        create: "أضف خدمة نقل",
        edit: "تحرير خدمة النقل",
        delete: "إزالة خدمة النقل",
      },
      description: "وصف خدمة النقل",
      description_unformatted: "وصف خدمة النقل",
      description_structured: {},
      custom_meta_fields: [
        custom_meta_fields.country,
        custom_meta_fields.algerian_state,
        custom_meta_fields.algerian_city,
        custom_meta_fields.ksa_city,
      ],
    },
  ],
};

const articleTypesSeedData: {
  types: Partial<Levelup.CMS.V1.Content.Entity.ArticleType>[] | undefined;
  custom_meta_fields: {
    [key: string]: Levelup.CMS.V1.Utils.PropType<
      Levelup.CMS.V1.Content.Entity.ArticleType,
      "custom_meta_fields"
    >[number];
  };
} = _articleTypesSeedData;
const articleTypes = _articleTypesSeedData.types;
export default articleTypesSeedData;
