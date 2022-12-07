import { Component } from 'react';
import css from './App.module.css';
import { SearchForm } from 'components/Searchbar/Searchbar';
import { ImageGallery } from '../ImageGallery/ImageGallery';

import { getImages } from '../../services/image-api';

export class App extends Component {
  state = {
    images: [],
    image: '',
    isLoading: false,
    page: 1,
  };

  handleSubmit = async data => {
    const { image } = data;

    // await
    this.setState({ image: image, isLoading: true });

    try {
      await getImages(image)
        .then(res => res.json())
        .then(({ hits }) => {
          this.setState({ images: hits, page: 1 });
        });
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  componentDidUpdate(prevProps, prevState) {
    const image = this.props;

    if (prevState.image !== image) {
      getImages(image).then(res => res.json().then(res => console.log(res)));
    }
  }

  render() {
    return (
      <div className={css.appWrapper}>
        <SearchForm onFormSubmit={this.handleSubmit} />
        {this.state.isLoading && <h2>Loading</h2>}
        <ImageGallery images={this.state.images} />
        <button type="button">Load more</button>
      </div>
    );
  }
}
