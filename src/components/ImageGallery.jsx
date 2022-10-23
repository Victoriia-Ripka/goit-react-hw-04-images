import { useState, useEffect } from 'react';
import { ImageGalleryItem } from './ImageGalleryItem';
import { Button } from './Button';
import { Gallery, Image, ButtonWrapper } from './styles.styled';
import { toast } from 'react-toastify';
import { fetchImages } from 'api';
import { PropTypes } from 'prop-types';
import { Loader } from './Loader';

export default function ImageGallery({ input }) {
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (input === '') {
      return;
    }
    setLoading(true);
    // console.log(loading, 'true');
    fetchImages(input, page)
      .then(response => {
        if (response.length > 0) {
          page > 1
            ? setImages(prev => [...prev, ...response])
            : setImages([...response]);
        } else {
          toast.error('Wrong request');
        }
      })
      .catch(error => {
        console.log(error);
      });
    setLoading(false);
    // console.log(loading, 'false');
  }, [input, page]);

  const loadMore = () => {
    setPage(page => page + 1);
  };

  // const onLoadingChange = () => {
  //   setLoading(loading => !loading)
  // };

  return (
    <>
      {loading && <Loader />}
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
};
