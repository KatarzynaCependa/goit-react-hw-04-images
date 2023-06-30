import css from 'components/Searchbar/Searchbar.module.css';
import { Component } from 'react';
import PropTypes from 'prop-types';

export class Searchbar extends Component {
  state = {
    name: '',
  };

  // przekazywane jest zdarzenie 'e'
  handleSubmit = e => {
    // aby zapobiec domyślnemu zachowaniu formularza (np. przeładowanie strony)
    e.preventDefault();
    // za pomocą destrukturyzacji pobierana jest wartość pola 'name' ze stanu komponentu
    const { name } = this.state;
    // wartość pola 'name' jest przekazywana jako parametr do metody onSubmit, która jest przekazywana jako właściwość (props) komponentu Searchbar
    this.props.onSubmit(name);
    // stan komponentu jest aktualizowany, ustawiam 'name' na pusty string, aby wyczyścić pole wejściowe
    this.setState({ name: '' });
  };

  // obsługa zmiany wartości pola wejściowego
  handleChange = e => {
    // pobieram wartość value ze zdarzenia e.target
    const { value } = e.target;
    // aktualizuję 'name' w stanie komponentu
    this.setState({ name: value });
  };

  render() {
    const { name } = this.state;
    return (
      <header className={css.Searchbar}>
        {/* po wprowadzeniu wartości i kliknięciu "Search",
        wartość jest przekazywana do komponentu App poprzez metodę onSubmit,
        a pole wejściowe jest czyszczone */}
        <form className={css.SearchForm} onSubmit={this.handleSubmit}>
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
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
