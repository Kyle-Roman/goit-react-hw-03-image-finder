import React, {Component} from 'react';
import Searchbar from './Components/Searchbar/Searchbar';
import ImageGallery from './Components/ImageGallery/ImageGallery';

import './App.css';


export default class App extends Component {
  state = {
    searchRequest: "",
    page: 1,
  };

  handleSubmit = (searchRequest, page) => {
    this.setState({searchRequest: searchRequest, page: page})
  }

  render() {
    return (
      <div>
        <Searchbar onSubmit={this.handleSubmit}/>
        <ImageGallery searchRequest={this.state.searchRequest} pageNr={this.state.page} />
      </div>
    );
  }
}


