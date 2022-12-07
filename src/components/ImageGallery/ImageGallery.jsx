import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';
export const ImageGallery = ({ images }) => {
  return (
    <ul className={css.gallery}>
      {images.map(({ id, webformatURL }) => {
        return (
          <ImageGalleryItem id={id} key={id} webformatURL={webformatURL} />
        );
      })}
    </ul>
  );
};
