import css from 'components/Modal/Modal.module.css';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

export const Modal = ({ onClick, imageAddress }) => {
  const modalClose = e => {
    if (e.key === 'Escape' || e.type === 'click') {
      onClick('');
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', modalClose, false);
    return () => {
      document.removeEventListener('keydown', modalClose, false);
    };
  });

  return (
    <div className={css.Overlay} onClick={modalClose}>
      <div className={css.Modal}>
        <img src={imageAddress} alt="modal" />
      </div>
    </div>
  );
};

Modal.propTypes = {
  imageAddress: PropTypes.string,
  modalClose: PropTypes.func,
};
