import React, { Component } from "react";
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import API from '../ApiService/Api';
import ErrorView from "../ErrorView/ErrorView";
import LoadingView from "../Loader/Loader";
import Button from "../Button/Button";
import Modal from "../Modal/Modal";

import s from './ImageGallery.module.css';

export default class ImageGallery extends Component {
    state = {
    searchRequest: "",
    page: 1,
    images: [],
    id: null,
    error: null,
    status: 'idle',
    button: false,
    modalStatus: false,
    };

    componentDidUpdate(prevProps, prevState) {
        const { page } = this.state;
        const { searchRequest, pageNr } = this.props;
        
        if (prevProps.searchRequest !== this.props.searchRequest) {
            this.setState({ status: 'pending'})
            API.fetchImages(searchRequest, pageNr)
                .then((images) => {
                    if (images.total === 0) {
                        this.setState({ status: 'rejected' })
                    } else if(images.total <=12){
                        this.setState({ images: images.hits, status: 'resolved', button: false})
                    } else if (images.total > 12) {
                        this.setState({ images: images.hits, status: 'resolved', button: true })
                    } 
                  
                })
                .catch(error => { this.setState({ error, status: 'rejected' }) })
        };
        
        if (prevState.page !== this.state.page) {
            this.setState({ status: 'pending'})
            API.fetchImages(searchRequest, page)
                .then((images) => {
                    this.setState({ images: [...prevState.images, ...images.hits], status: "resolved", button: true });
                })
             .finally(this.handlePageScroll);
        };
    };
    
    handleBtnClick = () => {
        this.setState((prevState) => ({
            page: prevState.page + 1,
        }))
    };

    handlePageScroll = () => {
        window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth',
        });
    };

    showModal = (modalStatus) => {
        this.setState({ modalStatus: !modalStatus })
    };


    handleImgClick = (largeImageURL, tags) => {
        this.setState({ largeImageURL, tags });
        this.showModal();
    };

    render() {
        const { images, error, status, button, modalStatus } = this.state;

        if (status === 'idle') {
           return <div className={s.starter}>Let`s find some pictures!</div>
        }

        if (status === 'pending') {
            return <LoadingView />
        }

        if (status === 'rejected') {
            return <ErrorView message={error}/>
        }

        if (status === 'resolved') {
            return (
            <div className={s.listContainer}>
                <ul className={s.ImageGallery}>
                    {images.map((image) => (
                        <ImageGalleryItem
                          key={image.id}  
                          id={image.id}
                          url={image.webformatURL}
                          alt={image.tags}               
                          largeUrl={image.largeImageURL}
                            onClick={() => { this.handleImgClick(image.largeImageURL, image.tags) }}
                        />
                    ))}                
                </ul>
                <div>
                    {button && <Button onClick={this.handleBtnClick} />}
                    {modalStatus && <Modal onClick={this.showModal} url={this.state.largeImageURL} alt={this.state.tags} />}
                </div>
            </div>          
            )
        }        
    };
}