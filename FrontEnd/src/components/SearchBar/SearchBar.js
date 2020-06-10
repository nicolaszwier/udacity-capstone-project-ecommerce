import React, { Component } from 'react';
import { TextField } from '@rmwc/textfield';
import '@rmwc/textfield/styles';

import './style.css';

class SearchBar extends Component {
  constructor() {
    super();
    this.state = {
      open: false
    }
  }

  render() {
    return (
      // <TextField placeholder="Type to search..." />
      <TextField icon="search" outlined trailingIcon="close" placeholder="Type to search..." />
    );
  }
}

export default SearchBar;
