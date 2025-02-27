import css from './ImageCard.module.css';

function ImageCard({images, openModal }) {
 
  return (
  <>
  {images.map((img) => (
    <li key={img.id} className={css.imageItem} onClick={() => openModal(img)}>
        <img src={img.urls.small} alt={img.alt_description} className={css.image} />
      </li>
  ))}
  </>
  )
}

export default ImageCard
