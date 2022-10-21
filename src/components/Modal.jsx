import { Backdrop, ImgModal } from './styles.styled';
import { PropTypes } from 'prop-types';
import { Component } from 'react';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleClick)
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleClick);
  }

  handleClick = e => {
    console.log(e.code)
    if(e.code=== 'Escape') {
      this.props.onClose()
    }
  }
  
  closeModal = e => {
    if(e.target.nodeName === 'DIV') this.props.onClose();
  };

  render() {
    return (
      <Backdrop onClick={this.closeModal}>
        <ImgModal src={this.props.imageURL} alt="hello" />
      </Backdrop>
    );
  }
}

Modal.propTypes = {
  imageURL: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
