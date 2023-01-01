import React from "react"
import { Link } from "gatsby"
import "./CategoryItemHorizon.scss"

const CategoryItemHorizon = ({ info }) => {
  let meta = info.frontmatter
  let html = info.html
  html = html.replace(/<\/?[^>]+(>|$)/g, "")

  return (
    <div className="category-item-horizon">
      <Link to={`${meta.slug}`}>
        <div className="img-box">
          <img src={`/${meta.thumbnail}`} alt="thumbnail" />
        </div>
        <div className="right">
          <span className="date">{meta.date}</span>
          <span className="title">{meta.title}</span>
          <span
            className="description"
            dangerouslySetInnerHTML={{ __html: html }}
          ></span>
        </div>
      </Link>
    </div>
  )
}

export default CategoryItemHorizon
