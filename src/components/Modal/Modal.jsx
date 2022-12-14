import { useEffect } from 'react';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

export const Modal = ({ imageUrl, onClick, onCloseEsc }) => {
  const onEscClose = e => {
    onCloseEsc(e);
  };

  useEffect(() => {
    if (imageUrl) {
      window.addEventListener('keydown', onEscClose);
    }
    return () => {
      window.removeEventListener('keydown', onEscClose);
    };
  });

  return (
    <div className={css.overlay} onClick={onClick}>
      <div className={css.modal}>
        <button type="button">Close</button>
        <img width="900" height="600" src={imageUrl} alt="loading" />
      </div>
    </div>
  );
};

Modal.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  onCloseEsc: PropTypes.func.isRequired,
};
