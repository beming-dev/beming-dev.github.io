const path = require(`path`)

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions

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
  `)

  if (result.errors) {
    throw result.errors
  }

  const categoryTemplate = path.resolve("./src/templates/mainCategory.js")
  const subCategoryTemplate = path.resolve("./src/templates/subCategory.js")

  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    const { categories } = node.frontmatter
    if (categories) {
      createPage({
        path: `/mainCategory/${categories[0].mainCategory.toLowerCase()}`,
        component: categoryTemplate,
        context: {
          mainCategory: categories[0].mainCategory,
        },
      })
      createPage({
        path: `/subCategory/${categories[0].subCategory.toLowerCase()}`,
        component: subCategoryTemplate,
        context: {
          mainCategory: categories[0].mainCategory,
          subCategory: categories[0].subCategory,
        },
      })
    }
  })
}
