export default function Meal({
    name,
    id,
    price,
    description,
    image,
    onAddToCart
}) {
    const imgUrl = `http://localhost:3000/${image}`;

    return <div className="meal-item">
        <article>
            <img src={imgUrl} alt="meal image" />
            <div className="meal-item-description">
                <h3>{name}</h3>

                <div className="meal-item-price">{price}</div>
                <div className="meal-item-description">{description}</div>
            </div>
            <div className="meal-item-actions">
                <button className="button" onClick={onAddToCart}>Add to Cart</button>
            </div>
        </article>
    </div>
}