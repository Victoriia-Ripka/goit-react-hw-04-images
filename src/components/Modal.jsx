import { Backdrop, ImgModal } from './styles.styled';
import { PropTypes } from 'prop-types';
import { useEffect } from 'react';

export const Modal = ({ imageURL, onClose }) => {
  useEffect(() => {
    const handleClick = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleClick);
    return () => {
      window.removeEventListener('keydown', handleClick);
    };
  }, [onClose]);

  const closeModal = e => {
    if (e.target.nodeName === 'DIV') onClose();
  };

  return (
    <Backdrop onClick={closeModal}>
      <ImgModal src={imageURL} alt="hello" />
    </Backdrop>
  );
};

Modal.propTypes = {
  imageURL: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
