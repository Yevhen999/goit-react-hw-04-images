import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
export const ImageGallery = ({ images }) => {
  return (
    <ul className="gallery">
      {images.map(({ id, webformatURL }) => {
        return (
          <ImageGalleryItem id={id} key={id} webformatURL={webformatURL} />
        );
      })}
    </ul>
  );
};
