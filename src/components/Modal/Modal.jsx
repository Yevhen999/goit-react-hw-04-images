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
    return (
      <div className={css.overlay} onClick={this.props.onClick}>
        <div className={css.modal}>
          <button type="button">Close</button>
          <img src={this.props.imageUrl} alt="" />
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
