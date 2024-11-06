declare module 'mongoose' {
  type MongooseFuzzySearchingField<T = any> =
    | keyof T
    | {
      name: keyof T;
      minSize?: number;
      weight?: number;
      prefixOnly?: boolean;
      escapeSpecialCharacters?: boolean;
      keys?: (string | number)[];
    };

  interface MongooseFuzzySearchingOptions<T extends Record<string, unknown>> {
    fields?: MongooseFuzzySearchingField<T>[];
    middlewares?: any;
  }

  interface MongooseFuzzySearchingParams {
    query: string;
    minSize?: string;
    prefixOnly?: boolean;
    exact?: boolean;
  }

  /**
   * @deprecated this makes Model type = any
   * FIXME: this makes Model type = any
   */
  interface _Model<T extends Document> {
    fuzzySearch(query: string | MongooseFuzzySearchingParams): Promise<T[]>;
  }

  type QueryWithFuzzySearch<Entity> = Query<(Entity & Document)[], Entity & Document, {}, Entity & Document> & {
    // type QueryWithFuzzySearch<ResultType, DocType, THelpers = {}, RawDocType = DocType> = Query<ResultType, DocType, THelpers, RawDocType> & {
    fuzzySearch?(query: string | MongooseFuzzySearchingParams): Query<(Entity & Document)[], Entity & Document, {}, Entity & Document>;
  }
}

declare module 'mongoose-fuzzy-searching';

declare module 'mongoose-fuzzy-searching/helpers' {
  export function nGrams(
    query: string,
    escapeSpecialCharacters: boolean,
    defaultNgamMinSize: number,
    checkPrefixOnly: boolean
  ): string[];
}