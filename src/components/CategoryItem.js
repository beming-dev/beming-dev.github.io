import React from "react"
import { Link } from "gatsby"
import "./CategoryItem.scss"


// categories
// date
// slug
// thumbnail
// title

const CategoryItem = ({ info }) => {
  const {frontmatter, excerpt} = info;
  return (
    <div className="category-item">
      <span className="date">{frontmatter.date}</span>
      <div className="item-box">
        <Link to={frontmatter.slug}>
          <img src={frontmatter.thumbnail} alt="thumbnail"></img>
          <div className="text-box">
            <span className="title">{frontmatter.title}</span>
            <span className="description">{excerpt}</span>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default CategoryItem
