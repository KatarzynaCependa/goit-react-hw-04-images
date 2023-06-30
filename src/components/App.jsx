import { Component } from 'react';
import { searchApi } from './services/searchApi';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Loader } from 'components/Loader/Loader';
import { Modal } from 'components/Modal/Modal';
import { Button } from 'components/Button/Button';

export class App extends Component {
  state = {
    photos: [],
    isLoading: false,
    error: null,
    searchValue: '',
    page: 1,
  };

  async componentDidUpdate(prevState, prevProps) {
    if (
      // sprawdzenie czy wartość wyszukiwania lub strona wyników zostały zmienione w porównaniu do poprzednich propsów (prevState i prevProps)
      this.state.searchValue !== prevProps.searchValue ||
      this.state.page !== prevProps.page
    ) {
      try {
        // ustawia flagę "isLoading" na true, oznaczając rozpoczęcie procesu ładowania
        this.setState({ isLoading: true });
        // przyjęcie 2 parametrów (wartość wyszukiwania i numer strony)
        const photos = await searchApi(this.state.searchValue, this.state.page);

        photos.map(photo => {
          return this.setState(prevState => ({
            photos: [
              // spread operator - istniejące zdjęcia w stanie komponentu są zachowane, a nowe zdjęcie jest dodawane jako ostatni element tablicy
              ...prevState.photos,
              {
                id: photo.id,
                webformatURL: photo.webformatURL,
                largeImageURL: photo.largeImageURL,
                tags: photo.tags,
              },
            ],
          }));
        });
      } catch (error) {
        this.setState({ error });
      } finally {
        // ustawia flagę "isLoading" na false, oznaczając zakończenie procesu ładowania
        this.setState({ isLoading: false });
      }
    }
  }

  searchValue = e => this.setState({ photos: [], searchValue: e });

  // zwraca aktualną tablicę zdjęć znajdujących się w stanie komponentu
  showPhotos = () => {
    const { photos } = this.state;
    return photos;
  };

  handleButtonVisibility = () => {
    if (this.state.photos.length < 12) return 'none';
  };

  loadMore = e => {
    if (e) {
      this.setState({ page: this.state.page + 1 });

      setTimeout(() => {
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: 'smooth',
        });
      }, 500);
    }
  };

  handleModal = imageAddress => this.setState({ modal: imageAddress });

  modalClose = e => this.setState({ modal: e });

  passImgToModal = () => this.state.modal;

  render() {
    return (
      <>
        <Searchbar onSubmit={this.searchValue} />
        <ImageGallery
          photos={this.showPhotos()}
          imageAddress={this.handleModal}
        />
        {this.state.isLoading && <Loader />}
        <div
          className="ButtonContainer"
          style={{ display: this.handleButtonVisibility() }}
        >
          {!this.state.isLoading && <Button onClick={this.loadMore} />}
        </div>
        {this.state.modal && (
          <Modal
            imageAddress={this.passImgToModal()}
            onClick={this.modalClose}
          />
        )}
      </>
    );
  }
}
