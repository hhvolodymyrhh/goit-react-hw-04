import toast, { Toaster } from "react-hot-toast";
import css from "./SearchBar.module.css";
import ImageGallery from '../ImageGallery/ImageGallery.jsx';

const SearchBar = ({ images, query, setQuery, handleSubmit }) => {
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
      <Toaster position="top-right" />
      <ImageGallery images={images} />  
     
    </header>
  );
};

export default SearchBar;