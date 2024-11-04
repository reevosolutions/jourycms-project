
const INFANT_SIZES: Levelup.V2.Products.Entity.Variants.Properties.ClothingSize.ExtendedClothingSize<Levelup.V2.Products.Entity.Variants.Properties.ClothingSize.InfantSize>[] = [
  { size: "Newborn" },
  { size: "3-6 months" },
  { size: "6-9 months" },
  { size: "9-12 months" },
  { size: "12-18 months" },
  { size: "18-24 months" },
  { size: "24-30 months" },
];

const TODDLER_SIZES: Levelup.V2.Products.Entity.Variants.Properties.ClothingSize.ExtendedClothingSize<Levelup.V2.Products.Entity.Variants.Properties.ClothingSize.ToddlerSize>[] = [
  { size: "2T", age: "2 years" },
  { size: "3T", age: "3 years" },
  { size: "4T", age: "4 years" },
];

const PRESCHOOLER_SIZES: Levelup.V2.Products.Entity.Variants.Properties.ClothingSize.ExtendedClothingSize<Levelup.V2.Products.Entity.Variants.Properties.ClothingSize.PreschoolerSize>[] = [
  { size: "4-5 years" },
  { size: "5T", age: "5 years" },
];

const SCHOOL_AGE_SIZES: Levelup.V2.Products.Entity.Variants.Properties.ClothingSize.ExtendedClothingSize<Levelup.V2.Products.Entity.Variants.Properties.ClothingSize.SchoolAgeSize>[] = [
  { size: "6-7 years" },
  { size: "7-8 years" },
  { size: "8-9 years" },
  { size: "9-10 years" },
  { size: "10-11 years" },
  { size: "11-12 years" },
];

const ADULT_CLOTHING_SIZES: Levelup.V2.Products.Entity.Variants.Properties.ClothingSize.ExtendedClothingSize<Levelup.V2.Products.Entity.Variants.Properties.ClothingSize.AdultSize>[] = [
  { size: "XS" },
  { size: "S" },
  { size: "M" },
  { size: "L" },
  { size: "XL" },
  { size: "XXL" },
  { size: "3XL" },
  { size: "4XL" },
  { size: "5XL" },
  { size: "6XL" },
];

const ALL_KID_CLOTHING_SIZES: Levelup.V2.Products.Entity.Variants.Properties.ClothingSize.ExtendedClothingSize<Levelup.V2.Products.Entity.Variants.Properties.ClothingSize.KidClothingSize>[] = [
  ...INFANT_SIZES,
  ...TODDLER_SIZES,
  ...PRESCHOOLER_SIZES,
  ...SCHOOL_AGE_SIZES,
];


const ALL_CLOTHING_SIZES: Levelup.V2.Products.Entity.Variants.Properties.ClothingSize.ExtendedClothingSize<Levelup.V2.Products.Entity.Variants.Properties.ClothingSize.AllClothingSize>[] = [
  ...ALL_KID_CLOTHING_SIZES,
  ...ADULT_CLOTHING_SIZES,
]


const GROUPED_CLOTHING_SIZES = {
  "infant": INFANT_SIZES,
  "toddler": TODDLER_SIZES,
  "preschooler": PRESCHOOLER_SIZES,
  "schoolAge": SCHOOL_AGE_SIZES,
  "adult": ADULT_CLOTHING_SIZES,
}

export type ClothingSizeGroup = keyof typeof GROUPED_CLOTHING_SIZES;

const GROUPED_CLOTHING_SIZES_GROUPS: ClothingSizeGroup[] = [
  "infant",
  "toddler",
  "preschooler",
  "schoolAge",
  "adult",
];

export {
  INFANT_SIZES,
  TODDLER_SIZES,
  PRESCHOOLER_SIZES,
  SCHOOL_AGE_SIZES,
  ALL_KID_CLOTHING_SIZES,
  ADULT_CLOTHING_SIZES,
  ALL_CLOTHING_SIZES,
  GROUPED_CLOTHING_SIZES,
  GROUPED_CLOTHING_SIZES_GROUPS,
};

