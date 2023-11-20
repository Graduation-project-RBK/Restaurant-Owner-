import React from "react";


const CategoryCheckbox = ({ category, selected, onChange }) => {
    return (
      <label className="flex items-center">
        <input
          type="checkbox"
          className="mr-2"
          checked={selected}
          onChange={onChange}
        />
        {category}
      </label>
    );
  };
  
  export default CategoryCheckbox;