import PropTypes from 'prop-types';

export const ImageGalleryItem = ({
  id,
  webformatURL,
  largeImageURL,
  onSelect,
}) => {
  return (
    <li key={id} className="gallery-item">
      <img src={webformatURL} alt="" onClick={() => onSelect(largeImageURL)} />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
};
