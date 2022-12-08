import { Component } from 'react';
import css from './App.module.css';
import { SearchForm } from 'components/Searchbar/Searchbar';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { getImages } from '../../services/query-api';
import { ThreeDots } from 'react-loader-spinner';
import { Modal } from '../Modal/Modal';

export class App extends Component {
  state = {
    images: [],
    query: '',
    isLoading: false,
    page: 1,
    totalHits: '',
    error: null,
    status: 'idle',
    showImage: false,
    selectedImage: null,
  };

  setSelectedImage = url => {
    this.setState({ selectedImage: url });
  };

  closeModal = event => {
    console.log(event.target.nodeName);
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
        {isLoading && (
          <ThreeDots
            height="80"
            width="80"
            radius="9"
            color="purple"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClassName=""
            visible={true}
          />
        )}
        <button type="button" onClick={this.closeModal}>
          Open
        </button>

        {selectedImage !== null && (
          <Modal imageUrl={selectedImage} onClick={this.closeModal} />
        )}

        <ImageGallery images={images} onSelect={this.setSelectedImage} />
        {!isLoading && total > page && (
          <button type="button" onClick={this.loadMore}>
            Load more
          </button>
        )}
      </div>
    );
  }
}
