import React from "react";
import * as p from "./Pagination.module.css";

function Pagination({ recipesPerPage, allRecipes, pages }) {
  //destructuring the props
  //defining the number of pages
  const pageNumbers = [];
  //to get the number of pages, i'm doing a for loop from 0 to the division of the total recipes fetched over the number of recipes per page. I pushed the index + 1 so my pagination numbers start at 1 and not at 0, without affecting the iteration.
  for (let i = 0; i < Math.ceil(allRecipes / recipesPerPage); i++) {
    pageNumbers.push(i + 1);
  }

  return (
    <div className={p["pagination-container"]}>
      <ul className={p["pagination-ul"]}>
        {/* mapping the li with my recipes per page */}
        {pageNumbers &&
          pageNumbers.map((number) => (
            <li className={p["pagination-li"]} key={number}>
              <a onClick={() => pages(number)}>{number}</a>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default Pagination;
