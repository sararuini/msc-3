import React, { Component } from "react";
import SearchItemList from "./SearchItemList";
import SearchViewer from "./SearchViewer";
import { withFirebase } from "../Firebase";

class SearchContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchItems: [],
      searchItem: {},
      isSearchViewOn: false,
      sortValue: "",
      inputValue: "",
    };
  }

  searchFilterOnChange = (event) => {
    console.log("searchFilterOnChange", event.target.value);

    this.setState({ inputValue: event.target.value });
  };


  render(){

    return(
      <div>
        <SearchItemList
          searchItems={this.sortSearchItems(filteredSearchItems)}
          handleSearchView={this.handleSearchView}
          searchFilterOnChange={this.searchFilterOnChange}
          inputValue={this.state.inputValue}
        />
      </div>
    )
  }
}
export default withFirebase(SearchContainer);
/*Sources:
https://medium.com/@reneecruz/search-bar-in-react-js-in-six-simple-steps-4849118b2134
*/
