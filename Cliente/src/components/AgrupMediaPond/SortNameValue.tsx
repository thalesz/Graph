import React, { useEffect, useState } from "react";
import { SortNameValueProps } from "./interface";

const SortNameValue: React.FC<SortNameValueProps> = ({ sortValue, setSortValue }) => {
  const handleSortChange = () => {
    // Toggle between 'n' and 'v' when the checkbox is clicked

    console.log("aususu")
    setSortValue((prevSortValue) => (prevSortValue === 'n' ? 'v' : 'n'));
  };

  return (
    <div className="sortNameValueContainer">
      <label className="switchSort">
        <input
          type="checkbox"
          checked={sortValue === 'v'} // Set checked based on the 'v' value
          onChange={handleSortChange}
        />
        <span className="sliderSort"></span>
      </label>
      <p>Agrupado por {sortValue==='v'?"Valor":"Nome"}</p>
    </div>
  );
};

export default SortNameValue;
