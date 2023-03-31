import PropTypes from 'prop-types';
import { useEffect } from 'react';
export const Modal = ({ image, closeModal }) => {
  useEffect(() => {
    const handleEscClose = event => {
      if (event.code === 'Escape' || event.keyCode === 27) {
        closeModal();
      }
    };
    const handleMouseClose = event => {
      if (event.target === event.currentTarget) {
        closeModal();
      }
    };
    window.addEventListener('keydown', handleEscClose);
    const modalBcg = document.querySelector('.Overlay');
    modalBcg.addEventListener('click', handleMouseClose);
    return () => {
      window.removeEventListener('keydown', handleEscClose);
      modalBcg.removeEventListener('click', handleMouseClose);
    };
  }, []);

  return (
    <div className="Overlay">
      <div className="Modal">
        <img src={image} alt="large pic" />
      </div>
    </div>
  );
};

Modal.propTypes = {
  handleEscClose: PropTypes.func,
  handleMouseClose: PropTypes.func,
  image: PropTypes.string,
};
