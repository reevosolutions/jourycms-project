
const custom_meta_fields = {

  country: {
    field_key: "country",
    field_label: "الدولة",
    field_type: "select" as const,
    field_options: {
      choices: [
        {
          value: "dz",
          label: "الجزائر"
        },
        {
          value: "ksa",
          label: "المملكة العربية السعودية"
        }
      ],
      multiple: false
    }
  },
  // trips
  entry_point: {
    field_key: "entry_point",
    field_label: "الدخول",
    field_type: "select" as const,
    field_options: {
      choices: [
        {
          value: "mekkah",
          label: "مكة المكرة"
        },
        {
          value: "madina",
          label: "المدينة المنورة"
        }
      ],
      multiple: false
    }
  },
  medina_mekkah: {
    field_key: "medina_mekkah",
    field_label: "المدينة - مكة",
    field_type: "select" as const,
    field_options: {
      choices: [
        {
          value: "mekkah",
          label: "مكة المكرة"
        },
        {
          value: "madina",
          label: "المدينة المنورة"
        }
      ],
      multiple: false
    }
  } as Levelup.CMS.V1.UI.Forms.CustomFields.MetaField<'select'>,

  price: {
    field_key: "price",
    field_label: "السعر",
    field_type: "number" as const,
    field_options: {
      min: 0,
    }
  },
  shrines: {
    field_key: "shrines",
    field_label: "المزارات",
    field_type: "article_object" as const,
    field_options: {
      type: "shrine",
      multiple: true,
      filter: {}
    }
  } as Levelup.CMS.V1.UI.Forms.CustomFields.MetaField<'article_object', true>,
  departure_airoport: {
    field_key: "departure_airoport",
    field_label: "مطار الإقلاع",
    field_type: "article_object" as const,
    field_options: {
      type: "airoport",
      multiple: false,
      filter: {
        "meta.country": "dz"
      }
    }
  } as Levelup.CMS.V1.UI.Forms.CustomFields.MetaField<'article_object'>,
  arrival_airoport: {
    field_key: "arrival_airoport",
    field_label: "مطار الوصول",
    field_type: "article_object" as const,
    field_options: {
      type: "airoport",
      multiple: false,
      filter: {
        "meta.country": "ksa"
      }
    }
  } as Levelup.CMS.V1.UI.Forms.CustomFields.MetaField<'article_object'>,
  airelines_company: {
    field_key: "airelines_company",
    field_label: "شركة الطيران",
    field_type: "article_object" as const,
    field_options: {
      type: "airelines-company",
      multiple: false
    }
  },
  trip_type: {
    field_key: "trip_type",
    field_label: "نوع الرحلة",
    field_type: "select" as const,
    field_options: {
      choices: [
        {
          value: "umrah",
          label: "عمرة"
        },
        {
          value: "hajj",
          label: "حج"
        }
      ]
    }
  },
  trip_duration: {
    field_key: "trip_duration",
    field_label: "مدة الرحلة",
    field_type: "select" as const,
    field_options: {
      choices: [
        {
          value: "15",
          label: "15 يوم"
        },
        {
          value: "21",
          label: "21 يوم"
        },
        {
          value: "30",
          label: "30 يوم"
        },
        {
          value: "45",
          label: "45 يوم"
        }
      ],
      multiple: false
    }
  } as Levelup.CMS.V1.UI.Forms.CustomFields.MetaField<'select', false>,
  flight_number: {
    field_key: "flight_number",
    field_label: "رقم الرحلة",
    field_type: "text" as const,
    field_options: {
      min: 0,
      max: 255
    }
  } as Levelup.CMS.V1.UI.Forms.CustomFields.MetaField<'text'>,
  flight_date: {
    field_key: "flight_date",
    field_label: "تاريخ الرحلة",
    field_type: "date" as const,
    field_options: {
      format: "YYYY-MM-DD"
    }
  },
  flight_time: {
    field_key: "flight_time",
    field_label: "توقيت الرحلة",
    field_type: "time" as const,
    field_options: {
      format: "HH:mm"
    }
  } as Levelup.CMS.V1.UI.Forms.CustomFields.MetaField<'time'>,
  agency: {
    field_key: "agency",
    field_label: "الوكالة",
    field_type: "article_object" as const,
    field_options: {
      type: "agency",
      multiple: false
    }
  } as Levelup.CMS.V1.UI.Forms.CustomFields.MetaField<'article_object', false>,
  hotel: {
    field_key: "hotel",
    field_label: "الفندق",
    field_type: "article_object" as const,
    field_options: {
      type: "hotel",
      multiple: false
    }
  } as Levelup.CMS.V1.UI.Forms.CustomFields.MetaField<'article_object', false>,
  mekkah_hotel: {
    field_key: "mekkah_hotel",
    field_label: "فندق مكة",
    field_type: "article_object" as const,
    field_options: {
      type: "hotel",
      multiple: false
    }
  } as Levelup.CMS.V1.UI.Forms.CustomFields.MetaField<'article_object', false>,
  madina_hotel: {
    field_key: "madina_hotel",
    field_label: "فندق المدينة",
    field_type: "article_object" as const,
    field_options: {
      type: "hotel",
      multiple: false
    }
  } as Levelup.CMS.V1.UI.Forms.CustomFields.MetaField<'article_object', false>,

  ramdhan_trip: {
    field_key: "ramdhan_trip",
    field_label: "عمرة رمضان",
    field_type: "boolean" as const,
    field_options: {
      default: false
    }
  } as Levelup.CMS.V1.UI.Forms.CustomFields.MetaField<'boolean'>,
  subsistence_at_mekkah: {
    field_key: "subsistence_at_mekkah",
    field_label: "الإعاشة في مكة",
    field_type: "checkbox" as const,
    field_options: {
      choices: [
        {
          value: "breakfast",
          label: "فطور الصباح"
        },
        {
          value: "lunch",
          label: "غداء"
        },
        {
          value: "dinner",
          label: "عشاء"
        },
        {
          value: "iftar",
          label: "إفطار"
        },
        {
          value: "sohor",
          label: "سحور"
        }
      ],
    }
  } as Levelup.CMS.V1.UI.Forms.CustomFields.MetaField<'checkbox'>,
  subsistence_at_madina: {
    field_key: "subsistence_at_madina",
    field_label: "الإعاشة في المدينة",
    field_type: "checkbox" as const,
    field_options: {
      choices: [
        {
          value: "breakfast",
          label: "فطور الصباح"
        },
        {
          value: "lunch",
          label: "غداء"
        },
        {
          value: "dinner",
          label: "عشاء"
        },
        {
          value: "iftar",
          label: "إفطار"
        },
        {
          value: "sohor",
          label: "سحور"
        }
      ],
    }
  } as Levelup.CMS.V1.UI.Forms.CustomFields.MetaField<'checkbox'>,
  shrines_at_mekkah: {
    field_key: "shrines_at_mekkah",
    field_label: "المزارات في مكة",
    field_type: "article_object" as const,
    field_options: {
      type: "shrine",
      multiple: true,
      filter: {
        "meta.medina_mekkah": "mekkah"
      }
    }
  },
  shrines_at_madina: {
    field_key: "shrines_at_madina",
    field_label: "المزارات في المدينة",
    field_type: "article_object" as const,
    field_options: {
      type: "shrine",
      multiple: true,
      filter: {
        "meta.medina_mekkah": "madina"
      }
    }
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
          label: "1 نجمة"
        },
        {
          value: "2",
          label: "2 نجمة"
        },
        {
          value: "3",
          label: "3 نجمة"
        },
        {
          value: "4",
          label: "4 نجمة"
        },
        {
          value: "5",
          label: "5 نجمة"
        }
      ],
      multiple: false
    }
  },
  distance_to_haram: {
    field_key: "distance_to_haram",
    field_label: "المسافة إلى الحرم",
    field_type: "number" as const,
    field_options: {
      min: 0
    }
  },
  transportation_to_haram: {
    field_key: "transportation_to_haram",
    field_label: "النقل إلى الحرم",
    field_type: "select" as const,
    field_options: {
      choices: [
        {
          value: "walk",
          label: "مشي"
        },
        {
          value: "bus",
          label: "باص"
        },
        {
          value: "car",
          label: "سيارة"
        }
      ],
      multiple: false
    }
  },
  hotel_services: {
    field_key: "hotel_services",
    field_label: "خدمات الفندق",
    field_type: "select" as const,
    field_options: {
      choices: [
        {
          value: "room_service",
          label: "خدمة الغرف"
        },
        {
          value: "restaurant",
          label: "مطعم"
        },
        {
          value: "gym",
          label: "صالة رياضية"
        },
        {
          value: "pool",
          label: "مسبح"
        }
      ],
      multiple: true
    }
  },

  // agencies
  gallery: {
    field_key: "gallery",
    field_label: "الصور",
    field_type: "image" as const,
    field_options: {
      multiple: true
    }
  }

};

