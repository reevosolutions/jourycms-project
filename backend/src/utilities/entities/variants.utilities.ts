/**
 * @generator Levelup
 * @author dr. Salmi <reevosolutions@gmail.com>
 * @since 28-02-2024 02:58:06
 */



export type Variants = {
  property: string;
  option: Levelup.V2.Products.Entity.Variants.OptionDatum<string>;
}[][];

export type VariantsWithNames = {
  name: string;
  properties: {
    property: string;
    option: Levelup.V2.Products.Entity.Variants.OptionDatum<string>;
  }[]
}[];

export const combineVariantProperties: (result: Variants, arg: {
  property: string;
  options: Levelup.V2.Products.Entity.Variants.OptionDatum<string>[];
}[]) => Variants = (prevResult, [head, ...[headTail, ...tailTail]]) => {
  console.log("combineVariantProperties", { head, headTail, tailTail });
  if (!head) return prevResult;

  let result: Variants = [];
  const res: Variants = head.options.map(o => [{ property: head.property, option: o }])
  if (!prevResult?.length) result = res;

  else result = prevResult.reduce((acc, x) => {
    return acc.concat(res.map(h => [...x, ...h]));
  }, [] as Variants)


  if (headTail) {
    return combineVariantProperties(result, [headTail, ...tailTail]);
  }
  else {
    return result;
  }
}

export const generateVariantNames: (result: Variants, separator?: string) => VariantsWithNames = (result, separator = " | ") => {
  console.log("generateVariantNames", { result });
  return result.map(r => {
    return {
      name: r.map(({ option }) => option.label).join(separator),
      properties: r
    }
  })
}


