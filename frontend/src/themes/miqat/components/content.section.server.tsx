import initLogger, { LoggerContext } from "@/lib/logging";
import NoPostsMessage from "@/themes/miqat/components/no-posts-message";
import CustomPagination from "@/themes/miqat/components/pagination.client";
import React from "react";
import PostCard_Server from "./post-card.server";

const logger = initLogger(LoggerContext.COMPONENT, "contentSection");

import EntityAlias = Levelup.CMS.V1.Content.Entity.Article;
import ApiAlias = Levelup.CMS.V1.Content.Api.Articles;
import CustomPagination_Server from "./pagination.server";


export type ContentSectionProps = JouryCMS.Theme.ComponentProps & {
  showPagination?: boolean;
  pathPattern?: `/${string}/:page`;
  count: number;
  page: number;
  articleType: Levelup.CMS.V1.Content.Entity.ArticleType;
  data?: ApiAlias.List.Response;
  error?: any;
};

const ContentSection: React.FC<
  ContentSectionProps
> = ({
  showPagination = true,
  pathPattern,
  count = 12,
  page = 1,
  data,
  articleType,
  error,
}) => {
    /* -------------------------------------------------------------------------- */
    /*                                   CONFIG                                   */
    /* -------------------------------------------------------------------------- */
    /* -------------------------------------------------------------------------- */
    /*                                    TOOLS                                   */
    /* -------------------------------------------------------------------------- */
    /* -------------------------------------------------------------------------- */
    /*                                    STATE                                   */
    /* -------------------------------------------------------------------------- */

    /* -------------------------------------------------------------------------- */
    /*                                    QUERY                                   */
    /* -------------------------------------------------------------------------- */

    /* -------------------------------------------------------------------------- */
    /*                                   METHODS                                  */
    /* -------------------------------------------------------------------------- */

    /* -------------------------------------------------------------------------- */
    /*                                    HOOKS                                   */
    /* -------------------------------------------------------------------------- */

    /* -------------------------------------------------------------------------- */
    /*                                   RETURN                                   */
    /* -------------------------------------------------------------------------- */
    return (
      <div className="py-4">
        {error ? (
          <div className="text-center">حدث خطأ</div>
        ) : data?.data?.length === 0 ? (
          <NoPostsMessage />
        ) : (
          <div className="">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-10 xl:grid-cols-4">
              {data?.data?.map((item, index) => (
                <PostCard_Server key={index} data={item} edge={data?.edge} articleType={articleType} />
              ))}
            </div>
            {pathPattern && showPagination && (data?.pagination?.pages || 0) > 1 && (
              <div className="my-8 mt-12">
                <CustomPagination_Server totalCount={data?.pagination?.total} currentPage={page || 1} pageSize={count} className=" text-lg" pathPattern={pathPattern} />
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

export default ContentSection;