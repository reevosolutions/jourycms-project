import { SchemaDefinitionProperty } from "mongoose";

declare global {
  namespace Levelup {
    namespace CMS {
      namespace V1 {
        namespace Utils {
          namespace Mongodb {
            export type StrictSchemaDefinition<
              T = undefined,
              EnforcedDocType = any,
            > = T extends undefined
              ? { [path: string]: SchemaDefinitionProperty }
              : {
                  [path in keyof Complete<T>]: SchemaDefinitionProperty<
                    Complete<T>[path],
                    EnforcedDocType
                  >;
                };

            type DeepStrictSchemaDefinition<
              T = undefined,
              EnforcedDocType = any,
            > = {
              [K in keyof Required<T>]: T[K] extends Date
                ? SchemaDefinitionProperty<T[K], EnforcedDocType>
                : T[K] extends object & { push?: never; unshift?: never }
                  ?
                      | DeepStrictSchemaDefinition<T[K], EnforcedDocType>
                      | {
                          type: DeepStrictSchemaDefinition<
                            T[K],
                            EnforcedDocType
                          >;
                          default?: T[K] | undefined;
                          required?: boolean;
                          unique?: boolean;
                          index?: boolean;
                          ref?: string;
                          _id?: false;
                        }
                  : // : SchemaDefinition;
                    SchemaDefinitionProperty<T[K], EnforcedDocType>;
            };
          }
        }
      }
    }
  }
}
