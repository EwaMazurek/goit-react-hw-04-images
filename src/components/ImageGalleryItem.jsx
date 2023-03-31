import PropTypes from 'prop-types';
export const ImageGalleryItem = ({ fetchedData, showModal }) => {
  return (
    <>
      {fetchedData.map(item => (
        <li
          key={item.id}
          className="ImageGalleryItem"
          onClick={() => showModal(item.largeImageURL)}
        >
          <img
            className="ImageGalleryItem-image"
            src={item.webformatURL}
            alt="some nice pic"
          />
        </li>
      ))}
    </>
  );
};

ImageGalleryItem.propTypes = {
  fetchedData: PropTypes.array,
  showModal: PropTypes.func,
};
