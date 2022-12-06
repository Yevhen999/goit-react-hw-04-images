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
  };

  handleSubmit = data => {
    const { image } = data;
    this.setState({ image: image });
    getImages(image)
      .then(res => res.json())
      .then(({ hits }) => {
        this.setState({ images: hits });
      });
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
        Images
        <SearchForm onFormSubmit={this.handleSubmit} />
        <ImageGallery images={this.state.images} />
      </div>
    );
  }
}
