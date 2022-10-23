import { useState, useEffect } from 'react';
import { Searchbar } from './Searchbar';
import ImageGallery from './ImageGallery';
import { AppSection, ButtonWrapper } from './styles.styled';
import { fetchImages } from 'api';
import { Button } from './Button';
import { Loader } from './Loader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  const [input, setInput] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState('');

  const handleSubmit = e => {
    setInput(e);
    setPage(1);
  };

  useEffect(() => {
    if (input === '') {
      return;
    }
    setLoading('true');
    fetchImages(input, page)
      .then(response => {
        if (response.length > 0) {
          page > 1
            ? setImages(prev => [...prev, ...response])
            : setImages([...response]);
        } else {
          toast.error('Wrong request');
        }
        setLoading('');
      })
      .catch(error => {
        console.log(error);
      });
  }, [input, page]);

  const loadMore = () => {
    setPage(page => page + 1);
  };

  return (
    <AppSection>
      <Searchbar onSubmit={handleSubmit} />
      {loading && <Loader />}
      <ImageGallery
        images={images}
      />
      <ButtonWrapper>
        {images.length >= 12 && <Button loadMore={loadMore} />}
      </ButtonWrapper>
      <ToastContainer autoClose={3000} />
    </AppSection>
  );
}
