import React from "react";
import s from './ImageGalleryItem.module.css'

function ImageGalleryItem({ id, url, alt, onClick, largeUrl }) {
    return (
        <li id={id} className={s.ImageGalleryItem}>
            <img src={url} alt={alt} className={s.ImageGalleryItem_image} />
        </li>
    )   
}

export default ImageGalleryItem;