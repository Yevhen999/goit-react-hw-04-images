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
