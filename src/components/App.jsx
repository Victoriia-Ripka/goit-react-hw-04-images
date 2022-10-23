import { useState } from 'react';
// import { useToggle } from 'react-use';
import { Searchbar } from './Searchbar';
import ImageGallery from './ImageGallery';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AppSection } from './styles.styled';
import { Loader } from './Loader';

export default function App() {
  const [input, setInput] = useState('');
  const [ loading, setLoading] = useState(false)
  // const [on, toggle] = useToggle(false);

  const handleSubmit = e => {
    setInput(e);
  };

  const onChange = () => {
    // toggle(!on);
    setLoading(loading => !loading)
  };

  return (
    <AppSection>
      <Searchbar onSubmit={handleSubmit} />
      {/* {on && <Loader />} */}
      {loading && <Loader />}
      <ImageGallery
        input={input}
        // loading={loading}
        onLoadingChange={onChange}
      />
      <ToastContainer autoClose={3000} />
    </AppSection>
  );
}
