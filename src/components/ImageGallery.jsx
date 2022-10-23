import { useState, useEffect } from 'react';
import { ImageGalleryItem } from './ImageGalleryItem';
import { Button } from './Button';
import { Gallery, Image, ButtonWrapper } from './styles.styled';
import { toast } from 'react-toastify';
import { fetchImages } from 'api';
import { PropTypes } from 'prop-types';
import { Loader } from './Loader';
import { nanoid } from 'nanoid'

export default function ImageGallery({ input }) {
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState('');

  useEffect(() => {
    if (input === '') {
      return;
    }
    setLoading('true');
    fetchImages(input, page)
      .then(response => {
        if (response.length > 0) {
          if( page === 1) {
            setImages([])
            setImages([...response])
          }
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
    <>
      {loading && <Loader />}
      <Gallery>
        {images.map(image => (
          <Image key={nanoid()}>
            <ImageGalleryItem image={image} />
          </Image>
        ))}
      </Gallery>

      <ButtonWrapper>
        {images.length > 0 && <Button loadMore={loadMore} />}
      </ButtonWrapper>
    </>
  );
}

ImageGallery.propTypes = {
  input: PropTypes.string.isRequired,
};
