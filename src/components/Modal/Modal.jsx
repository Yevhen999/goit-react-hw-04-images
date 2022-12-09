import { Component } from 'react';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

export class Modal extends Component {
  onCloseEsc = e => {
    this.props.onCloseEsc(e);
  };

  componentDidMount() {
    window.addEventListener('keydown', this.onCloseEsc);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onCloseEsc);
  }

  render() {
    const { onClick, imageUrl } = this.props;
    return (
      <div className={css.overlay} onClick={onClick}>
        <div className={css.modal}>
          <button type="button">Close</button>
          <img width="900" height="600" src={imageUrl} alt="loading" />
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  onCloseEsc: PropTypes.func.isRequired,
};
