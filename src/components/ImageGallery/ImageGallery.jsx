import css from './ImageGallery.module.css';
import ImageCard from './ImageCard/ImageCard.jsx';

function ImageGallery({images}) {
 
  return (
   
  <ul className={css.imageGallery}>
      <ImageCard images={images} />
  </ul>
   
  )
}

export default ImageGallery