const articleTypesSeedData: {
  types: Partial<Levelup.CMS.V1.Content.Entity.ArticleType>[] | undefined;
  custom_meta_fields: { [key: string]: Levelup.CMS.V1.Utils.PropType<Levelup.CMS.V1.Content.Entity.ArticleType, 'custom_meta_fields'>[number] };
} = {
  custom_meta_fields,
  types: [
    {
      "slug": "blog",
      "name": "blog",
      "labels": {
        "singular": "مقال",
        "plural": "مقالات",
        "list": "كل المقالات",
        "create": "أضف مقال",
        "edit": "تحرير المقال",
        "delete": "إزالة المقال"
      },
      "description": "وصف مقال",
      "description_unformatted": "وصف مقال",
      "description_structured": {},
      "custom_meta_fields": Object.values(custom_meta_fields),
    },
    {
      "slug": "trip",
      "name": "trip",
      "labels": {
        "singular": "رحلة",
        "plural": "رحلات",
        "list": "كل الرحلات",
        "create": "أضف رحلة",
        "edit": "تحرير الرحلة",
        "delete": "إزالة الرحلة"
      },
      "description": "وصف رحلة",
      "description_unformatted": "وصف رحلة",
      "description_structured": {},
      "custom_meta_fields": [
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
        custom_meta_fields.subsistence_at_mekkah,
        custom_meta_fields.subsistence_at_madina,
        custom_meta_fields.shrines_at_mekkah,
        custom_meta_fields.shrines_at_madina,
        custom_meta_fields.mekkah_hotel,
        custom_meta_fields.madina_hotel

      ]
    },
    {
      slug: "shrine",
      name: "shrine",
      "labels": {
        "singular": "مزار",
        "plural": "مزارات",
        "list": "كل المزارات",
        "create": "أضف مزار",
        "edit": "تحرير المزار",
        "delete": "إزالة المزار"
      },
      "description": "وصف مزار",
      "description_unformatted": "وصف مزار",
      "description_structured": {},
      "custom_meta_fields": [
        custom_meta_fields.medina_mekkah
      ]
    },
    {
      "slug": "airelines-company",
      "name": "airelines company",
      "labels": {
        "singular": "شركة طيران",
        "plural": "شركات الطيران",
        "list": "كل شركات الطيران",
        "create": "أضف شركة طيران",
        "edit": "تحرير شركة الطيران",
        "delete": "إزالة شركة الطيران"
      },
      "description": "وصف شركة طيران",
      "description_unformatted": "وصف شركة طيران",
      "description_structured": {},
      "custom_meta_fields": [
        custom_meta_fields.country
      ]
    },
    {
      "slug": "hotel",
      "name": "hotel",
      "labels": {
        "singular": "فندق",
        "plural": "فنادق",
        "list": "كل الفنادق",
        "create": "أضف فندق",
        "edit": "تحرير الفندق",
        "delete": "إزالة الفندق"
      },
      "description": "وصف فندق",
      "description_unformatted": "وصف فندق",
      "description_structured": {},
      "custom_meta_fields": [
        custom_meta_fields.medina_mekkah,
        custom_meta_fields.hotel_rating,
        custom_meta_fields.distance_to_haram,
        custom_meta_fields.transportation_to_haram,
        custom_meta_fields.hotel_services,
      ]
    },
    {
      "slug": "airoport",
      "name": "airoport",
      "labels": {
        "singular": "مطار",
        "plural": "مطارات",
        "list": "كل المطارات",
        "create": "أضف مطار",
        "edit": "تحرير المطار",
        "delete": "إزالة المطار"
      },
      "description": "وصف مطار",
      "description_unformatted": "وصف مطار",
      "description_structured": {},
      "custom_meta_fields": [
        custom_meta_fields.country
      ]
    },
    {
      "slug": "gift",
      "name": "gift",
      "labels": {
        "singular": "هدية",
        "plural": "هدايا",
        "list": "كل الهدايا",
        "create": "أضف هدية",
        "edit": "تحرير الهدية",
        "delete": "إزالة الهدية"
      },
      "description": "وصف هدية",
      "description_unformatted": "وصف هدية",
      "description_structured": {},
      "custom_meta_fields": [
        custom_meta_fields.price
      ]
    },
    {
      "slug": "agency",
      "name": "agency",
      "labels": {
        "singular": "وكالة سياحة",
        "plural": "وكالات السياحة",
        "list": "كل وكالات السياحة",
        "create": "أضف وكالة سياحة",
        "edit": "تحرير وكالة السياحة",
        "delete": "إزالة وكالة السياحة"
      },
      "description": "وصف وكالة سياحة",
      "description_unformatted": "وصف وكالة سياحة",
      "description_structured": {},
      "custom_meta_fields": [
        custom_meta_fields.gallery
      ]
    }
  ]
};


export default articleTypesSeedData;