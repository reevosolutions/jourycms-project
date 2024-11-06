declare module Levelup {
  namespace CMS {
    namespace V1 {
      export namespace Utils {

        export namespace Api {
          export namespace Request {
            type Request<T> = T & {
              cancelToken?: any;
            };
            type PagedRequestFields = {
              count?: number;
              page?: number;
            };
            type Paged = {
              count?: number;
              page?: number;
            };
            type SortableRequestFields<T extends object> = {
              sort_by: Levelup.CMS.V1.Utils.DocumentProperties<T>;
              sort: "desc" | "asc";
            };
            type Sortable<T extends object> = {
              sort_by?: Levelup.CMS.V1.Utils.DocumentProperties<T>;
              sort?: "desc" | "asc";
            };
            type Searchable = {
              search?: string;
            };

            type FilterableDeliverable<T extends string> = {
              [K in T]?: any;
            } & {
              city?: string | string[];
              state?: string | string[];
              country?: string | string[];
              starting_city?: string | string[];
              starting_state?: string | string[];
              starting_country?: string | string[];
              current_city?: string | string[];
              current_state?: string | string[];
              current_country?: string | string[];
              intermediate_city?: string | string[];
              intermediate_state?: string | string[];
              intermediate_country?: string | string[];
              destination_city?: string | string[];
              destination_state?: string | string[];
              destination_country?: string | string[];
              office?: string | string[];
              starting_office?: string | string[];
              current_office?: string | string[];
              intermediate_office?: string | string[];
              destination_office?: string | string[];
              office_tracking?: string | string[];
              starting_office_tracking?: string | string[];
              current_office_tracking?: string | string[];
              intermediate_office_tracking?: string | string[];
              destination_office_tracking?: string | string[];
              not?: { [K in T]?: any } & {
                city?: string | string[];
                state?: string | string[];
                country?: string | string[];
                starting_city?: string | string[];
                starting_state?: string | string[];
                starting_country?: string | string[];
                current_city?: string | string[];
                current_state?: string | string[];
                current_country?: string | string[];
                intermediate_city?: string | string[];
                intermediate_state?: string | string[];
                intermediate_country?: string | string[];
                destination_city?: string | string[];
                destination_state?: string | string[];
                destination_country?: string | string[];
                office?: string | string[];
                starting_office?: string | string[];
                current_office?: string | string[];
                intermediate_office?: string | string[];
                destination_office?: string | string[];
                office_tracking?: string | string[];
                starting_office_tracking?: string | string[];
                current_office_tracking?: string | string[];
                intermediate_office_tracking?: string | string[];
                destination_office_tracking?: string | string[];
              };
            };
            type Filterable<T extends string> = {
              [K in T]?: unknown;
            } & {
              load_deleted?: boolean;
              not?: { [K in T]?: unknown };
            } & {
              filters?: { [K in T]?: unknown } & {
                not?: {
                  [K in T]?: unknown;
                };
              };
            };

            type Projectable<T extends object> = {
              fields?: (
                | Utils.DocumentProperties<T>
                | Utils.ExcludeDocumentProperties<T>
              )[];
            };

            type Build<T> = Request<T>;
            type BuildSearchable = Request<Searchable>;
            type BuildPaged = Request<Paged>;
            type BuildSortable<T extends object> = Request<Sortable<T>>;
            type BuildProjectable<T extends object> = Request<Projectable<T>>;
            type BuildSearchablePaged = Request<Searchable & Paged>;
            type BuildSearchablePagedProjectable<T extends object> = Request<
              Searchable & Paged & Projectable<T>
            >;
            type BuildSearchablePagedSortable<T extends object> = Request<
              Searchable & Paged & Sortable<T>
            >;
            type BuildSearchablePagedSortableProjectable<T extends object> =
              Request<Searchable & Paged & Sortable<T> & Projectable<T>>;
            type BuildSearchablePagedFilterable<T> = Request<
              Searchable &
                Paged &
                Filterable<Levelup.CMS.V1.Utils.DocumentProperties<T>>
            >;
            type BuildSearchablePagedFilterableProjectable<T extends object> =
              Request<
                Searchable &
                  Paged &
                  Filterable<Levelup.CMS.V1.Utils.DocumentProperties<T>> &
                  Projectable<T>
              >;
            type BuildSearchablePagedSortableFilterable<T extends object> =
              Request<
                Searchable &
                  Paged &
                  Filterable<Levelup.CMS.V1.Utils.DocumentProperties<T>> &
                  Sortable<T>
              >;
            type BuildSearchablePagedSortableFilterableProjectable<
              T extends object,
            > = Request<
              Searchable &
                Paged &
                Filterable<Levelup.CMS.V1.Utils.DocumentProperties<T>> &
                Filterable<Levelup.CMS.V1.Utils.DocumentProperties<T>> &
                Sortable<T> &
                Projectable<T>
            >;
            type BuildSortableFilterable<T extends object> = Request<
              Filterable<Levelup.CMS.V1.Utils.DocumentProperties<T>> & Sortable<T>
            >;
            type BuildSortableFilterableProjectable<T extends object> = Request<
              Filterable<Levelup.CMS.V1.Utils.DocumentProperties<T>> &
                Sortable<T> &
                Projectable<T>
            >;
            type BuildSearchablePagedFilterableDeliverable<T extends object> =
              Request<
                Searchable &
                  Paged &
                  FilterableDeliverable<Levelup.CMS.V1.Utils.DocumentProperties<T>>
              >;
            type BuildSearchablePagedFilterableDeliverableProjectable<
              T extends object,
            > = Request<
              Searchable &
                Paged &
                FilterableDeliverable<Levelup.CMS.V1.Utils.DocumentProperties<T>> &
                Projectable<T>
            >;
            type BuildSearchablePagedSortableFilterableDeliverable<
              T extends object,
            > = Request<
              Searchable &
                Paged &
                FilterableDeliverable<Levelup.CMS.V1.Utils.DocumentProperties<T>> &
                Sortable<T>
            >;
            type BuildSearchablePagedSortableFilterableDeliverableProjectable<
              T extends object,
            > = Request<
              Searchable &
                Paged &
                FilterableDeliverable<Levelup.CMS.V1.Utils.DocumentProperties<T>> &
                Sortable<T> &
                Projectable<T>
            >;

            // create

            type TOmittedFieldsFromCreateRequestData =
              | "_id"
              | "createdAt"
              | "updatedAt"
              | "user"
              | "tracking_id";
            type BuildCreateRequest<T extends object> = Build<{
              data: Partial<Omit<T, TOmittedFieldsFromCreateRequestData>>;
            }>;

            type TOmittedFieldsFromUpdateRequestData =
              | "createdAt"
              | "updatedAt"
              | "user"
              | "tracking_id";
            type BuildUpdateRequest<T extends object> = Build<{
              data: Partial<Omit<T, TOmittedFieldsFromUpdateRequestData>>;
            }>;
          }
        }
      }
    }
  }
}
