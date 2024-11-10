import initLogger, { LoggerContext } from "@/lib/logging";
import { faker } from "@faker-js/faker";

const logger = initLogger(LoggerContext.UTILITY, "generateArticleTypes");

export default function generateArticleTypes(count: number) {
  return faker.helpers
    .arrayElements(
      [
        "News",
        "Blog",
        "Opinion/Editorial (Op-Ed)",
        "How-To/Instructional",
        "Listicle",
        "Interview",
        "Case Study",
        "Research",
        "Review",
        "Profile",
        "Round-Up",
        "Tutorial",
        "Personal Essay",
        "Infographic",
        "Satirical",
        "White Paper",
        "Guides/Educational",
        "Trend",
        "Comparative",
        "Resource List",
        "Event Coverage",
      ],
      { min: count, max: count },
    )
    .map(type => {
      const doc: Levelup.CMS.V1.Content.Entity.ArticleType = {
        _id: faker.database.mongodbObjectId(),
        slug: type.toKebabCase(),
        name: type,
        labels: {
          singular: type,
          plural: type.pluralize(),
          list: `All ${type.pluralize()}`,
          create: `New ${type}`,
          edit: `Edit ${type}`,
          delete: `Delete ${type}`,
        },
        description: "<p>" + faker.lorem.paragraphs(5, "</p><p>") + "</p>",
        description_unformatted: "",
        description_structured: {},
        custom_meta_fields: [],
        related_taxonomies: [],
        snapshots: {
          created_by: null,
        },
        insights: {
          article_count: faker.number.int({ min: 0, max: 10_000 }),
        },
      };
      logger.value("doc", doc);
      return doc;
    });
}
