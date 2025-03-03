import { useState, useEffect } from 'react';
import './App.css';
import SearchBar from './components/SearchBar/SearchBar.jsx';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn.jsx';
import Loader from './components/Loader/Loader.jsx';
import ImageGallery from './components/ImageGallery/ImageGallery.jsx';
import ModalImage from './components/ImageModal/ImageModal.jsx';
import axios from 'axios';
import toast from 'react-hot-toast';
import Modal from 'react-modal';
import ErrorMessage from './components/ErrorMessage/ErrorMessage.jsx';

const API_KEY = "tp34Odr_3BAAPDxyfW_uOW2KXWVVcYSieVmGJimjlhk";
const API_URL = "https://api.unsplash.com/search/photos";

Modal.setAppElement('#root');

function App() {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isError, setIsError] = useState(false);

  const openModal = (image) => {
    setSelectedImage(image.urls.regular);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  const fetchImages = async () => {
    if (!query) return; 

    setIsLoading(true);

    try {
      setIsError(false);
      const response = await axios.get(API_URL, {
        params: {
          query,
          client_id: API_KEY,
          per_page: 10,
          page,
        },
      });

      if (response.data.results.length === 0) {
        setHasMore(false);
        setIsError(true);
        toast.error("Відсутні зображення.");
      }

      setImages((prevImages) => (page === 1 ? response.data.results : [...prevImages, ...response.data.results]));

    } catch (error) {
      setIsError(true);
      toast.error("Помилка при завантаженні зображень.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, [query, page]);

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <>
      <SearchBar query={query} setQuery={setQuery} />
      <ImageGallery images={images} openModal={openModal} /> 
      {isError && <ErrorMessage />}
      {isLoading && <Loader />} 
      {hasMore && images.length > 0 && !isLoading && (
        <LoadMoreBtn onLoadMore={handleLoadMore} />
      )}
      <ModalImage isOpen={isModalOpen} closeModal={closeModal} selectedImage={selectedImage} />
    </>
  );
}

export default App;