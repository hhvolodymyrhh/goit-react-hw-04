import css from './ImageCard.module.css';

function ImageCard({img}) {
 
  return (
  <>
    <img src={img.urls.small} alt={img.alt_description} className={css.image} />
  </>
  )
}

export default ImageCard
