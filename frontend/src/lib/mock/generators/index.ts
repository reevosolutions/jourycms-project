import generateArticleTypes from "./generate.article-type";

const mock = {
  content: {
    articleType: () => generateArticleTypes(1)[0],
    articleTypes: generateArticleTypes,
  },
};

export default mock;
