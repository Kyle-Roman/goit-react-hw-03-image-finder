import React, {Component} from 'react';
import Searchbar from './Components/Searchbar/Searchbar';
import ImageGallery from './Components/ImageGallery/ImageGallery';
// import API from './Components/ApiService/Api'
import './App.css';

// const searchResult = 'black cat with car';
// const page = 1;


export default class App extends Component {
  state = {
    searchRequest: "",
    page: "",
    images: null,
  };

  componentDidMount() {
  }

  componentDidUpdate(prevProps, prevState) {
  }

  handleSubmit = searchRequest => {
    this.setState({searchRequest})
  }

  render() {
    return (
      <div>
        <Searchbar onSubmit={this.handleSubmit}/>
        <ImageGallery searchRequest={this.state.searchRequest} />
      </div>
    );
  }
}


