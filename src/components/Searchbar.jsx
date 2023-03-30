import { Component } from 'react';
import PropTypes from 'prop-types';
class Searchbar extends Component {
  render() {
    return (
      <>
        <header className="Searchbar">
          <form className="SearchForm" onSubmit={this.props.handleSubmit}>
            <button type="submit" className="SearchForm-button">
              <span className="SearchForm-button-label">Search</span>
            </button>

            <input
              className="SearchForm-input"
              name="searchInput"
              type="text"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
            />
          </form>
        </header>
      </>
    );
  }
}
Searchbar.propTypes = {
  handleSubmit: PropTypes.func,
};

export default Searchbar;
