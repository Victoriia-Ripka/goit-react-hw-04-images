import { Component } from 'react';
import { ImageGalleryItem } from './ImageGalleryItem';
import { Button } from './Button';
import { Modal } from './Modal';
import { Gallery, Image, ButtonWrapper } from './styles.styled';
import { toast } from 'react-toastify';
import { fetchImages } from 'api';
import { PropTypes } from 'prop-types';

export default class ImageGallery extends Component {
  state = {
    page: 1,
    images: [],
    imageURL: null,
    isModalOpen: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.input !== this.props.input) {
      this.setState({ page: 1, images: [] });
      this.props.onLoadingChange();
      fetchImages(this.props.input, this.state.page).then(response => {
        if (response.length > 0) {
          this.setState({ images: [...response] });
          this.props.onLoadingChange();
        } else {
          this.props.onLoadingChange();
          toast.error('Wrong request');
        }
      });
    }
    if (prevState.page !== this.state.page) {
      this.props.onLoadingChange();
      fetchImages(this.props.input, this.state.page + 1).then(response => {
        this.setState({ images: [...this.state.images, ...response] });
        this.props.onLoadingChange();
      });
    }
  }

  openModal = imageURL => {
    this.setState({ isModalOpen: true, imageURL: imageURL });
  };
  closeModal = () => this.setState({ isModalOpen: false, modalUrl: null });

  loadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { images, isModalOpen, imageURL } = this.state;

    return (
      <>
        <Gallery>
          {images.map(image => (
            <Image key={image.id}>
              <ImageGalleryItem image={image} onClick={this.openModal} />
            </Image>
          ))}
        </Gallery>
        {isModalOpen && <Modal imageURL={imageURL} onClose={this.closeModal} />}
        <ButtonWrapper>
          {images.length > 0 && <Button loadMore={this.loadMore} />}
        </ButtonWrapper>
      </>
    );
  }
}

ImageGallery.propTypes = {
  input: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  onLoadingChange: PropTypes.func.isRequired,
};
