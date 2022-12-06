import { Component } from 'react';
import css from './App.module.css';
import { SearchForm } from 'components/Searchbar/Searchbar';

// import { getImages } from '../../services/image-api';

export class App extends Component {
  state = {
    images: [],
    image: 'cat',
    isLoading: false,
  };

  handleSubmit = data => {
    console.log(data);
    this.setState({ image: data.image });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState !== this.props.state) {
      // const data = getImages(this.state.image).then(res =>
      //   res.json().then(res)
      // );
      // this.setState()
    }
  }

  render() {
    return (
      <div className={css.appWrapper}>
        Images
        <SearchForm onFormSubmit={this.handleSubmit} />
      </div>
    );
  }
}
