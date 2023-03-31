import PropTypes from 'prop-types';
import axios from 'axios';
import { Searchbar } from './Searchbar.jsx';
import { ImageGallery } from './ImageGallery.jsx';
import { ImageGalleryItem } from './ImageGalleryItem.jsx';
import { Button } from './Button.jsx';
import { Loader } from './Loader.jsx';
import { Modal } from './Modal.jsx';
import { useState } from 'react';
axios.defaults.baseURL = 'https://pixabay.com/api';

export const App = () => {
  const API_KEY = '33287723-ac3e9d0bf292ee3d9e11c0a66';
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState('');
  const [fetchedImages, setFetchedImages] = useState([]);
  const [clickedImg, setClickedImg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchImagesForPage = async (pageNumber, query) => {
    const response = await axios.get(
      `/?q=${query}&page=${pageNumber}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
    );
    const data = await response.data.hits;
    return data;
  };

  const handleLoadMoreClick = async () => {
    setIsLoading(true);
    const nextPage = currentPage + 1;
    const newImages = await fetchImagesForPage(nextPage, query);
    setFetchedImages([...fetchedImages, ...newImages]);
    setIsLoading(false);
    setCurrentPage(nextPage);
  };

  const handleQuery = event => {
    event.preventDefault();
    const inputValue = event.target.elements.searchInput.value;
    setCurrentPage(1);
    if (query !== inputValue) {
      setQuery(inputValue);
      fetchInitialImages(inputValue);
    } else {
      window.alert(
        'Your query is the same as previous one. Try something different'
      );
    }
  };

  const fetchInitialImages = async query => {
    setIsLoading(true);
    const initialImages = await fetchImagesForPage(currentPage, query);
    if (initialImages.length === 0) {
      setIsLoading(false);
      setFetchedImages([]);
      window.alert('Looks like there are no images matching your search');
    } else {
      setFetchedImages(initialImages);
      setIsLoading(false);
    }
  };

  const showModal = image => {
    setClickedImg(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="App">
      <Searchbar handleSubmit={handleQuery}></Searchbar>
      <ImageGallery>
        <ImageGalleryItem fetchedData={fetchedImages} showModal={showModal} />
      </ImageGallery>
      {isLoading && <Loader />}
      {isModalOpen && (
        <Modal image={clickedImg} closeModal={() => closeModal()} />
      )}
      {fetchedImages.length > 11 && (
        <Button handleLoadingMore={handleLoadMoreClick}></Button>
      )}
    </div>
  );
};

App.propTypes = {
  API_KEY: PropTypes.string,
};
