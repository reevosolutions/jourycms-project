import articleTypesSeedData from "@/lib/seed/miqat/ar.types.seed";
import generateArticleTypes from "./generate.article-type";

const mock = {
  content: {
    articleType: () => generateArticleTypes(1)[0],
    articleTypes: generateArticleTypes,
    seedTypes: () => articleTypesSeedData.types || [],
  },
};

export default mock;
