import css from './ImageGallery.module.css';
import ImageCard from '../ImageCard/ImageCard.jsx';

function ImageGallery({images, openModal}) {
 
  return (
  <ul className={css.imageGallery}>
    {images.map((img) => (
        <li key={img.id} className={css.imageItem} onClick={() => openModal(img)}>
            <ImageCard img={img} />
        </li>
      ))}
  </ul>
  )
}

export default ImageGallery
