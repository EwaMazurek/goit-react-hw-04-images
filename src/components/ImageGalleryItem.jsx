import { Component } from 'react';
import PropTypes from 'prop-types';
class ImageGalleryItem extends Component {
  render() {
    return (
      <>
        {this.props.fetchedData.map(item => (
          <li
            key={item.id}
            className="ImageGalleryItem"
            onClick={() => this.props.showModal(item.largeImageURL)}
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
  }
}

ImageGalleryItem.propTypes = {
  fetchedData: PropTypes.array,
  showModal: PropTypes.func,
};
export default ImageGalleryItem;
