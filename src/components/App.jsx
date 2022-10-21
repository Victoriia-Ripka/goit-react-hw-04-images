import { Component } from 'react';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AppSection } from './styles.styled';
import { Loader } from './Loader';

export class App extends Component {
  state = {
    input: '',
    loading: false,
  };

  // componentDidMount() {
  //   const input = localStorage.getItem('input')
  //   if (input) {
  //     this.setState({ input: input });
  //   }
  // }

  handleSubmit = e => {
    this.setState({ input: e });
    // localStorage.setItem("input", e)
  };

  onChange = () => {
    this.setState({ loading: !this.state.loading });
  };

  render() {
    const { loading } = this.state;
    return (
      <AppSection>
        <Searchbar onSubmit={this.handleSubmit} />
        {loading && <Loader />}
        <ImageGallery
          input={this.state.input}
          loading={this.state.loading}
          onLoadingChange={this.onChange}
        />
        <ToastContainer autoClose={3000} />
      </AppSection>
    );
  }
}
