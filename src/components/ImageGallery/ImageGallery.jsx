import css from './ImageGallery.module.css';
import ImageCard from './ImageCard/ImageCard.jsx';

function ImageGallery({images, openModal}) {
 
  return (
   
  <ul className={css.imageGallery}>
      <ImageCard images={images} openModal={openModal} />
  </ul>
   
  )
}

export default ImageGallery
