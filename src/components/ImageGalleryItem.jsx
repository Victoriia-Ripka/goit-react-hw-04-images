import { useState } from 'react';
import { Img } from './styles.styled';
import { PropTypes } from 'prop-types';
import { Modal } from './Modal';

export const ImageGalleryItem = ({image}) =>  {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

    return (
      <>
        <Img
          src={image.webformatURL}
          alt={image.tags}
          onClick={openModal}
        />
        {isModalOpen && <Modal imageURL={image.largeImageURL} onClose={closeModal} />}
      </>
    );

}

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    largeImageURL: PropTypes.string,
    webformatURL: PropTypes.string,
    tags: PropTypes.string,
  }).isRequired,
};
