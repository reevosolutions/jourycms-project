// eslint-disable-next-line import/no-named-as-default
import medical_specialities from "./medical-specialities.config";

export const custom_meta_fields = {
  // trips
  entry_point: {
    field_key: "entry_point" as const,
    field_label: "الدخول",
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
  } as Levelup.CMS.V1.Content.CustomFields.MetaField<"select"> & {
    field_key: "entry_point";
  },
  medina_mekkah: {
    field_key: "medina_mekkah" as const,
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
  } as Levelup.CMS.V1.Content.CustomFields.MetaField<"select"> & {
    field_key: "medina_mekkah";
  },
  price: {
    field_key: "price" as const,
    field_label: "السعر",
    field_type: "number" as const,
    field_options: {
      min: 0,
    },
  } as Levelup.CMS.V1.Content.CustomFields.MetaField<"number"> & {
    field_key: "price";
  },
  price_of_five_persons_room: {
    field_key: "price_of_five_persons_room" as const,
    field_label: "سعر الشخص في الغرفة الخماسية",
    field_type: "number" as const,
    field_options: {
      min: 0,
      default_value: 0,
    },
  } as Levelup.CMS.V1.Content.CustomFields.MetaField<"number"> & {
    field_key: "price_of_five_persons_room";
  },

  price_of_four_persons_room: {
    field_key: "price_of_four_persons_room" as const,
    field_label: "سعر الشخص في الغرفة الرباعية",
    field_type: "number" as const,
    field_options: {
      min: 0,
      default_value: 0,
    },
  } as Levelup.CMS.V1.Content.CustomFields.MetaField<"number"> & {
    field_key: "price_of_four_persons_room";
  },

  price_of_three_persons_room: {
    field_key: "price_of_three_persons_room" as const,
    field_label: "سعر الشخص في الغرفة الثلاثية",
    field_type: "number" as const,
    field_options: {
      min: 0,
      default_value: 0,
    },
  } as Levelup.CMS.V1.Content.CustomFields.MetaField<"number"> & {
    field_key: "price_of_three_persons_room"; // replace this empty string by the attributted field_key
  },

  price_of_two_persons_room: {
    field_key: "price_of_two_persons_room" as const,
    field_label: "سعر الشخص في الغرفة الثنائية",
    field_type: "number" as const,
    field_options: {
      min: 0,
      default_value: 0,
    },
  } as Levelup.CMS.V1.Content.CustomFields.MetaField<"number"> & {
    field_key: "price_of_two_persons_room"; // replace this empty string by the attributted field_key
  },

  price_of_single_person_room: {
    field_key: "price_of_single_person_room" as const,
    field_label: "سعر الشخص في الغرفة الأحادية",
    field_type: "number" as const,
    field_options: {
      min: 0,
      default_value: 0,
    },
  } as Levelup.CMS.V1.Content.CustomFields.MetaField<"number"> & {
    field_key: "price_of_single_person_room"; // replace this empty string by the attributted field_key
  },
  price_of_child_with_bed: {
    field_key: "price_of_child_with_bed" as const,
    field_label: "سعر الطفل مع سرير",
    field_type: "number" as const,
    field_options: {
      min: 0,
      default_value: 0,
    },
  } as Levelup.CMS.V1.Content.CustomFields.MetaField<"number"> & {
    field_key: "price_of_child_with_bed";
  },

  price_of_child_without_bed: {
    field_key: "price_of_child_without_bed" as const,
    field_label: "سعر الطفل بدون سرير",
    field_type: "number" as const,
    field_options: {
      min: 0,
      default_value: 0,
    },
  } as Levelup.CMS.V1.Content.CustomFields.MetaField<"number"> & {
    field_key: "price_of_child_without_bed";
  },

  price_of_infant: {
    field_key: "price_of_infant" as const,
    field_label: "سعر الرضيع",
    field_type: "number" as const,
    field_options: {
      min: 0,
      default_value: 0,
    },
  } as Levelup.CMS.V1.Content.CustomFields.MetaField<"number"> & {
    field_key: "price_of_infant"; // replace this empty string by the attributted field_key
  },
  health_services: {
    field_key: "health_services" as const,
    field_label: "الخدمات الصحية",
    field_type: "checkbox" as const,
    field_options: {
      choices: [
        {
          value: "accompanying_doctor",
          label: "طبيب مرافق",
        },
        {
          value: "accompanying_nurse",
          label: "ممرض مرافق",
        },
      ],
    },
  } as Levelup.CMS.V1.Content.CustomFields.MetaField<"checkbox"> & {
    field_key: "health_services"; // replace this empty string by the attributted field_key
  },
  group_activities: {
    field_key: "group_activities" as const,
    field_label: "الأعمال الجماعية",
    field_type: "checkbox" as const,
    field_options: {
      choices: [
        {
          value: "group_fasting",
          label: "صيام جماعي",
        },
        {
          value: "group_tawaf",
          label: "طواف جماعي",
        },
        {
          value: "voluntary_group_umrah",
          label: "عمرة تطوعية جماعية",
        },
      ],
    },
  } as Levelup.CMS.V1.Content.CustomFields.MetaField<"checkbox"> & {
    field_key: "group_activities"; // replace this empty string by the attributted field_key
  },
  gifts: {
    field_key: "gifts" as const,
    field_label: "الهدايا",
    field_type: "checkbox" as const,
    field_options: {
      choices: [
        {
          value: "bag",
          label: "حقيبة",
        },
        {
          value: "ihram",
          label: "احرام",
        },
        {
          value: "khimar",
          label: "خمار",
        },
        {
          value: "zamzam_bucket",
          label: "دلو زمزم",
        },
        {
          value: "sim_card",
          label: "شريحة",
        },
      ],
    },
  } as Levelup.CMS.V1.Content.CustomFields.MetaField<"checkbox"> & {
    field_key: "gifts"; // replace this empty string by the attributted field_key
  },

  experience_years: {
    field_key: "experience_years" as const,
    field_label: "سنوات الخبرة",
    field_type: "number" as const,
    field_options: {
      min: 0,
    },
  } as Levelup.CMS.V1.Content.CustomFields.MetaField<"number"> & {
    field_key: "experience_years"; // replace this empty string by the attributted field_key
  },
  shrines: {
    field_key: "shrines" as const,
    field_label: "المزارات",
    field_type: "article_object" as const,
    field_options: {
      type: "shrine",
      multiple: true,
      filter: {},
    },
  } as Levelup.CMS.V1.Content.CustomFields.MetaField<"article_object", true> & {
    field_key: "shrines"; // replace this empty string by the attributted field_key
  },
  departure_airoport: {
    field_key: "departure_airoport" as const,
    field_label: "مطار الإقلاع",
    field_type: "article_object" as const,
    field_options: {
      type: "airoport",
      multiple: false,
      filter: {
        "meta_fields.country": "dz",
      },
    },
  } as Levelup.CMS.V1.Content.CustomFields.MetaField<"article_object"> & {
    field_key: "departure_airoport"; // replace this empty string by the attributted field_key
  },
  ongoing_stop: {
    field_key: "ongoing_stop" as const,
    field_label: "نقطة العبور في الذهاب",
    field_type: "text" as const,
    field_options: {
      default_value: "",
    },
  } as Levelup.CMS.V1.Content.CustomFields.MetaField<"text"> & {
    field_key: "ongoing_stop"; // replace this empty string by the attributted field_key
  },

  incoming_stop: {
    field_key: "incoming_stop" as const,
    field_label: "نقطة العبور في الإياب",
    field_type: "text" as const,
    field_options: {
      default_value: "",
    },
  } as Levelup.CMS.V1.Content.CustomFields.MetaField<"text"> & {
    field_key: "incoming_stop"; // replace this empty string by the attributted field_key
  },

  arrival_airoport: {
    field_key: "arrival_airoport" as const,
    field_label: "مطار الوصول",
    field_type: "article_object" as const,
    field_options: {
      type: "airoport",
      multiple: false,
      filter: {
        "meta_fields.country": "ksa",
      },
    },
  } as Levelup.CMS.V1.Content.CustomFields.MetaField<"article_object"> & {
    field_key: "arrival_airoport"; // replace this empty string by the attributted field_key
  },
  airelines_company: {
    field_key: "airelines_company" as const,
    field_label: "شركة الطيران",
    field_type: "article_object" as const,
    field_options: {
      type: "airelines-company",
      multiple: false,
    },
  } as Levelup.CMS.V1.Content.CustomFields.MetaField<"article_object"> & {
    field_key: "airelines_company"; // replace this empty string by the attributted field_key
  },
  program_type: {
    field_key: "program_type" as const,
    field_label: "نوع البرنامج",
    field_type: "select" as const,
    field_options: {
      choices: [
        {
          value: "economy",
          label: "اقتصادي",
        },
        {
          value: "normal",
          label: "عادي",
        },
        {
          value: "premium",
          label: "مميز",
        },
        {
          value: "deluxe",
          label: "فاخر",
        },
      ],
    },
  } as Levelup.CMS.V1.Content.CustomFields.MetaField<"select"> & {
    field_key: "program_type"; // replace this empty string by the attributted field_key
  },
  trip_type: {
    field_key: "trip_type" as const,
    field_label: "نوع الرحلة",
    field_type: "select" as const,
    field_options: {
      choices: [
        {
          value: "direct",
          label: "مباشرة",
        },
        {
          value: "indirect",
          label: "غير مباشرة",
        },
      ],
    },
  } as Levelup.CMS.V1.Content.CustomFields.MetaField<"select"> & {
    field_key: "trip_type"; // replace this empty string by the attributted field_key
  },
  payment_mode: {
    field_key: "payment_mode" as const,
    field_label: "طريقة الدفع",
    field_type: "select" as const,
    field_options: {
      choices: [
        {
          value: "cash",
          label: "كاش",
        },
        {
          value: "installment",
          label: "بالتقسيط",
        },
      ],
    },
  } as Levelup.CMS.V1.Content.CustomFields.MetaField<"select", false> & {
    field_key: "payment_mode"; // replace this empty string by the attributted field_key
  },
  installment_initial_payment: {
    field_key: "installment_initial_payment" as const,
    field_label: "الدفع الاولي",
    field_type: "number" as const,
    field_options: {
      min: 0,
      constraints: [
        {
          field: "payment_mode",
          operator: "eq",
          value: "installment",
        },
      ],
    },
  } as Levelup.CMS.V1.Content.CustomFields.MetaField<"number", false> & {
    field_key: "installment_initial_payment"; // replace this empty string by the attributted field_key
  },
  short_name: {
    field_key: "short_name" as const,
    field_label: "الإسم المختصر",
    field_type: "text" as const,
    field_options: {},
  } as Levelup.CMS.V1.Content.CustomFields.MetaField<"text", false> & {
    field_key: "short_name"; // replace this empty string by the attributted field_key
  },
  phone_number: {
    field_key: "phone_number" as const,
    field_label: "رقم الهاتف",
    field_type: "text" as const,
    field_options: {},
  } as Levelup.CMS.V1.Content.CustomFields.MetaField<"text", false> & {
    field_key: "phone_number"; // replace this empty string by the attributted field_key
  },
  installment_number_of_installments: {
    field_key: "installment_number_of_installments" as const,
    field_label: "عدد الاقساط",
    field_type: "number" as const,
    field_options: {
      min: 1,
      constraints: [
        {
          field: "payment_mode",
          operator: "eq",
          value: "installment",
        },
      ],
    },
  } as Levelup.CMS.V1.Content.CustomFields.MetaField<"number", false> & {
    field_key: "installment_number_of_installments"; // replace this empty string by the attributted field_key
  },
  trip_start_date: {
    field_key: "trip_start_date" as const,
    field_label: "تاريخ بداية الرحلة",
    field_type: "date" as const,
    field_options: {
      format: "YYYY-MM-DD",
    },
  } as Levelup.CMS.V1.Content.CustomFields.MetaField<"date"> & {
    field_key: "trip_start_date"; // replace this empty string by the attributted field_key
  },
  trip_end_date: {
    field_key: "trip_end_date" as const,
    field_label: "تاريخ نهاية الرحلة",
    field_type: "date" as const,
    field_options: {
      format: "YYYY-MM-DD",
    },
  } as Levelup.CMS.V1.Content.CustomFields.MetaField<"date"> & {
    field_key: "trip_end_date"; // replace this empty string by the attributted field_key
  },
  trip_duration: {
    field_key: "trip_duration" as const,
    field_label: "مدة الرحلة",
    field_type: "select" as const,
    field_options: {
      choices: [
        {
          value: "5",
          label: "5 أيام",
        },
        {
          value: "7",
          label: "7 أيام",
        },
        {
          value: "10",
          label: "10 أيام",
        },
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
  } as Levelup.CMS.V1.Content.CustomFields.MetaField<"select", false> & {
    field_key: "trip_duration"; // replace this empty string by the attributted field_key
  },
  flight_number: {
    field_key: "flight_number" as const,
    field_label: "رقم الرحلة",
    field_type: "text" as const,
    field_options: {
      min: 0,
      max: 255,
    },
  } as Levelup.CMS.V1.Content.CustomFields.MetaField<"text"> & {
    field_key: "flight_number"; // replace this empty string by the attributted field_key
  },

  start_date: {
    field_key: "start_date" as const,
    field_label: "تاريخ البداية",
    field_type: "date" as const,
    field_options: {
      format: "YYYY-MM-DD",
    },
  } as Levelup.CMS.V1.Content.CustomFields.MetaField<"date"> & {
    field_key: "start_date"; // replace this empty string by the attributted field_key
  },
  end_date: {
    field_key: "end_date" as const,
    field_label: "تاريخ النهاية",
    field_type: "date" as const,
    field_options: {
      format: "YYYY-MM-DD",
    },
  } as Levelup.CMS.V1.Content.CustomFields.MetaField<"date"> & {
    field_key: "end_date"; // replace this empty string by the attributted field_key
  },
  flight_time: {
    field_key: "flight_time" as const,
    field_label: "توقيت الرحلة",
    field_type: "time" as const,
    field_options: {
      format: "HH:mm",
    },
  } as Levelup.CMS.V1.Content.CustomFields.MetaField<"time"> & {
    field_key: "flight_time"; // replace this empty string by the attributted field_key
  },
  agency: {
    field_key: "agency" as const,
    field_label: "الوكالة",
    field_type: "article_object" as const,
    field_options: {
      type: "agency",
      multiple: false,
    },
  } as Levelup.CMS.V1.Content.CustomFields.MetaField<
    "article_object",
    false
  > & {
    field_key: "agency"; // replace this empty string by the attributted field_key
  },
  hotel: {
    field_key: "hotel" as const,
    field_label: "الفندق",
    field_type: "article_object" as const,
    field_options: {
      type: "hotel",
      multiple: false,
    },
  } as Levelup.CMS.V1.Content.CustomFields.MetaField<
    "article_object",
    false
  > & {
    field_key: "hotel"; // replace this empty string by the attributted field_key
  },
  mekkah_hotel: {
    field_key: "mekkah_hotel" as const,
    field_label: "فندق مكة",
    field_type: "article_object" as const,
    field_options: {
      type: "hotel",
      multiple: false,
      filter: {
        "meta_fields.medina_mekkah": "mekkah",
      },
    },
  } as Levelup.CMS.V1.Content.CustomFields.MetaField<
    "article_object",
    false
  > & {
    field_key: "mekkah_hotel"; // replace this empty string by the attributted field_key
  },
  medina_hotel: {
    field_key: "medina_hotel" as const,
    field_label: "فندق المدينة",
    field_type: "article_object" as const,
    field_options: {
      type: "hotel",
      multiple: false,
      filter: {
        "meta_fields.medina_mekkah": "medina",
      },
    },
  } as Levelup.CMS.V1.Content.CustomFields.MetaField<
    "article_object",
    false
  > & {
    field_key: "medina_hotel"; // replace this empty string by the attributted field_key
  },
  website: {
    field_key: "website" as const,
    field_label: "الموقع الإلكتروني",
    field_type: "text" as const,
    field_options: {},
  } as Levelup.CMS.V1.Content.CustomFields.MetaField<"text", false> & {
    field_key: "website"; // replace this empty string by the attributted field_key
  },
  ramadhan_trip: {
    field_key: "ramadhan_trip" as const,
    field_label: "عمرة رمضان",
    field_type: "boolean" as const,
    field_options: {
      default: false,
    },
  } as Levelup.CMS.V1.Content.CustomFields.MetaField<"boolean"> & {
    field_key: "ramadhan_trip"; // replace this empty string by the attributted field_key
  },
  program_services: {
    field_key: "program_services" as const,
    field_label: "خدمات البرنامج",
    field_type: "checkbox" as const,
    field_options: {
      choices: [
        {
          value: "visa",
          label: "تأشيرة",
        },
        {
          value: "flight_ticket",
          label: "تذكرة طيران",
        },
        {
          value: "airport_to_hotel_transfer",
          label: "النقل من المطار الى الفندق",
        },
        {
          value: "mecca_to_medina_transfer",
          label: "النقل بين مكة و المدينة",
        },
        {
          value: "guided_umrah",
          label: "عمرة مع مرشد",
        },
        {
          value: "mecca_sites",
          label: "مزارات مكة",
        },
        {
          value: "medina_sites",
          label: "مزارات المدينة",
        },
        {
          value: "gift",
          label: "هدية",
        },
      ],
    },
  } as Levelup.CMS.V1.Content.CustomFields.MetaField<"checkbox"> & {
    field_key: "program_services"; // replace this empty string by the attributted field_key
  },
  subsistence_at_mekkah: {
    field_key: "subsistence_at_mekkah" as const,
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
  } as Levelup.CMS.V1.Content.CustomFields.MetaField<"checkbox"> & {
    field_key: "subsistence_at_mekkah"; // replace this empty string by the attributted field_key
  },
  subsistence_at_medina: {
    field_key: "subsistence_at_medina" as const,
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
  } as Levelup.CMS.V1.Content.CustomFields.MetaField<"checkbox"> & {
    field_key: "subsistence_at_medina"; // replace this empty string by the attributted field_key
  },
  shrines_at_mekkah: {
    field_key: "shrines_at_mekkah" as const,
    field_label: "المزارات في مكة",
    field_type: "article_object" as const,
    field_options: {
      type: "shrine",
      multiple: true,
      filter: {
        "meta_fields.medina_mekkah": "mekkah",
      },
    },
  } as Levelup.CMS.V1.Content.CustomFields.MetaField<"article_object", true> & {
    field_key: "shrines_at_mekkah"; // replace this empty string by the attributted field_key
  },
  shrines_at_medina: {
    field_key: "shrines_at_medina" as const,
    field_label: "المزارات في المدينة",
    field_type: "article_object" as const,
    field_options: {
      type: "shrine",
      multiple: true,
      filter: {
        "meta_fields.medina_mekkah": "medina",
      },
    },
  } as Levelup.CMS.V1.Content.CustomFields.MetaField<"article_object", true> & {
    field_key: "shrines_at_medina"; // replace this empty string by the attributted field_key
  },

  // hotels
  hotel_rating: {
    field_key: "hotel_rating" as const,
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
          label: "3 نجوم",
        },
        {
          value: "4",
          label: "4 نجوم",
        },
        {
          value: "5",
          label: "5 نجوم",
        },
      ],
      multiple: false,
    },
  } as Levelup.CMS.V1.Content.CustomFields.MetaField<"select"> & {
    field_key: "hotel_rating"; // replace this empty string by the attributted field_key
  },
  distance_to_haram: {
    field_key: "distance_to_haram" as const,
    field_label: "المسافة إلى الحرم",
    field_type: "number" as const,
    field_options: {
      min: 0,
    },
  } as Levelup.CMS.V1.Content.CustomFields.MetaField<"number"> & {
    field_key: "distance_to_haram"; // replace this empty string by the attributted field_key
  },
  transportation_to_haram: {
    field_key: "transportation_to_haram" as const,
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
  } as Levelup.CMS.V1.Content.CustomFields.MetaField<"select", false> & {
    field_key: "transportation_to_haram"; // replace this empty string by the attributted field_key
  },
  hotel_services: {
    field_key: "hotel_services" as const,
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
  } as Levelup.CMS.V1.Content.CustomFields.MetaField<"select", true> & {
    field_key: "hotel_services"; // replace this empty string by the attributted field_key
  },

  country: {
    field_key: "country" as const,
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
  } as Levelup.CMS.V1.Content.CustomFields.MetaField<"select", false> & {
    field_key: "country"; // replace this empty string by the attributted field_key
  },
  algerian_state: {
    field_key: "state" as const,
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
  } as Levelup.CMS.V1.Content.CustomFields.MetaField<
    "algerian_state",
    false
  > & {
    field_key: "state"; // replace this empty string by the attributted field_key
  },
  algerian_city: {
    field_key: "city" as const,
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
  } as Levelup.CMS.V1.Content.CustomFields.MetaField<"algerian_city", false> & {
    field_key: "city"; // replace this empty string by the attributted field_key
  },
  ksa_city: {
    field_key: "ksa_city" as const,
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
  } as Levelup.CMS.V1.Content.CustomFields.MetaField<"ksa_city", false> & {
    field_key: "ksa_city"; // replace this empty string by the attributted field_key
  },
  // agencies
  logo: {
    field_key: "logo" as const,
    field_label: "اللوغو",
    field_type: "image" as const,
    field_options: {
      multiple: false,
    },
  } as Levelup.CMS.V1.Content.CustomFields.MetaField<"image", false> & {
    field_key: "logo"; // replace this empty string by the attributted field_key
  },
  gallery: {
    field_key: "gallery" as const,
    field_label: "الصور",
    field_type: "image" as const,
    field_options: {
      multiple: true,
    },
  } as Levelup.CMS.V1.Content.CustomFields.MetaField<"image", true> & {
    field_key: "gallery"; // replace this empty string by the attributted field_key
  },
  files: {
    field_key: "files" as const,
    field_label: "files",
    field_type: "file" as const,
    field_options: {
      multiple: true,
      accept: ["pdf", "images", "word", "excel"],
    },
  } as Levelup.CMS.V1.Content.CustomFields.MetaField<"file", true> & {
    field_key: "files"; // replace this empty string by the attributted field_key
  },
  // members
  avatar: {
    field_key: "avatar" as const,
    field_label: "صورة البروفايل",
    field_type: "image" as const,
    field_options: {
      multiple: false,
    },
  } as Levelup.CMS.V1.Content.CustomFields.MetaField<"image", false> & {
    field_key: "avatar"; // replace this empty string by the attributted field_key
  },
  medical_speciality: {
    field_key: "medical_speciality" as const,
    field_label: "التخصص",
    field_type: "select" as const,
    field_options: {
      choices: medical_specialities,
      multiple: false,
    },
  } as Levelup.CMS.V1.Content.CustomFields.MetaField<"select", false> & {
    field_key: "medical_speciality"; // replace this empty string by the attributted field_key
  },
  sex: {
    field_key: "sex" as const,
    field_label: "الجنس",
    field_type: "select" as const,
    field_options: {
      choices: [
        {
          value: "male",
          label: "ذكر",
        },
        {
          value: "female",
          label: "أنثى",
        },
      ],
      multiple: false,
    },
  } as Levelup.CMS.V1.Content.CustomFields.MetaField<"select", false> & {
    field_key: "sex"; // replace this empty string by the attributted field_key
  },
} as const;


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
        custom_meta_fields.program_type,
        custom_meta_fields.ramadhan_trip,
        custom_meta_fields.trip_start_date,
        custom_meta_fields.trip_end_date,
        custom_meta_fields.trip_duration,
        custom_meta_fields.departure_airoport,
        custom_meta_fields.arrival_airoport,
        custom_meta_fields.ongoing_stop,
        custom_meta_fields.incoming_stop,
        custom_meta_fields.trip_type,
        custom_meta_fields.airelines_company,
        //
        custom_meta_fields.flight_number,
        custom_meta_fields.flight_time,
        custom_meta_fields.entry_point,
        //
        custom_meta_fields.mekkah_hotel,
        custom_meta_fields.medina_hotel,
        //
        custom_meta_fields.price_of_five_persons_room,
        custom_meta_fields.price_of_four_persons_room,
        custom_meta_fields.price_of_three_persons_room,
        custom_meta_fields.price_of_two_persons_room,
        custom_meta_fields.price_of_single_person_room,
        custom_meta_fields.price_of_child_with_bed,
        custom_meta_fields.price_of_child_without_bed,
        custom_meta_fields.price_of_infant,
        //
        custom_meta_fields.payment_mode,
        custom_meta_fields.installment_initial_payment,
        custom_meta_fields.installment_number_of_installments,
        //
        custom_meta_fields.health_services,
        custom_meta_fields.group_activities,
        custom_meta_fields.program_services,
        custom_meta_fields.gifts,
        //
        custom_meta_fields.subsistence_at_mekkah,
        custom_meta_fields.subsistence_at_medina,
        //
        custom_meta_fields.shrines_at_mekkah,
        custom_meta_fields.shrines_at_medina,
      ],
    },
    {
      slug: "hajj",
      name: "hajj",
      labels: {
        singular: "عرض حج",
        plural: "عروض الحج",
        list: "كل عروض الحج",
        create: "أضف عرض حج",
        edit: "تحرير عرض حج",
        delete: "إزالة عرض حج",
      },
      description: "وصف عرض الحج",
      description_unformatted: "وصف عرض الحج",
      description_structured: {},
      custom_meta_fields: [
        custom_meta_fields.agency,
        custom_meta_fields.program_type,
        custom_meta_fields.trip_start_date,
        custom_meta_fields.trip_end_date,
        custom_meta_fields.trip_duration,
        custom_meta_fields.departure_airoport,
        custom_meta_fields.arrival_airoport,
        custom_meta_fields.ongoing_stop,
        custom_meta_fields.incoming_stop,
        custom_meta_fields.trip_type,
        custom_meta_fields.airelines_company,
        //
        custom_meta_fields.flight_number,
        custom_meta_fields.flight_time,
        custom_meta_fields.entry_point,
        //
        custom_meta_fields.mekkah_hotel,
        custom_meta_fields.medina_hotel,
        //
        custom_meta_fields.price_of_five_persons_room,
        custom_meta_fields.price_of_four_persons_room,
        custom_meta_fields.price_of_three_persons_room,
        custom_meta_fields.price_of_two_persons_room,
        custom_meta_fields.price_of_single_person_room,
        custom_meta_fields.price_of_child_with_bed,
        custom_meta_fields.price_of_child_without_bed,
        custom_meta_fields.price_of_infant,
        //
        custom_meta_fields.payment_mode,
        custom_meta_fields.installment_initial_payment,
        custom_meta_fields.installment_number_of_installments,
        //
        custom_meta_fields.health_services,
        custom_meta_fields.group_activities,
        custom_meta_fields.program_services,
        custom_meta_fields.gifts,
        //
        custom_meta_fields.subsistence_at_mekkah,
        custom_meta_fields.subsistence_at_medina,
        //
        custom_meta_fields.shrines_at_mekkah,
        custom_meta_fields.shrines_at_medina,
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
        custom_meta_fields.logo,
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
        custom_meta_fields.website,
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
        custom_meta_fields.website,
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
        custom_meta_fields.phone_number,
        custom_meta_fields.short_name,
        custom_meta_fields.country,
        custom_meta_fields.algerian_state,
        custom_meta_fields.algerian_city,
        custom_meta_fields.ksa_city,
        custom_meta_fields.website,
        // custom_meta_fields.gallery,
        // custom_meta_fields.files,
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
} as const;

const articleTypesSeedData: {
  types: Partial<Levelup.CMS.V1.Content.Entity.ArticleType>[] | undefined;
  custom_meta_fields: {
    [key: string]: Levelup.CMS.V1.Utils.PropType<
      Levelup.CMS.V1.Content.Entity.ArticleType,
      "custom_meta_fields"
    >[number];
  };
} = _articleTypesSeedData as any;

const articleTypes = _articleTypesSeedData.types;
export default articleTypesSeedData;

type DeepMutable<T> = {
  -readonly [K in keyof T]: T[K] extends object ? DeepMutable<T[K]> : T[K];
};

export type TArticleTypes = (typeof articleTypes)[number];
export type TArticleTypeName = (typeof articleTypes)[number]["slug"];

export type TArticleType<T extends TArticleTypeName> = TArticleTypes & {
  slug: T;
} & Pick<
    Levelup.CMS.V1.Content.Entity.ArticleType,
    "_id" | "related_taxonomies" | "insights" | "snapshots"
  >;

export type TArticleTypeCustomField<T extends TArticleTypeName> =
  TArticleType<T>["custom_meta_fields"][number];
export type TArticleTypeCustomFieldType<T extends TArticleTypeName> =
  TArticleType<T>["custom_meta_fields"][number]["field_type"];
export type TArticleTypeCustomFieldName<T extends TArticleTypeName> =
  TArticleType<T>["custom_meta_fields"][number]["field_key"];

export type TCustomArticle<T extends TArticleTypeName> = Omit<
  Levelup.CMS.V1.Content.Entity.Article,
  "meta_fields"
> & {
  meta_fields: Record<TArticleTypeCustomFieldName<T>, any>;
};

/**
 * Typing tests
 */
const test0: TArticleTypeName = "bid";
const test1: TArticleTypeCustomFieldName<"bid"> = "ksa_city";
const test2: TArticleTypeCustomFieldType<"bid"> = "ksa_city";
const test3: TArticleTypeCustomField<"bid"> = custom_meta_fields.country;
