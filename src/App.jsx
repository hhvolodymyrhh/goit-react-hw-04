import { useState } from 'react';
import './App.css';
import SearchBar from './components/SearchBar/SearchBar.jsx';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn.jsx';
import Loader from './components/Loader/Loader.jsx';
import axios from 'axios';
import toast from 'react-hot-toast';
import Modal from 'react-modal';

const API_KEY = "tp34Odr_3BAAPDxyfW_uOW2KXWVVcYSieVmGJimjlhk";
const API_URL = "https://api.unsplash.com/search/photos";

function App() {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const fetchImages = async (newQuery, newPage) => {
    setIsLoading(true);

    try {
      const response = await axios.get(API_URL, {
        params: {
          query: newQuery,
          client_id: API_KEY,
          per_page: 10,
          page: newPage,
        },
      });
      
      if (response.data.results.length === 0) {
        setHasMore(false);
      }

      setImages((prevImages) => [...prevImages, ...response.data.results]);
    } catch (error) {
      toast.error("Помилка при завантаженні зображень.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (query.trim() === "") {
      toast.error("Будь ласка, введіть текст для пошуку зображень.");
      return;
    }
    
    setImages([]);  
    setPage(1); 
    setHasMore(true); 
    fetchImages(query, 1);
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchImages(query, nextPage); 
  };

  return (
    <>
      <SearchBar 
        images={images} 
        query={query} 
        setQuery={setQuery} 
        handleSubmit={handleSubmit} 
      />
      {isLoading && <Loader />} 
      {hasMore && images.length > 0 && !isLoading && (
        <LoadMoreBtn onLoadMore={handleLoadMore} />
      )}
    </>
  );
}

export default App;