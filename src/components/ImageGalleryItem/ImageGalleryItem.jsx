export const ImageGalleryItem = ({ id, webformatURL }) => {
  return (
    <li key={id} className="gallery-item">
      <img src={webformatURL} alt="" />
    </li>
  );
};
