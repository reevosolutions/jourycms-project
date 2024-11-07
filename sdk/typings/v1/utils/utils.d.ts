// import { Document, Model } from 'mongoose';

declare module Levelup {
  namespace CMS {
    namespace V1 {
      namespace Utils {
        export type PropType<TObj, TProp extends keyof TObj> = TObj[TProp];
        export type PropTypeNonNullable<
          TObj,
          TProp extends keyof TObj,
        > = NonNullable<TObj[TProp]>;

        export type Maybe<T> = T | null;
        export type Exact<T extends { [key: string]: unknown }> = {
          [K in keyof T]: T[K];
        };
        export type Complete<T> = {
          [P in keyof Required<T>]: Pick<T, P> extends Required<Pick<T, P>>
            ? T[P]
            : T[P] | undefined;
        };

        // Type utility to extract string literals recursively
        type RecursiveKeyUnion<T> = T extends object
          ? { [K in keyof T]: RecursiveKeyUnion<T[K]> }[keyof T]
          : T;

        type DeepComplete<T = undefined> = {
          [K in keyof Complete<T>]: T[K] extends Date
            ? Date
            : T[K] extends object & { push?: never; unshift?: never }
              ? DeepComplete<T[K]>
              : NonUndefined<T[K]>;
        };

        export type NonUndefined<T> = T extends undefined ? never : T;

        type MergeTypes<A, B> = {
          [key in keyof A]: key extends keyof B ? B[key] : A[key];
        } & B;

        export type Frequency =
          | {
              frequency: "everyMinute" | "everyHour" | "everyDay";
            }
          | {
              frequency: "custom";
              interval:
                | `every ${number}s`
                | `every ${number}m`
                | `every ${number}h`
                | `every ${number}h ${number}m`
                | `every ${number}h ${number}m ${number}s`;
            };

        export type DocumentProperties<T> = T extends object & {
          push?: never;
          unshift?: never;
          getUTCDate?: never;
          getUTCFullYear?: never;
          getUTCHours?: never;
        }
          ? {
              [K in keyof T]-?: K extends string | number
                ?
                    | `${K}`
                    | `${K}.${DocumentProperties<T[K]>}`
                    | (T extends { attributes?: object }
                        ? DocumentRootProperties<T["attributes"]>
                        : never)
                    | (T[K] extends Array<any>
                        ? `${K}.${DocumentProperties<T[K][number]>}`
                        : never)
                : never;
            }[keyof T]
          : never;

        export type ExcludeDocumentProperties<T> = T extends object & {
          push?: never;
          unshift?: never;
        }
          ? {
              [K in keyof T]-?: K extends string | number
                ?
                    | `-${K}`
                    | `-${K}.${DocumentProperties<T[K]>}`
                    | (T extends { attributes?: object }
                        ? ExcludeDocumentRootProperties<T["attributes"]>
                        : never)
                    | (T[K] extends Array<any>
                        ? `${K}.${DocumentProperties<T[K][number]>}`
                        : never)
                : never;
            }[keyof T]
          : never;

        export type DocumentRootProperties<T> = T extends object
          ? {
              [K in keyof T]-?: K extends string | number ? `${K}` : never;
            }[keyof T]
          : never;

        export type ExcludeDocumentRootProperties<T> = T extends object
          ? {
              [K in keyof T]-?: K extends string | number ? `-${K}` : never;
            }[keyof T]
          : never;

        export type DeepKeys<T> = T extends object & {
          push?: never;
          unshift?: never;
        }
          ? {
              [K in keyof T]-?: K extends string | number
                ? `${K}` | `${K}.${DeepKeys<T[K]>}`
                : never;
            }[keyof T]
          : never;

        export type DeepStringKeys<T> = T extends object & {
          push?: never;
          unshift?: never;
        }
          ? {
              [K in keyof T]-?: K extends string | number
                ? `${K}.${DeepKeys<T[K]>}`
                : never;
            }[keyof T]
          : never;

        /**
         * Update : LeafKeys excludes the keys of object values
         * @author dr. Salmi <reevosolutions@gmail.com>
         * @since 29-10-2024 19:18:23
         */
        type LeafKeys<T> = T extends object
          ? {
              [K in Extract<keyof T, string | number>]: T[K] extends object
                ? `${K}.${LeafKeys<T[K]>}`
                : `${K}`;
            }[Extract<keyof T, string | number>]
          : never;

        export type WithRequiredProperty<
          Type,
          Key extends keyof Type = keyof Type,
        > = Type & {
          [Property in Key]-?: Type[Property];
        };

        export type WithSelfChildren<T, C extends string> = T & {
          [Prop in C]?: WithSelfChildren<T, C>[];
        };

        export type CachedHeavyResult<T> = {
          last_updated?: Date;
          next_update?: Date;
          found?: boolean;
          expired?: boolean;
          value?: T;
        };

        /**
         * Update : Added
         * @author dr. Salmi <reevosolutions@gmail.com>
         * @since 24-10-2024 17:51:08
         */
        export type DeepPartial<T> = {
          [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
        };
      }
    }
  }
}
