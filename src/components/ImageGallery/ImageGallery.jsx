import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';
export const ImageGallery = ({ images, onSelect }) => {
  return (
    <ul className={css.gallery}>
      {images.map(({ id, webformatURL, largeImageURL }) => {
        return (
          <ImageGalleryItem
            id={id}
            key={id}
            webformatURL={webformatURL}
            largeImageURL={largeImageURL}
            onSelect={onSelect}
          />
        );
      })}
    </ul>
  );
};
