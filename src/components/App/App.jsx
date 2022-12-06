import { Component } from 'react';
import css from './App.module.css';
import { getImages } from '../../services/image-api';

export class App extends Component {
  state = {
    images: [],
    image: '',
    isLoading: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState !== this.props.state) {
      console.log(getImages(this.state.image));
    }
  }

  render() {
    return <div className={css.appWrapper}>Images</div>;
  }
}
