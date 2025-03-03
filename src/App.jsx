import { useEffect, useState } from 'react';
import './App.css';
import SearchBar from './components/SearchBar/SearchBar.jsx';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn.jsx';
import Loader from './components/Loader/Loader.jsx';
import ImageGallery from './components/ImageGallery/ImageGallery.jsx'
import ModalImage from './components/ImageModal/ImageModal.jsx'
import axios from 'axios';
import toast from 'react-hot-toast';
import Modal from 'react-modal';
import ErrorMessage from './components/ErrorMessage/ErrorMessage.jsx';

const API_KEY = "tp34Odr_3BAAPDxyfW_uOW2KXWVVcYSieVmGJimjlhk";
const API_URL = "https://api.unsplash.com/search/photos";
  // для модалки
Modal.setAppElement('#root');
  // ....для модалки

function App() {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  // для модалки
   const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  // стан для помилки
  const [isError, setIsError] = useState(false);
 


  const openModal = (image) => {
    setSelectedImage(image.urls.regular); // велике зображення
    setIsModalOpen(true);
  };

    const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };
 // ...для модалки

  const fetchImages = async (newQuery, newPage) => {
    setIsLoading(true);

    try {
      setIsError(false);
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
        // повідомлення про помилку...................................
        setIsError(true);
        toast.error("Відсутні зображення.");
      }

      setImages((prevImages) => [...prevImages, ...response.data.results]);
      
    } catch (error) {
      setIsError(true);
      toast.error("Помилка при завантаженні зображень.");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (query.trim() === "") {
      setIsError(true);
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

  useEffect(() => {
    if (query !== "") {
      fetchImages(query, page);
    }
  }, [query, page]);

  return (
    <>
      <SearchBar 
        images={images} 
        query={query} 
        setQuery={setQuery} 
        handleSubmit={handleSubmit} 
      />
      <ImageGallery images={images} openModal={openModal} /> 
      {/* тост перенесений в компонент............................ */}
      {isError && <ErrorMessage />}
      {isLoading && <Loader />} 
      {hasMore && images.length > 0 && !isLoading && (
        <LoadMoreBtn onLoadMore={handleLoadMore} />
      )}

      <ModalImage 
        isOpen={isModalOpen} 
        closeModal={closeModal} 
        selectedImage={selectedImage} 
        CloseModal={closeModal}
      />
      
    </>
  );
}

export default App;