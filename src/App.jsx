import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import { useEffect, useState } from 'react';
import { fetchArticles } from './services/api';
import ImageModal from './components/ImageModal/ImageModal';

function App() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); 

  useEffect(() => {
    const fetchImages = async () => {
      if (query === '') return; 
      try {
        setIsError(false);
        setIsLoading(true);

        const response = await fetchArticles(query, page);
        
        if (page === 1) {
          setImages(response.results);
        } else {
          setImages((prevImages) => [...prevImages, ...response.results]);
        }
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, [query, page]); 

  const handleSearch = (newQuery) => {
    setQuery(newQuery);  
    setPage(1);  
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);  
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
