import { Component } from 'react';
import PropTypes from 'prop-types';

class Button extends Component {
  render() {
    return (
      <button
        className="Button"
        type="button"
        onClick={this.props.handleLoadingMore}
      >
        Load moreeee
      </button>
    );
  }
}
Button.propTypes = {
  handleLoadingMore: PropTypes.func,
};
export default Button;
