import { Component } from "react";

import s from './Searchbar.module.css'


export default class Searchbar extends Component {
  state = {
    searchRequest: "",
    page: 1,
  };

  handleInput = (e) => {
      this.setState({ searchRequest: e.currentTarget.value.toLowerCase() });
  };
  
  onSubmit = (e) => {
    e.preventDefault();
    
    const { searchRequest, page } = this.state;    

    if (searchRequest.trim() === "") {
      return alert("Please enter something...");
    }
    
    this.props.onSubmit(searchRequest, page);
    this.setState({ searchRequest: "" });
    e.target.reset();
  }
  
  render() {
      return (
      <header className={s.Searchbar}>
        <form className={s.SearchForm} onSubmit={this.onSubmit}>
          <button type="submit" className={s.SearchForm_button}>
           <span className={s.SearchForm_button_label}>Search</span>
          </button>
           
        <input
           className={s.SearchForm_input}
           type="text"
           autoComplete="off"
           autoFocus
           placeholder="Search images and photos"
           onChange={this.handleInput}
         />
       </form>
     </header>
    )
    }
    
}
