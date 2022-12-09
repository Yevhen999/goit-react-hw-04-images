import { Component } from 'react';
import css from './App.module.css';
import { SearchForm } from 'components/Searchbar/Searchbar';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { getImages } from '../../services/query-api';
import { Loader } from '../Loader/Loader';
import { ButtonLoadMore } from '../ButtonLoadMore/ButtonLoadMore';
import { Modal } from '../Modal/Modal';

export class App extends Component {
  state = {
    images: [],
    query: '',
    isLoading: false,
    page: 1,
    totalHits: '',
    error: null,
    selectedImage: null,
  };

  setSelectedImage = url => {
    this.setState({ selectedImage: url });
  };

  onCloseEsc = e => {
    if (e.code === 'Escape') {
      this.setState({ selectedImage: null });
    }
    return;
  };

  closeModal = event => {
    if (event.target.nodeName !== 'IMG') {
      this.setState({ selectedImage: null });
    }
    return;
  };

  loadMore = () => {
    this.setState(prevState => {
      return { page: prevState.page + 1 };
    });
  };

  handleSubmit = data => {
    const { query } = data;
    if (query === this.state.query) {
      return;
    }
    this.setState({ query, page: 1, images: [] });
  };

  componentDidUpdate(_, prevState) {
    const { query, page } = this.state;

    if (prevState.query !== query || prevState.page !== page) {
      this.setState({ isLoading: true });
      setTimeout(() => {
        try {
          getImages(query, page).then(res =>
            res.json().then(({ hits, totalHits }) => {
              this.setState(prevState => {
                return { images: [...prevState.images, ...hits], totalHits };
              });
            })
          );
        } catch (error) {
          this.setState({ error: error.message });
        } finally {
          this.setState({ isLoading: false });
        }
      }, 500);
    }
  }

  render() {
    const { page, isLoading, selectedImage, images, totalHits } = this.state;
    const total = totalHits / 12;

    return (
      <div className={css.appWrapper}>
        <SearchForm onFormSubmit={this.handleSubmit} />
        {isLoading && <Loader />}

        {selectedImage !== null && (
          <Modal
            imageUrl={selectedImage}
            onClick={this.closeModal}
            onCloseEsc={this.onCloseEsc}
          />
        )}

        <ImageGallery images={images} onSelect={this.setSelectedImage} />
        {!isLoading && total > page && (
          <ButtonLoadMore onClick={this.loadMore} />
        )}
      </div>
    );
  }
}
