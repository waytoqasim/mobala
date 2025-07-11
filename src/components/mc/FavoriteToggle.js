import React from "react";

const FavoritesToggle = ({ isFav, setIsFav }) => (
  <div className="onlyFav d-flex justify-content-end w-100 position-relative">
    <div className="custom-control custom-switch mt-2">
      <input
        type="checkbox"
        className="custom-control-input cursor-pointer"
        id="favToggle"
        checked={isFav}
        onChange={(e) => setIsFav(e.target.checked)}
      />
      <label
        className="custom-control-label cursor-pointer"
        htmlFor="favToggle"
        style={{ marginLeft: "10px" }}
      >
        Only Favorites
      </label>
    </div>
  </div>
);

export default FavoritesToggle;
