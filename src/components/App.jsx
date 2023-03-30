import PropTypes from 'prop-types';
import { Component } from 'react';
import Searchbar from './Searchbar.jsx';
import axios from 'axios';
import { ImageGallery } from './ImageGallery.jsx';
import ImageGalleryItem from './ImageGalleryItem.jsx';
import Button from './Button.jsx';
import { Loader } from './Loader.jsx';
import Modal from './Modal.jsx';
axios.defaults.baseURL = 'https://pixabay.com/api';
export class App extends Component {
  API_KEY = '33287723-ac3e9d0bf292ee3d9e11c0a66';

  state = {
    query: '',
    responses: [],
    isLoading: false,
    hideModal: true,
    largeImage: '',
    page: 1,
  };

  incPage = () => {
    this.handleSearch(this.state.query);
  };

  handleSearch = async query => {
    this.setState({ isLoading: true });
    const response = await axios.get(
      `/?q=${query}&page=${this.state.page}&key=${this.API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
    );
    this.setState(prevState => ({ page: prevState.page + 1 }));
    const data = response.data.hits;
    if (data.length === 0) {
      this.setState({ isLoading: false });
      window.alert('Looks like there are no images matching your search');
    } else {
      this.setState(prevState => ({
        responses: [...prevState.responses, ...data],
        isLoading: false,
      }));
    }
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (prevState.query !== this.state.query)
      this.handleSearch(this.state.query);
  };

  handleQuery = event => {
    event.preventDefault();
    const inputValue = event.target.elements.searchInput.value;
    if (this.state.query !== inputValue) {
      this.setState({ responses: [], page: 1 });
      this.setState({ query: inputValue });
    } else window.alert("You're testing me, aren't you?");
  };

  showModal = image => {
    this.setState({ hideModal: false, largeImage: image });
  };

  closeModal = () => {
    this.setState({ hideModal: true });
  };

  render() {
    return (
      <div className="App">
        <Searchbar handleSubmit={this.handleQuery}></Searchbar>
        {this.state.isLoading && <Loader />}
        <ImageGallery>
          <ImageGalleryItem
            fetchedData={this.state.responses}
            showModal={this.showModal}
          />
        </ImageGallery>
        {this.state.hideModal === false && (
          <Modal image={this.state.largeImage} closeModal={this.closeModal} />
        )}
        {this.state.responses.length > 11 && (
          <Button handleLoadingMore={this.incPage}></Button>
        )}
      </div>
    );
  }
}

App.propTypes = {
  API_KEY: PropTypes.string,
};
