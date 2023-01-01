import React from "react"
import { Link } from "gatsby"
import "./CategoryItem.scss"

const CategoryItem = ({ info, categoryPage }) => {
  return (
    <div
      className={
        categoryPage ? "category-page-item category-item" : "category-item"
      }
    >
      <Link to={`${info.slug}`}>
        <span className="date">{info.date}</span>
        <div className="img-box">
          <img src={`/${info.thumbnail}`} alt="thumbnail" />
        </div>
        <span className="title">{info.title}</span>
      </Link>
    </div>
  )
}

export default CategoryItem
