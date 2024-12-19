import path from "path";
import * as fs from "fs";
import initLogger, {
  LoggerContext,
  LoggerService,
} from "../../../../utilities/logging/index";
import ExcelParser from "../../../../utilities/excel/excel.parser";

const logger = initLogger(LoggerContext.UTILITY, "seed");

const state_mapping = {
  أدرار: 1,
  الشلف: 2,
  األغواط: 3,
  "أم البواقي": 4,
  قاملة: 4,
  باتنة: 5,
  بجاية: 6,
  بسكرة: 7,
  البليدة: 9,
  البويرة: 10,
  تمنراست: 11,
  تبسة: 12,
  تلمسان: 13,
  تيارت: 14,
  الجزائر: 16,
  الجلفة: 17,
  سطيف: 19,
  سعيدة: 20,
  سكيكدة: 21,
  "سيدي بلعباس": 22,
  عنابة: 23,
  قسنطينة: 25,
  املدية: 26,
  مستغانم: 27,
  املسيلة: 28,
  المسيلة: 28,
  معسكر: 29,
  ورقلة: 30,
  وهران: 31,
  البيض: 32,
  "برج بوعريريج": 34,
  بومرداس: 35,
  الطارف: 36,
  تيسمسيلت: 38,
  الوادي: 39,
  خنشلة: 40,
  "سوق أهراس": 41,
  تيبازة: 42,
  ميلة: 43,
  "عين الدفلى": 44,
  النعامة: 45,
  "عين تموشنت": 46,
  غرداية: 47,
  غليزان: 48,
};

export const extractAgenciesFromExcel = async () => {
  const filePath = path.join(
    __dirname,
    "../../../../../dev/data/agencies.xlsx"
  );
  if (fs.existsSync(filePath)) {
    logger.success("File exists");
    const parser = new ExcelParser(filePath);
    const data = await parser.parse(filePath, (row, index) => {
      if (index === 0) {
        return null;
      }
      return {
        phone_number: `0${row[1]}`,
        abbreviation: row[5],
        agency_name: row[6],
        state_name: row[7],
        state_code: state_mapping[row[7]] || null,
      };
    });
    logger.value(
      "data",
      (await data).filter((i) => !!i)
    );
    return data.filter((i) => !!i);
  } else {
    logger.warn("File does not exist", filePath);
    return [];
  }
};

export const agencies = [
  {
    phone_number: "023917474",
    abbreviation: "نوي",
    agency_name: "نوي للسياحة و األسفار",
    state_name: "الجزائر",
    state_code: state_mapping["الجزائر"] || null,
  },
  {
    phone_number: "023440142",
    abbreviation: "طابا",
    agency_name: "طابا فواياج",
    state_name: "الجزائر",
    state_code: state_mapping["الجزائر"] || null,
  },
  {
    phone_number: "033271997",
    abbreviation: "العوالي",
    agency_name: "العوالي للسياحة و األسفار",
    state_name: "باتنة",
    state_code: state_mapping["باتنة"] || null,
  },
  {
    phone_number: "026720066",
    abbreviation: "النجاح",
    agency_name: "النجاح للسياحة واالسفار",
    state_name: "البويرة",
    state_code: state_mapping["البويرة"] || null,
  },
  {
    phone_number: "046787377",
    abbreviation: "المحسنون",
    agency_name: "المحسنون تور",
    state_name: "غليزان",
    state_code: state_mapping["غليزان"] || null,
  },
  {
    phone_number: "046723404",
    abbreviation: "المرينية",
    agency_name: "المرينية للخدمات السياحية",
    state_name: "غليزان",
    state_code: state_mapping["غليزان"] || null,
  },
  {
    phone_number: "043783874",
    abbreviation: "تموشنت",
    agency_name: "تموشنت سفر",
    state_name: "عين تموشنت",
    state_code: state_mapping["عين تموشنت"] || null,
  },
  {
    phone_number: "035734773",
    abbreviation: "انوار الصباح",
    agency_name: "وكالة انوار الصباح للسياحة و االسفار",
    state_name: "برج بوعريريج",
    state_code: state_mapping["برج بوعريريج"] || null,
  },
  {
    phone_number: "049575454",
    abbreviation: "زيدون",
    agency_name: "وكالة زيدون للسياحة و السفر",
    state_name: "النعامة",
    state_code: state_mapping["النعامة"] || null,
  },
  {
    phone_number: "05615954",
    abbreviation: "لجدار",
    agency_name: "لجدار ترافل اجنسي",
    state_name: "تيارت",
    state_code: state_mapping["تيارت"] || null,
  },
  {
    phone_number: "038407902",
    abbreviation: "راس الحمراء",
    agency_name: "راس الحمراء للسياحة",
    state_name: "عنابة",
    state_code: state_mapping["عنابة"] || null,
  },
  {
    phone_number: "029609564",
    abbreviation: "السعف الذهبي",
    agency_name: "السعف الذهبي",
    state_name: "ورقلة",
    state_code: state_mapping["ورقلة"] || null,
  },
  {
    phone_number: "036453278",
    abbreviation: "عيساوي",
    agency_name: "عيساوي للسياحة",
    state_name: "سطيف",
    state_code: state_mapping["سطيف"] || null,
  },
  {
    phone_number: "031871111",
    abbreviation: "نوبا",
    agency_name: "نوبا ترافل",
    state_name: "قسنطينة",
    state_code: state_mapping["قسنطينة"] || null,
  },
  {
    phone_number: "027504261",
    abbreviation: "دوي",
    agency_name: "دوي للسفر",
    state_name: "عين الدفلى",
    state_code: state_mapping["عين الدفلى"] || null,
  },
  {
    phone_number: "035349696",
    abbreviation: "بني طلحة",
    agency_name: "بني طلحة سياحة",
    state_name: "المسيلة",
    state_code: state_mapping["المسيلة"] || null,
  },
  {
    phone_number: "041239854",
    abbreviation: "بني طلحة",
    agency_name: "بني طلحة للسياحة و األسفار",
    state_name: "وهران",
    state_code: state_mapping["وهران"] || null,
  },
];
