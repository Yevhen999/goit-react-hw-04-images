import css from './ButtonLoadMore.module.css';

export const ButtonLoadMore = ({ onClick }) => {
  return (
    <button className={css.Button} type="button" onClick={onClick}>
      Load more
    </button>
  );
};
