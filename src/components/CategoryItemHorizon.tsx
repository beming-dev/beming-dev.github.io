import React from "react";
import { Link } from "gatsby";

const CategoryItemHorizon = ({ info }) => {
  let meta = info.frontmatter;
  let html = info.html;
  html = html.replace(/<\/?[^>]+(>|$)/g, "");

  return (
    <div className="w-11/12 my-12">
      <Link to={`${meta.slug}`} className="flex items-center no-underline">
        <div className="w-32 h-32 min-w-[125px] min-h-[125px] mr-5 overflow-hidden flex items-center justify-center">
          <img src={`/${meta.thumbnail}`} alt="thumbnail" className="mb-0" />
        </div>
        <div className="relative left-[-82.5px] flex flex-col justify-center pl-24 pr-5 rounded-lg w-[calc(100%-62.5px)] min-w-[calc(100%-62.5px)] h-32">
          <span className="text-sm">{meta.date}</span>
          <span className="font-bold text-xl whitespace-nowrap overflow-hidden text-ellipsis mb-1">
            {meta.title}
          </span>
          <span
            className="text-base overflow-hidden text-ellipsis text-gray-600 line-clamp-2"
            dangerouslySetInnerHTML={{ __html: html }}
          ></span>
        </div>
      </Link>
    </div>
  );
};

export default CategoryItemHorizon;
