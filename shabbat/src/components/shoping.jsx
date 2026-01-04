export const Shoping = (props) => {
    const { shoping, showOnly, onDelete } = props;
    return (
        <li className="shop-item">
            <div className="item-left">
                <button type="button" className="btn danger" onClick={() => onDelete && onDelete(shoping.id)}>מחק</button>
                {shoping.name}
                {/* {showOnly && <p>{shoping.showOnly}</p>} */}
            </div>
        </li>
    );
}

