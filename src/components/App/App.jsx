import { Component } from 'react';
import css from './App.module.css';
import { SearchForm } from 'components/Searchbar/Searchbar';
import { ImageGallery } from '../ImageGallery/ImageGallery';

import { getImages } from '../../services/query-api';

export class App extends Component {
  state = {
    images: [],
    query: '',
    isLoading: false,
    page: 1,
    totalHits: '',
    error: null,
    status: 'idle',
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
      }, 0);
    }
  }

  render() {
    const total = this.state.totalHits / 12;
    const { page } = this.state;

    return (
      <div className={css.appWrapper}>
        <SearchForm onFormSubmit={this.handleSubmit} />

        <ImageGallery images={this.state.images} />
        {!this.state.isLoading && total > page && (
          <button type="button" onClick={this.loadMore}>
            Load more
          </button>
        )}
      </div>
    );
  }
}
