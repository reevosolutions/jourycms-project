
import generateArticleTypes from "./generate.articleType";

const mock = {
  content: {
    articleType: () => generateArticleTypes(1)[0],
    articleTypes: generateArticleTypes,
  },
};

export default mock;