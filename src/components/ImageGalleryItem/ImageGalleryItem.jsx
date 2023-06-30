import css from 'components/ImageGalleryItem/ImageGalleryItem.module.css';
// import PropTypes from 'prop-types';

export const ImageGalleryitem = props => {
  const { id, webformatURL, largeImageURL, tags, imageAddress } = props;

  return (
    <li
      className={css.ImageGalleryItem}
      // atrybut key z wartością id
      key={id}
      // atrybut value z wartością id
      value={id}
      // gdy <li> jest kliknięty, wywoływana jest funkcja anonimowa, która przekazuje largeImageURL jako argument do funkcji imageAddress
      onClick={() => imageAddress(largeImageURL)}
    >
      <img
        src={webformatURL}
        alt={tags}
        className={css.ImageGalleryItemImage}
      />
    </li>
  );
};

// ImageGalleryItem.propTypes = {
//   id: PropTypes.number,
//   webformatURL: PropTypes.string,
//   largeImageURL: PropTypes.string,
//   tags: PropTypes.string,
//   imageAddress: PropTypes.func,
// };
