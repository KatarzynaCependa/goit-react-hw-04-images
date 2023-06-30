import css from 'components/Button/Button.module.css';
import PropTypes from 'prop-types';

export const Button = ({ onClick }) => {
  const handleClick = e => onClick(e);

  return (
    <button type="button" onClick={handleClick} className={css.Button}>
      Load more
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
