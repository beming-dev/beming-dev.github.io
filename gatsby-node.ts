const path = require(`path`);

exports.createPages = async ({ actions, graphql }: any) => {
  const { createPage } = actions;

  const result = await graphql(`
    query {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              categories {
                mainCategory
                subCategory
              }
            }
          }
        }
      }
    }
  `);

  if (result.errors) {
    throw result.errors;
  }

  const categoryTemplate = path.resolve("./src/templates/mainCategory.tsx");
  const subCategoryTemplate = path.resolve("./src/templates/subCategory.tsx");

  result.data.allMarkdownRemark.edges.forEach(({ node }: any) => {
    const { categories } = node.frontmatter;
    if (categories) {
      createPage({
        path: `/mainCategory/${categories[0].mainCategory.toLowerCase()}`,
        component: categoryTemplate,
        context: {
          mainCategory: categories[0].mainCategory,
        },
        defer: true,
      });
      createPage({
        path: `/subCategory/${categories[0].subCategory.toLowerCase()}`,
        component: subCategoryTemplate,
        context: {
          mainCategory: categories[0].mainCategory,
          subCategory: categories[0].subCategory,
        },
        defer: true,
      });
    }
  });
};
