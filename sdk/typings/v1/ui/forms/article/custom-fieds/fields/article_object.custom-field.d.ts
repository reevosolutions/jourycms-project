declare module Levelup {

	namespace CMS {
		namespace V1 {
			export namespace UI {
				export namespace Forms {
					export namespace CustomFields {
						export namespace ArticleObjectField {

							export type Key = "article_object";

							export type Input<IsMulti extends boolean = false> = IsMulti extends true ? Utils.Common.ID[] : Utils.Common.ID | null;

							export type Output<IsMulti extends boolean = false> = IsMulti extends true
								? Content.Entity.Article[]
								: Content.Entity.Article | null;

							export type Options<IsMulti extends boolean = false> = BaseFieldOption<Input, IsMulti> & {
								multiple: IsMulti;
								type: Utils.Common.Name;
								filter: Content.Api.Articles.List.Request['filters'];
							}
						}
					}
				}
			}
		}
	}
}