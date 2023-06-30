import css from 'components/Searchbar/Searchbar.module.css';
import PropTypes from 'prop-types';
import { useState } from 'react';

export const Searchbar = ({ onSubmit }) => {
  const [name, setName] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(name);
    setName('');
  };

  // obsługa zmiany wartości pola wejściowego
  const handleChange = e => {
    const { value } = e.target;
    setName(value);
  };

  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={css.SearchFormButton}>
          <span className={css.SearchFormButtonLabel}>Search</span>
        </button>

        <input
          className={css.SearchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={name}
          // zmiana wartości wywołuje metodę handleChange
          onChange={handleChange}
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
