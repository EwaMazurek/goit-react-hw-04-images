import PropTypes from 'prop-types';

export const Button = ({ handleLoadingMore }) => {
  return (
    <button className="Button" type="button" onClick={handleLoadingMore}>
      Load more
    </button>
  );
};

Button.propTypes = {
  handleLoadingMore: PropTypes.func,
};
