import css from './Modal.module.css';
export const Modal = ({ imageUrl, onClick }) => {
  return (
    <div className={css.overlay} onClick={onClick}>
      <div className={css.modal}>
        <button type="button">Close</button>
        <img src={imageUrl} alt="hi" />
      </div>
    </div>
  );
};
