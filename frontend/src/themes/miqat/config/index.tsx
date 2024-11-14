import { cities } from "./dz.cities.config";
import { medical_specialities } from "./medical-specialities.config";
import { states } from "./dz.states.config";

const algerianArabicMonths = {
  1: "جانفي", // January
  2: "فيفري", // February
  3: "مارس", // March
  4: "أفريل", // April
  5: "ماي", // May
  6: "جوان", // June
  7: "جويلية", // July
  8: "أوت", // August
  9: "سبتمبر", // September
  10: "أكتوبر", // October
  11: "نوفمبر", // November
  12: "ديسمبر", // December
};

// eslint-disable-next-line no-undef
const websiteConfig: Levelup.CMS.V1.System.Entity.WebsiteConfig = {
  name: "ميقات",
  description: `حدد ميزانيتك، حدد مكانك سنجلب لك أفضل العروض .. أقربها .. و بأفضل الأسعار ..
  نحن نعمل على توفير أفضل العروض لكم و بأفضل الأسعار و بأفضل الخدمات`,
  address: `مركز الأعمال القدس
مكتب رقم ٢٢ الشراقة
ولاية الجزائر – الجزائر`,
  version: "1.0.0",
  contact_phones: ["0021352626253"],
  contact_whatsapp: "+21352626253",
  contact_email: "contact@miqat.com",
  social_links: [
    {
      network: "facebook",
      url: "https://www.facebook.com/miqat",
    },
    {
      network: "twitter",
      url: "https://www.twitter.com/@miqat",
    },
    {
      network: "instagram",
      url: "https://www.instagram.com/miqat",
    },
    {
      network: "linkedin",
      url: "https://www.linkedin.com/miqat",
    },
    {
      network: "tiktok",
      url: "https://tiktok.com/miqat",
    },
  ],

  months: algerianArabicMonths,
  states,
  cities,
  medical_specialities
};

export default websiteConfig;

export enum ArticleTypeSlug {
  OMRAH = "omrah",
  BLOG = "blog",
  SHRINE = "shrine",
  AIRELINES_COMPANY = "airelines-company",
  HOTEL = "hotel",
  AIROPORT = "airoport",
  GIFT = "gift",
  AGENCY = "agency",
  DOCTOR = "doctor",
  ESCORT = "escort",
  TOMBOLA = "tombola",
  JOB_OFFER = "job-offer",
  BID = "bid",
  TRANSPORTATION_SERVICE = "transportation-service",
  HEALTH_SERVICE = 'health-service'
}
