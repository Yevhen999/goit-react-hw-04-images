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
    setError(null);
  };

  useEffect(() => {
    if (query === '') {
      return;
    }

    const fetchImages = async () => {
      try {
        setIsLoading(true);
        const data = await getImages(query, page);
        const { hits, totalHits } = data;
        if (hits.length === 0) {
          return setError('Nothing was found, try again, please');
        }
        const newImages = await hits.map(
          ({ id, tags, webformatURL, largeImageURL }) => {
            return { id, tags, webformatURL, largeImageURL };
          }
        );
        setImages(prevImages => [...prevImages, ...newImages]);
        setTotalHits(totalHits);
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

      {error !== null && (
        <h1
          style={{
            margin: '0 auto',
          }}
        >
          {error}
        </h1>
      )}

      {isLoading && <Loader />}

      {selectedImage !== null && (
        <Modal
          imageUrl={selectedImage}
          onClick={closeModal}
          onCloseEsc={onCloseEsc}
        />
      )}

      <ImageGallery images={images} onSelect={onSetSelectedImage} />
      {total > page && <ButtonLoadMore onClick={loadMore} />}
    </div>
  );
};
