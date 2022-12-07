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
  };

  loadMore = () => {
    this.setState(prevState => {
      return { page: prevState.page + 1 };
    });
  };

  handleSubmit = data => {
    const { query } = data;
    this.setState({ query, page: 1 });
  };

  componentDidUpdate(_, prevState) {
    const { query, page } = this.state;

    if (prevState.query !== query || prevState.page !== page) {
      this.setState({ isLoading: true });
      setTimeout(() => {
        try {
          getImages(query, page).then(res =>
            res.json().then(({ hits }) => this.setState({ images: hits }))
          );
        } catch (error) {
          console.log(error);
        } finally {
          this.setState({ isLoading: false });
        }
      }, 2000);
    }
  }

  render() {
    return (
      <div className={css.appWrapper}>
        <SearchForm onFormSubmit={this.handleSubmit} />
        {this.state.isLoading && <h2>Loading</h2>}
        <button type="button" onClick={this.loadMore}>
          Load more
        </button>
        <ImageGallery images={this.state.images} />
      </div>
    );
  }
}
