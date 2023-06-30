import { searchApi } from './services/searchApi';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Loader } from 'components/Loader/Loader';
import { Modal } from 'components/Modal/Modal';
import { Button } from 'components/Button/Button';
import { useEffect, useState } from 'react';

export const App = () => {
  const [photos, setPhotos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [modal, setModal] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    const asyncFunction = async () => {
      try {
        // ustawia flagę "isLoading" na true, oznaczając rozpoczęcie procesu ładowania
        setIsLoading(true);
        // przyjęcie 2 parametrów (wartość wyszukiwania i numer strony)
        const photos = await searchApi(searchValue, page);

        const searchedPhotos = photos.map(photo => {
          return {
            id: photo.id,
            webformatURL: photo.webformatURL,
            largeImageURL: photo.largeImageURL,
            tags: photo.tags,
          };
        });

        // jeśli searchValue nie jest pusty to wykonywana jest funkcja setPhotos
        // która przyjmuje funkcję zwrotną jako argument, do starej tablicy dołączamy nową
        // za pomocą spread operatora
        searchValue !== '' && setPhotos(photo => [...photo, ...searchedPhotos]);
      } catch (error) {
        console.log(error);
      } finally {
        // ustawia flagę "isLoading" na false, oznaczając zakończenie procesu ładowania
        setIsLoading(false);
      }
    };
    asyncFunction();
  }, [searchValue, page]);

  const searchInputValue = e => {
    setPhotos([]);
    setPage(1);
    setSearchValue(e);
  };

  const handleButtonVisibility = () => {
    if (photos.length < 12) return 'none';
  };

  const loadMore = e => {
    if (e) {
      setPage(page + 1);

      setTimeout(() => {
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: 'smooth',
        });
      }, 500);
    }
  };

  const handleModal = imageAddress => setModal(imageAddress);

  const modalClose = e => setModal(e);

  const passImgToModal = () => modal;

  return (
    <>
      <Searchbar onSubmit={searchInputValue} />
      <ImageGallery photos={photos} imageAddress={handleModal} />
      {isLoading && <Loader />}
      <div
        className="ButtonContainer"
        style={{ display: handleButtonVisibility() }}
      >
        {!isLoading && <Button onClick={loadMore} />}
      </div>
      {modal && <Modal imageAddress={passImgToModal()} onClick={modalClose} />}
    </>
  );
};
