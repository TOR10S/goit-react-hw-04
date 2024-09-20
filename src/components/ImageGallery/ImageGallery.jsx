import Image from "../Image/Image"
import css from "./ImageGallery.module.css"

export default function ImageGallery({images, onImageClick}) {
    return (
        <ul className={css.list}>
          {images.map((img) => (            
            <li key={img.id} onClick={() => onImageClick(img.urls.regular)}>
                <Image img={img} />
            </li>
          ))}
        </ul>
    )
}