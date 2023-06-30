import { ImageGalleryitem } from 'components/ImageGalleryItem/ImageGalleryItem';
import css from 'components/ImageGallery/ImageGallery.module.css';
import PropTypes from 'prop-types';

// przyjmuję jako parametr obiekt zawierający właściwość photos
export const ImageGallery = ({ photos, imageAddress }) => {
  return (
    <ul className={css.ImageGallery}>
      {/* dla każdego obiektu photo z tablicy photos
      renderowany jest komponent ImageGalleryitem przy użyciu metody .map */}
      {photos.map(photo => {
        // przekazuję atrybuty id, webformatURL itp.
        const { id, webformatURL, tags, largeImageURL } = photo;
        // komponent ImageGalleryitem jest renderowany i przekazuje wartości id, webformatURL itp. jako atrybuty (props)
        return (
          <ImageGalleryitem
            key={id}
            webformatURL={webformatURL}
            largeImageURL={largeImageURL}
            imageAddress={imageAddress}
            tags={tags}
          />
        );
      })}
    </ul>
  );
};

ImageGallery.propTypes = {
  photos: PropTypes.array.isRequired,
  imageAddress: PropTypes.func.isRequired,
};
