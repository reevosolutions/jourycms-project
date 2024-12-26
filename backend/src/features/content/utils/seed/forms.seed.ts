export const miqate_forms = [
  {
    name: "اطلب العرض",
    slug: "order-offer",
    fields: [
      {
        field_key: "article_id",
        field_label: "معرف المقال",
        field_type: "text",
        field_options: {
          required: true,
        },
      } as Levelup.CMS.V1.Content.CustomFields.MetaField<"text"> & {
        field_key: "article_id";
      },
      {
        field_key: "article_slug",
        field_label: " رابط المقال",
        field_type: "text",
        field_options: {
          required: true,
        },
      } as Levelup.CMS.V1.Content.CustomFields.MetaField<"text"> & {
        field_key: "article_slug";
      },
      {
        field_key: "article_title",
        field_label: "عنوان المقال",
        field_type: "text",
        field_options: {
          required: true,
        },
      } as Levelup.CMS.V1.Content.CustomFields.MetaField<"text"> & {
        field_key: "article_title";
      },
      {
        field_key: "agency_id",
        field_label: "معرف الوكالة",
        field_type: "text",
        field_options: {
          required: true,
        },
      } as Levelup.CMS.V1.Content.CustomFields.MetaField<"text"> & {
        field_key: "agency_id";
      },
      {
        field_key: "agency_name",
        field_label: "اسم الوكالة",
        field_type: "text",
        field_options: {
          required: false,
        },
      } as Levelup.CMS.V1.Content.CustomFields.MetaField<"text"> & {
        field_key: "agency_name";
      },
      {
        field_key: "article_type",
        field_label: "نوع المقال",
        field_type: "text",
        field_options: {
          required: false,
        },
      } as Levelup.CMS.V1.Content.CustomFields.MetaField<"text"> & {
        field_key: "article_type";
      },
      {
        field_key: "phone",
        field_label: "الهاتف",
        field_type: "text",
        field_options: {
          required: true,
        },
      } as Levelup.CMS.V1.Content.CustomFields.MetaField<"text"> & {
        field_key: "phone";
      },
    ],
    settings: {
      has_reset_button: true,
      reset_button_label: "إعادة تعبئة النموذج",
      has_submit_button: true,
      submit_button_label: "إرسال الطلب",
      shown_fields_on_dashboard: ["phone", "article_title", "agency_name", ],
    }
  },
  {
    name: "عمرة على المقاس",
    slug: "omrah-on-demand",
    fields: [
      {
        field_key: "first_name",
        field_label: "الاسم الأول",
        field_type: "text",
        field_options: {
          required: true,
        },
      } as Levelup.CMS.V1.Content.CustomFields.MetaField<"text"> & {
        field_key: "first_name";
      },
      {
        field_key: "family_name",
        field_label: "اسم العائلة",
        field_type: "text",
        field_options: {
          required: true,
        },
      } as Levelup.CMS.V1.Content.CustomFields.MetaField<"text"> & {
        field_key: "family_name";
      },
      {
        field_key: "phone",
        field_label: "الهاتف",
        field_type: "text",
        field_options: {
          required: true,
        },
      } as Levelup.CMS.V1.Content.CustomFields.MetaField<"text"> & {
        field_key: "phone";
      },
      {
        field_key: "email",
        field_label: "البريد الإلكتروني",
        field_type: "text",
        field_options: {
          required: true,
        },
      } as Levelup.CMS.V1.Content.CustomFields.MetaField<"text"> & {
        field_key: "email";
      },
      {
        field_key: "program",
        field_label: "البرنامج",
        field_type: "text",
        field_options: {
          required: true,
        },
      } as Levelup.CMS.V1.Content.CustomFields.MetaField<"text"> & {
        field_key: "program";
      },
    ],
    settings: {
      has_reset_button: true,
      reset_button_label: "إعادة تعبئة النموذج",
      has_submit_button: true,
      submit_button_label: "إرسال الطلب",
      shown_fields_on_dashboard: ["first_name", "family_name", "phone"],
    }
  },
  {
    name: "طلب تأشيرة",
    slug: "order-visa",
    fields: [
      {
        field_key: "phone",
        field_label: "الهاتف",
        field_type: "text",
        field_options: {
          required: true,
        },
      } as Levelup.CMS.V1.Content.CustomFields.MetaField<"text"> & {
        field_key: "phone";
      },
      {
        field_key: "email",
        field_label: "البريد الإلكتروني",
        field_type: "text",
        field_options: {
          required: true,
        },
      } as Levelup.CMS.V1.Content.CustomFields.MetaField<"text"> & {
        field_key: "email";
      },
      {
        field_key: "passport",
        field_label: "جواز السفر",
        field_type: "file",
        field_options: {
          required: true,
        },
      } as Levelup.CMS.V1.Content.CustomFields.MetaField<"file"> & {
        field_key: "passport";
      },
      {
        field_key: "photo",
        field_label: "الصورة",
        field_type: "file",
        field_options: {
          required: true,
        },
      } as Levelup.CMS.V1.Content.CustomFields.MetaField<"file"> & {
        field_key: "photo";
      },
      {
        field_key: "payment_method",
        field_label: "طريقة الدفع",
        field_type: "select",
        field_options: {
          required: false,
          multiple: false,
          choices: [
            { value: "visa", label: "فيزا كارد" },
            { value: "mastercard", label: "ماستر كارد" },
            { value: "paypal", label: "باي بال" },
            { value: "cib", label: "البطاقة البنكية" },
            { value: "baridi", label: "بريدي موب" },
            { value: null, label: "غير محدد" },
          ],
        },
      } as Levelup.CMS.V1.Content.CustomFields.MetaField<"select", false> & {
        field_key: "payment_method";
      },
      {
        field_key: "description",
        field_label: "الوصف",
        field_type: "text",
        field_options: {
          required: false,
        },
      } as Levelup.CMS.V1.Content.CustomFields.MetaField<"text"> & {
        field_key: "description";
      },
    ],
    settings: {
      has_reset_button: true,
      reset_button_label: "إعادة تعبئة النموذج",
      has_submit_button: true,
      submit_button_label: "إرسال الطلب",
      shown_fields_on_dashboard: ["phone", "email"],
    }
  },
] as Levelup.CMS.V1.Content.Entity.Form[];
