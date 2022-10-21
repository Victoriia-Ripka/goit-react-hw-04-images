import { Btn } from './styles.styled';
import { PropTypes } from 'prop-types';

export const Button = ({ loadMore }) => {
  return (
    <Btn type="button" onClick={loadMore}>
      Load more
    </Btn>
  );
};

Button.propTypes = {
  loadMore: PropTypes.func.isRequired, 
}
