import css from "./ImageCard.module.css"

export default function ImageCard({img}) {
    return (
        <div className={css.img}>
            <img src={img.urls.small} alt={img.description} />
        </div>

    )
}