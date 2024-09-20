import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import LoadMore from "./components/LoadMore/LoadMore";
import { useEffect, useState } from 'react';
import { fetchArticles } from './services/api';
import ImageModal from './components/ImageModal/ImageModal';

function App() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [page, setPage] = useState(0);
  const [query, setQuery] = useState('');
  const [selectedImage, setSelectedImage] = useState(null); // Для вибраного зображення
  const [isModalOpen, setIsModalOpen] = useState(false); // Стан для модального вікна

  const handleSearch = async (query) => {
    try {
      setImages([]);
      setIsError(false);
      setIsLoading(true);
      setQuery(query);
      setPage(0);
      const response = await fetchArticles(query);
      setImages(response.results);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadMore = async () => {
    try {
      setIsLoading(true);
      let nextPage = page + 1;
      setPage(nextPage);
      const response = await fetchArticles(query, page);
      setImages((prevImages) => [...prevImages, ...response.results]);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const openModal = (imageUrl) => {
    setSelectedImage(imageUrl);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  return (
    <>
      <SearchBar onSearch={handleSearch} />
      {images.length > 0 && <ImageGallery images={images} onImageClick={openModal} />}
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {images.length > 0 && !isLoading && !isError && (
        <LoadMore handleClick={handleLoadMore} />
      )}

      {selectedImage && (
        <ImageModal 
          isOpen={isModalOpen} 
          onClose={closeModal} 
          imageUrl={selectedImage} 
        />
      )}
    </>
  );
}

export default App;
