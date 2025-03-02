import toast, { Toaster } from "react-hot-toast";
import css from "./SearchBar.module.css";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

const SearchBar = ({ query, setQuery, handleSubmit }) => {
  return (
    <header className={css.searchBar}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      
       
    </header>
  );
};

export default SearchBar;