import React from "react";
import css from "./LoadMoreBtn.module.css";

function LoadMoreBtn({onLoadMore}) {
 
  return (
    <>
      <button onClick={onLoadMore} className={css.loadMoreBtn}>
      Load More
    </button>
    </>
  )
}

export default LoadMoreBtn
