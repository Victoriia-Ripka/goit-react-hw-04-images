import { ImageGalleryItem } from './ImageGalleryItem';
import { Gallery, Image } from './styles.styled';
import { PropTypes } from 'prop-types';

import { nanoid } from 'nanoid';

export default function ImageGallery({ images }) {

  return (
    <>
      <Gallery>
        {images.map(image => (
          <Image key={nanoid()}>
            <ImageGalleryItem image={image} />
          </Image>
        ))}
      </Gallery>
    </>
  );
}

ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
};
