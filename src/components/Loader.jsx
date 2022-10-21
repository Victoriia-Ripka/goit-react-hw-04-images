import { Circles } from 'react-loader-spinner';
import { LoaderBkgrnd } from './styles.styled';

export const Loader = () => {
  return (
    <LoaderBkgrnd>
      <Circles
        height="80"
        width="80"
        color="#1e2f97"
        ariaLabel="circles-loading"
        wrapperStyle={{}}
        visible={true}
      />
    </LoaderBkgrnd>
  );
};
