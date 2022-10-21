import { Component } from 'react';
import { toast } from 'react-toastify';
import { ReactComponent as SearchIcon} from '../images/svg/icons8-search.svg' 
// http 16:50
import {
  Header,
  Input,
  Form,
  SearchFormBtn,
  // SearchFormBtnLabel,
} from './styles.styled';
import { PropTypes } from 'prop-types';

export default class Searchbar extends Component {
  state = {
    search: '',
  };

  handleInput = e => {
    this.setState({ search: e.currentTarget.value.toLowerCase().trim() });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.search === '') {
      toast.error('input a word');
      return;
    }
    this.props.onSubmit(this.state.search);
    // this.setState({ search: '' });
  };

  render() {
    return (
      <Header>
        <Form onSubmit={this.handleSubmit}>
          <SearchFormBtn type="submit">
            <SearchIcon/>
            {/* <SearchFormBtnLabel>Search</SearchFormBtnLabel> */}
          </SearchFormBtn>
          <Input
            type="text"
            // autoComplete="off"
            autoFocus
            value={this.state.search}
            onChange={this.handleInput}
            placeholder="Search images and photos"
          />
        </Form>
      </Header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
