import React, { Component } from "react";
import Suggestions from "./suggestions";
import styles from "./styles";

class SearchBar extends Component {
  state = {
    query: "",
    results: []
  };

  componentDidMount() {
    this.getInfo();
  }

  handleInputChange = () => {
    this.setState(
      {
        query: this.search.value
      },
      () => {
        if (this.state.query && this.state.query.length > 1) {
          if (this.state.query.length % 2 === 0) {
            this.getInfo();
          }
        } else if (!this.state.query) {
        }
      }
    );
  };

  getInfo = () => {
    this.setState({
      results: [
        { "id|": "1", name: "Joe " },
        { "id|": "2", name: "James" },
        ("id|": "3"),
        ("name": "Bob")
      ]
    });
  };

  render() {
    return (
      <div className="banner">
        <style jsx>{styles}</style>
        <div className="search">
          <input
            type="text"
            className="searchTerm"
            placeholder="What event are you looking for?"
            ref={input => (this.search = input)}
            onChange={this.handleInputChange}
          />
        </div>
      </div>
    );
  }
}

export default SearchBar;
