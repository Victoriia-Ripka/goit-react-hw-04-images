import { useState } from 'react';
import { Searchbar } from './Searchbar';
import ImageGallery from './ImageGallery';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AppSection } from './styles.styled';

export default function App() {
  const [input, setInput] = useState('');

  const handleSubmit = e => {
    setInput(e);
  };

  return (
    <AppSection>
      <Searchbar onSubmit={handleSubmit} />
      
      <ImageGallery
        input={input}
        // loading={loading}
        // onLoadingChange={onChange}
      />
      <ToastContainer autoClose={3000} />
    </AppSection>
  );
}
