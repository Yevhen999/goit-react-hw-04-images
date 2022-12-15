import { useState, useEffect } from 'react';
import css from './App.module.css';
import { SearchForm } from 'components/Searchbar/Searchbar';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { getImages } from '../../services/query-api';
import { Loader } from '../Loader/Loader';
import { ButtonLoadMore } from '../ButtonLoadMore/ButtonLoadMore';
import { Modal } from '../Modal/Modal';

export const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalHits, setTotalHits] = useState('');
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const onSetSelectedImage = url => {
    setSelectedImage(url);
  };

  const onCloseEsc = e => {
    if (e.code === 'Escape') {
      setSelectedImage(null);
    }
    return;
  };

  const closeModal = event => {
    if (event.target.nodeName !== 'IMG') {
      setSelectedImage(null);
    }
    return;
  };

  const handleSubmit = data => {
    if (data.query === query) {
      return;
    }
    setQuery(data.query);
    setPage(1);
    setImages([]);
  };

  useEffect(() => {
    if (query === '') {
      return;
    }

    const fetchImages = async () => {
      try {
        setIsLoading(true);
        const data = await getImages(query, page);
        const newImages = await data.hits.map(
          ({ id, tags, webformatURL, largeImageURL }) => {
            return { id, tags, webformatURL, largeImageURL };
          }
        );
        setImages(prevImages => [...prevImages, ...newImages]);
        setTotalHits(data.totalHits);
      } catch {
        setError('Failed to fetch');
      } finally {
        setIsLoading(false);
      }
    };
    fetchImages();
  }, [query, page]);

  const loadMore = () => {
    setPage(page + 1);
  };

  const total = totalHits / 12;

  return (
    <div className={css.appWrapper}>
      <SearchForm onFormSubmit={handleSubmit} />

      {error !== null && <h1>{error}</h1>}

      {isLoading && <Loader />}

      {selectedImage !== null && (
        <Modal
          imageUrl={selectedImage}
          onClick={closeModal}
          onCloseEsc={onCloseEsc}
        />
      )}

      <ImageGallery images={images} onSelect={onSetSelectedImage} />
      {!isLoading && total > page && <ButtonLoadMore onClick={loadMore} />}
    </div>
  );
};
