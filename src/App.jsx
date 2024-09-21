import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import LoadMoreBtn from "./components/LoadMore/LoadMoreBtn";
import { useEffect, useState } from 'react';
import { fetchArticles } from './services/api';
import ImageModal from './components/ImageModal/ImageModal';

function App() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [selectedImage, setSelectedImage] = useState(null); // Для вибраного зображення
  const [isModalOpen, setIsModalOpen] = useState(false); // Стан для модального вікна

  // Виконуємо запит при зміні query або page
  useEffect(() => {
    const fetchImages = async () => {
      if (query === '') return; // Якщо запит пустий, не робимо запит до API
      try {
        setIsError(false);
        setIsLoading(true);

        const response = await fetchArticles(query, page);
        
        // Якщо це перший запит (нова пошукова фраза), очищаємо попередні результати
        if (page === 1) {
          setImages(response.results);
        } else {
          // Інакше додаємо нові результати до існуючих
          setImages((prevImages) => [...prevImages, ...response.results]);
        }
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, [query, page]); // Викликати ефект при зміні query або page

  const handleSearch = (newQuery) => {
    setQuery(newQuery);  // Змінюємо пошуковий запит
    setPage(1);  // Повертаємось на першу сторінку для нового пошуку
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);  // Збільшуємо сторінку для завантаження нових результатів
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
        <LoadMoreBtn handleClick={handleLoadMore} />
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
