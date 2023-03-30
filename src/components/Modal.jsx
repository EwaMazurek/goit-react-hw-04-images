import { Component } from 'react';
import PropTypes from 'prop-types';
class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleEscClose);
    const modalBcg = document.querySelector('.Overlay');
    modalBcg.addEventListener('click', this.handleMouseClose);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleEscClose);
    const modalBcg = document.querySelector('.Overlay');
    modalBcg.removeEventListener('click', this.handleMouseClose);
  }

  handleEscClose = event => {
    if (event.code === 'Escape' || event.keyCode === 27) {
      this.props.closeModal();
    }
  };
  handleMouseClose = event => {
    if (event.target === event.currentTarget) {
      return this.props.closeModal();
    }
  };

  render() {
    return (
      <div className="Overlay">
        <div className="Modal">
          <img src={this.props.image} alt="large pic" />
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  handleEscClose: PropTypes.func,
  handleMouseClose: PropTypes.func,
  image: PropTypes.string,
};
export default Modal;
