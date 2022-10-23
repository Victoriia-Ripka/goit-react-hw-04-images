import { useState } from 'react';
import { toast } from 'react-toastify';
import { ReactComponent as SearchIcon } from '../images/svg/icons8-search.svg';
import { Header, Input, Form, SearchFormBtn } from './styles.styled';
import { PropTypes } from 'prop-types';

export const Searchbar = ({ onSubmit }) => {
  const [search, setSearch] = useState('');

  const handleInput = e => {
    setSearch(e.currentTarget.value.toLowerCase().trim());
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (search === '') {
      toast.error('input a word');
      return;
    }
    onSubmit(search);
  };

  return (
    <Header>
      <Form onSubmit={handleSubmit}>
        <SearchFormBtn type="submit">
          <SearchIcon />
        </SearchFormBtn>
        <Input
          type="text"
          autoComplete="off"
          autoFocus
          value={search}
          onChange={handleInput}
          placeholder="Search images and photos"
        />
      </Form>
    </Header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
