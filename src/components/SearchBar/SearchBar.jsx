import { useState } from 'react';
import css from './SearchBar.module.css';
import toast from 'react-hot-toast';

function SearchBar({ query, setQuery }) {
  const [inputValue, setInputValue] = useState(query); 

  const handleChange = (event) => {
    setInputValue(event.target.value); 
  };

  const onSubmit = (event) => {
    event.preventDefault();

    if (inputValue.trim() === "") {
      toast.error("Порожне поле пошуку!");
      return;
    }

    setQuery(inputValue.trim()); 
  };

  return (
    <header className={css.searchbar}>
      <form className={css.form} onSubmit={onSubmit}>
        <input
          className={css.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images..."
          value={inputValue}
          onChange={handleChange}
        />
        <button type="submit" className={css.button}>Search</button>
      </form>
    </header>
  );
}

export default SearchBar;