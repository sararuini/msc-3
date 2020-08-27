import React from "react";
import SearchItem from "./SearchItem";

const SearchItemList = (props) => {
  return (
    <div>
      <label htmlFor="search">
        Use opportunities to search users, opportunities, bands{" "}
      </label>
      <input
        type="text"
        value={props.inputValue}
        onChange={props.searchFilterOnChange}
      />
    </div>
  );
};

export default SearchItemList;


/*Sources:
https://medium.com/@reneecruz/search-bar-in-react-js-in-six-simple-steps-4849118b2134
*/