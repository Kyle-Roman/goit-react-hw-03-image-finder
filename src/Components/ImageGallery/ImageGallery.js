import React, { Component } from "react";
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import API from '../ApiService/Api';
import ErrorView from "../ErrorView/ErrorView";
import LoadingView from "../Loader/Loader";
import Button from "../Button/Button";

import s from './ImageGallery.module.css';

export default class ImageGallery extends Component {
    state = {
    searchRequest: "",
    page: 1,
    images: null,
    error: null,
    status: 'idle',
    };

    componentDidUpdate(prevState, prevProps) {
        if (prevState.searchRequest !== this.props.searchRequest) {
            const { searchRequest, page } = this.props;
            
            this.setState({status: 'pending'})
            API.fetchImages(searchRequest, page)
                .then((images) => {
                    if (images.total === 0) {                        
                        this.setState({status: 'rejected'})
                    } else {
                        this.setState({ images: images.hits, status: 'resolved' })
                    }
                  
                })
                .catch(error => {this.setState({error, status: 'rejected'})})
        }
    }
    
    render() {
        const { images, error, status } = this.state;

        if (status === 'idle') {
           return <p>Start</p>
        }

        if (status === 'pending') {
            return <LoadingView />
        }

        if (status === 'rejected') {
            return <ErrorView message={error}/>
        }

        if (status === 'resolved') {
            return (
            <div className={s.List_wrapper}>
                <ul className={s.ImageGallery}>
                    {images && <div>{images.map((image) => (
                    <ImageGalleryItem
                      key={image.id}  
                      id={image.id}
                      url={image.webformatURL}
                      alt={image.tags}               
                      largeUrl={image.largeImageURL}
                      onClick={() =>
                        this.imgClickHandler(image.largeImageURL)
                    }
                />
                    ))}
                        </div>}                
                </ul>
                <div><Button /></div>       
            </div>          
            )
        }        
    }
}