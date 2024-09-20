import css from "./Image.module.css"

export default function Image({img}) {
    return (
        <div className={css.img}>
            <img src={img.urls.small} alt={img.description} />
        </div>

    )
}