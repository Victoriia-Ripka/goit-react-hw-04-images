import { useState, useEffect } from 'react';
import { ImageGalleryItem } from './ImageGalleryItem';
import { Button } from './Button';
import { Gallery, Image, ButtonWrapper } from './styles.styled';
import { toast } from 'react-toastify';
import { fetchImages } from 'api';
import { PropTypes } from 'prop-types';
// loading,
export default function ImageGallery({ input, onLoadingChange }) {
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (input === '') {
      return;
    }
    onLoadingChange();
    // console.log(loading, 'true');
    fetchImages(input, page)
      .then(response => {
        if (response.length > 0) {
          page > 1
            ? setImages([...images, ...response])
            : setImages([...response]);
        } else {
          toast.error('Wrong request');
        }
      })
      .catch(error => {
        console.log(error);
      });
    onLoadingChange();
    // console.log(loading, 'false');
  }, [input, page]);

  const loadMore = () => {
    setPage(page => page + 1);
  };

  return (
    <>
      <Gallery>
        {images.map(image => (
          <Image key={image.id}>
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
  // loading: PropTypes.bool.isRequired,
  onLoadingChange: PropTypes.func.isRequired,
};
