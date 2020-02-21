import React, { Component } from "react";

export default class SearchBar extends Component {
  handleChange = e => {
    console.log("SEARCHBAR: ", e.target.value);
    this.props.updateSearchText(e.target.value);
  };

  render() {
    return (
      <div>
        <input value={this.props.search} onChange={this.handleChange} />
      </div>
    );
  }
}

/* import React from "react";

const SearchBar = props => {
  return (
    <div>
      <input
        value={props.search}
        onChange={event => {
          props.updateSearchText(event.target.value);
        }}
      />
    </div>
  );
};

export default SearchBar;
 */
